import {React,useState,useEffect,useContext} from 'react'
import { useToast } from '@chakra-ui/react';
import {ChatState} from '../Context/ChatProvider'
import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import axios from "axios";
import ChatLoading from "./ChatLoading"; 
import { Button } from "@chakra-ui/button";
import {ChatContext}  from "../Context/ChatProvider"



function MyChats() {

  const ChatState = () => {
    return useContext(ChatContext)
    }
  
    const {selectedChat,setSelectedChat,chats,setChats,user,setUser} = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
    console.log(user);
      const config=
      {
        headers:{
          Authorization:`Bearer ${user.token}`,
        },
      }

     const {data} = await axios.get("/api/chat",config);//

     console.log(data);

     setChats(data);
      
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chatsssss",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(()=>
  {
      fetchChats(); 
  },[])



  return (
   <Box display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
   flexDir="column"
   alignItems="center"
   p={3}
   bg="white"
   w={{ base: "100%", md: "31%" }}
   borderRadius="lg"
   borderWidth="1px"
 >
   <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats

        <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>

        </Box>

        <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >

         {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                >
                  <Text>
                   chat.
                  </Text>




                </Box>))
            }
           </Stack>
            ):(
              <ChatLoading/>
            )}
          
    </Box>
    </Box>
  
); 
  
}

export default MyChats
