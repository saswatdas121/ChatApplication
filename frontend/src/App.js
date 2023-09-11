import React, {useState,useEffect} from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,Routes

} from "react-router-dom";
import HomePage from './Pages/HomePage';
import Chats from './Pages/Chats';
import ChatsPage from './Pages/ChatsPage'

import PrivateRoutes from "./PrivateRoutes"
import PublicRoutes from './PublicRoutes'

import {ChatContext}  from "./Context/ChatProvider";

import { useNavigate } from 'react-router-dom';

function App(){

  
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const[selectedChat,setSelectedChat]=useState();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    //Here the main thing is as dont do it in useEffect as the initial render it will be null
    //Just use like this so it sets the state properly
    
   
    const[user,setUser]=useState(userInfo);

return (
    
      <ChatContext.Provider
      value={
        {
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
        loading,
        setLoading,
        user,
        setUser
        
      }}>
      
      <div className="App">
    
      <Routes>

         <Route path="/" element={<HomePage/>} exact/>
         <Route path="/chats" element={<PrivateRoutes/>}>
         <Route path="/chats" element={<ChatsPage/>} exact/>
        </Route>
      
       
  
    
    </Routes>
    
    </div>
    
    
    
    
      
    </ChatContext.Provider>
    
    
  );
}

export default App;
