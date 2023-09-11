import {React,useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,Navigate, Outlet } from 'react-router-dom';
import {ChatState} from './Context/ChatProvider'

const PrivateRoutes=()=>
{
   let data=JSON.parse(localStorage.getItem("userInfo"));
    
    return(
        <>
        {data?<Outlet/>:<Navigate to="/"/>}

        </>
    )
}

export default PrivateRoutes
