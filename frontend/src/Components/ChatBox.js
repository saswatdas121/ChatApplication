import {React,useContext} from 'react'
import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatContext } from "../Context/ChatProvider";

function ChatBox({ fetchAgain, setFetchAgain }) {
  const ChatState = () => {
    return useContext(ChatContext)
    }
  
    const {selectedChat} = ChatState();
  return (
    <Box
    d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
    alignItems="center"
    flexDir="column"
    p={3}
    bg="white"
    w={{ base: "100%", md: "68%" }}
    borderRadius="lg"
    borderWidth="1px"
  >
     <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default ChatBox
