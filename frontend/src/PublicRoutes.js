import {React,useState} from 'react'
import axios from 'axios'
import { useNavigate,Navigate, Outlet } from 'react-router-dom';


const PublicRoutes=()=>
{

 
   let data=localStorage.getItem("userInfo");

   let res;

   if(Boolean(data))
   {
     console.log("ssssssssssssssssss")
      
   }

   res=Boolean(data);
       
    return(
        <>
        <Outlet context={res}/>

        </>
    )
}

export default PublicRoutes
