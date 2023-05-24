import React from 'react'
import SideDrawer from '../Components/miscellaneous/SideDrawer'
import MyChats from '../Components/MyChats'
import ChatBox from '../Components/ChatBox'
import { Box } from '@chakra-ui/react'

function ChatPage() {
  return (
    <div style={{width:'100%'}}>
      <SideDrawer/>
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        <MyChats/>
        <ChatBox/>

      </Box>
    </div>
  )
}

export default ChatPage;
