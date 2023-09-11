import React, { useState,useContext} from 'react'
import { VStack,Input, InputRightElement,InputGroup,Button } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
  } from '@chakra-ui/react'

  import { useToast } from '@chakra-ui/react';
  import { useNavigate } from 'react-router-dom';
  import {ChatContext}  from '../../Context/ChatProvider'


  import axios from 'axios';


function Login() {

    let [show,setShow]=useState(false);//Taking a state variable show which hides the password.setShow just alternates the value (true to false or false to true).
    //So whenever we click the button it calls handleClick thet in alternates the value then components get render again then we set the type of thhe input 
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");    
    let [loading,setLoading]=useState();
    const toast = useToast();
    const navigate = useNavigate();

    const ChatState = () => {
        return useContext(ChatContext)
        }
      

    const {setUser} = ChatState();


    function handleClick()
    {
        setShow(!show);
    }

    const submitHandler=async ()=>
    {
        setLoading(true);
        console.log("sss")

        if(!email  || !password)
        {
            toast({
                title: 'Please fill all the Fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:'bottom'
              })
        }

        try
        {

            const config=
            {
                headers:
                {
                    'Content-Type':'application/json'
                }
            }

            
            const {data}=await axios.post('/api/user/login',
            {
                email:email,
                password:password
            },config);

            localStorage.setItem("userInfo",JSON.stringify(data));//We user json stringify because localstorage 
            //can store text and strings only.

            setUser(data);
            navigate('/chats');

        }
       catch(error)
        {
            console.log("ssss");
            console.log(error)
        }


       }

    
    const postDetails=()=>
    {
        
    }
   
return (
    <VStack spacing={5} align='stretch'>

<FormControl id='email' isRequired>
<FormLabel>Email</FormLabel>
<Input placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}></Input>
</FormControl>

<FormControl id='password' isRequired>
<FormLabel>Password</FormLabel>
<InputGroup>
<Input type={show ? "text":"password"} placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}></Input>
<InputRightElement width="4.5rem">

<Button h="1.75 rem" size="sm" onClick={handleClick}>
    {show? "Hide":"Show"}
</Button>
</InputRightElement>{/*Adding in the right of the input.Please see the documentation */}
</InputGroup>

</FormControl>


<Button colorScheme="blue" width="100%" style={{marginTop:15}} onClick={submitHandler}>
    Login
</Button>


<Button variant="solid" colorScheme="red" width="100%" style={{marginTop:15}} onClick={()=>
{
    setEmail("guest@example.com");
    setPassword("123456");
}}>
    Get Guest Credentials
</Button>










    </VStack>
  )
}

export default Login
