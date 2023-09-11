import {React,useContext} from 'react'
import { Box, Text } from "@chakra-ui/layout";
import "./styles.css";
import { FormControl, IconButton, Input, Spinner, useToast } from "@chakra-ui/react";

import { useEffect, useState } from "react";

import {ChatState} from '../Context/ChatProvider'
import axios from 'axios';
import ScrollableChat from './ScrollableChat'
import {ChatContext}  from "../Context/ChatProvider"

import io from "socket.io-client";

var socket,selectedChatCompare;




const SingleChat = ({ fetchAgain, setFetchAgain }) => {

  const [messages,setMessages]=useState([]);
  const [loading,setLoading]=useState();
  const [newMessage,setnewMessage]=useState();
  const [socketConnected,setSocketConnected]=useState(false);
  const [typing,setTyping]=useState(false);
  const [isTyping,setIsTyping]=useState(false);

 const ChatState = () => {
    return useContext(ChatContext)
    }
  
    const {user,selectedChat,setSelectedChat}=ChatState();
  const toast = useToast();

  useEffect(()=>
  {
       fetchMessages();
  },[selectedChat])
  //If our selected chat changes then we again try to fetch all the messages

  useEffect(()=>
    {
        socket=io("http://localhost:3001");
        socket.emit("setup",user);//emit is used to create events to send data
        socket.on("connected",()=>setSocketConnected(true));
       
        
      socket.on("typing",()=>
      {
        console.log("ssss");
        setTyping(true);
      });
      socket.on("stop typing",()=>
      {
        console.log("end");
        setIsTyping(false);

      });

        //Here we have joined one user or registered one user in socket by emit(creating a event in client side) and on() in server side(also used join function)
        //As we have emitted(or created an event as connected) in server side we need to listen it in client side as socket.on("connected") and we have created a state.
        //So we could do further thing
    },[]);

    useEffect(() => {

      socket.on("message recieved", (newMessageRecieved) => {
          console.log("abc");
          setMessages([...messages, newMessageRecieved]);
      });

    },);//We have to run it everytime even a state changes so that we could know message recieved or not.




  const fetchMessages=async ()=>
  {
    if(!selectedChat)
    {
      return;
    }

    try
    {
      setLoading(true);
      const config=
      {
        headers:
        {
          Authorization: `Bearer ${user.token}`,
        }
      } 
      
      const {data}=await axios.get(`api/message/${selectedChat._id}`,config);//We have to get all messages of that selected Chat id only
       
      setMessages(data);
      setLoading(false);
    
      socket.emit("join chat",selectedChat._id);
    }
    catch(error)
    {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }

  const sendMessage=async (e)=>
  {
       if(e.key==='Enter' && newMessage)//Little reasearch about this
       {
             socket.emit('stop typing',selectedChat._id);
              try{

                const config=
                {
                 headers:
                 {
                  Authorization: `Bearer ${user.token}`,
                 }
                }
 
             const {data}=await axios.post('api/message',{
               content:newMessage,
               chatId:selectedChat._id//We want to give selectedChat id.So Like We are using a state so
               //that we could store the selectedChat and send that id
             },config)
 
             setnewMessage("");//So that input element will be empty
 
             socket.emit('new message',data,selectedChat);
             setMessages([...messages,data]);

              }
              
              catch(error)
              {
                toast({
                  title: "Error Occured!",
                  description: "Failed to Load the chats",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom-left",
                });
              }

            
           

            
       }
  }

  const typingHandler=(e)=>
  {
      setnewMessage(e.target.value);

      if(!typing)
      {
        setTyping(true);
        socket.emit("typing",selectedChat._id);
      }

      let lastTypingTime=new Date().getTime();
      var timerLength=3000;

      setTimeout(()=>
      {
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTypingTime;
        if (timeDiff >= timerLength && typing) {
          socket.emit("stop typing", selectedChat._id);
          setTyping(false);
        }
      },timerLength)

  }

 


  return (
    <>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading?(<Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto"/>):(<div className='messages'>              
            
            <ScrollableChat messages={messages}></ScrollableChat>
            
            </div>)}
       
      <FormControl onKeyDown={sendMessage} isRequired mt={3}>

        {isTyping ? (
                <div>
                  Loading...
                </div>
              ) : (
                <></>
              )}
    <Input variant="filled" bg="#E0E0E0" placeholder="Enter a message.." value={newMessage} onChange={typingHandler}/>

      </FormControl>






      </Box>
    </>
      
  );
};

export default SingleChat;