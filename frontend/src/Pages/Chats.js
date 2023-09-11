import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ChatState} from '../Context/ChatProvider'

import ChatLoading from '../Components/ChatLoading'
import { useOutletContext } from "react-router-dom";


function Chats() {
  const user = useOutletContext();

  console.log(user)

  return (
    <>
    <div>
     Home
    </div>
    {!user && (<div><div>Login</div><div>Register</div></div>)}

          </>
    
  )
}

export default Chats;
