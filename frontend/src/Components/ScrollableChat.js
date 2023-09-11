// import {React,useContext} from 'react'
// import ScrollableFeed from 'react-scrollable-feed'
// import { isSameSender,isLastMessage,isSameSenderMargin,isSameUser } from './config/ChatLogics';
// import { ChatState } from '../Context/ChatProvider';
// import { Avatar, Tooltip } from '@chakra-ui/react';
// import {ChatContext}  from "../Context/ChatProvider"

// function ScrollableChat({messages}) {
  
//   const ChatState = () => {
//     return useContext(ChatContext)
//     }
  
//     const {user,setUser,selectedChat,setSelectedChat,chats,setChats } = ChatState();
//   return (
//     <ScrollableFeed>
//       {messages &&
//         messages.map((m, i) => (
//           <div style={{ display: "flex" }} key={m._id}>
//             {(isSameSender(messages, m, i, user._id) ||
//               isLastMessage(messages, i, user._id)) && (
//               <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                 <Avatar
//                   mt="7px"
//                   mr={1}
//                   size="sm"
//                   cursor="pointer"
//                   name={m.sender.name}
//                   src={m.sender.pic}
//                 />
//               </Tooltip>
//             )}
//             <span
//               style={{
//                 backgroundColor: `${
//                   m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
//                 }`,
//                 marginLeft: isSameSenderMargin(messages, m, i, user._id),
//                 marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
//                 borderRadius: "20px",
//                 padding: "5px 15px",
//                 maxWidth: "75%",
//               }}
//             >
//               {m.content}
//             </span>
//           </div>
//         ))}
//     </ScrollableFeed>
//   )
// }

// export default ScrollableChat

import {useContext} from 'react';
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";

import { isSameSender,isLastMessage,isSameSenderMargin,isSameUser } from './config/ChatLogics';
import {ChatContext}  from "../Context/ChatProvider"

const ScrollableChat = ({ messages }) => {
 

    const ChatState = () => {
    return useContext(ChatContext);   
  }

  const {user} = ChatState();

  return (
    <ScrollableFeed>
      {
      messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
