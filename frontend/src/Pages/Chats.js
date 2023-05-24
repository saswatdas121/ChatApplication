import React, { useEffect, useState } from 'react'
import axios from 'axios';



function Chats() {
const [data,setData]=useState([]);

  async function fetchData()
{
    const {data}=await axios.get('/api/chats');
    setData(data);
    
}
useEffect(()=>
{
    fetchData();
},[])


  return (
    <div>
     {data.map((element)=>
     {
         return <div>{element.lname}</div>
     })}
    </div>
  )
}

export default Chats;
