import React, { useState } from 'react'
import { VStack,Input, InputRightElement,InputGroup,Button } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'

  import { useToast } from '@chakra-ui/react';
  import { useNavigate } from 'react-router-dom';

  
  import axios from 'axios';

 function Signup() {
    let [show,setShow]=useState(false);//Taking a state variable show which hides the password.setShow just alternates the value (true to false or false to true).
    //So whenever we click the button it calls handleClick thet in alternates the value then components get render again then we set the type of thhe input 
    let [name,setName]=useState();
    let [email,setEmail]=useState();
    let [password,setPassword]=useState();
    let [confirmPassword,setConfirmPassword]=useState();
    let [pics,setPics]=useState();
    const [loading,setLoading]=useState(false);
    const toast = useToast();
    const navigate = useNavigate()



    //e.target.value is for that input field only 
   
    function handleClick()
    {
        setShow(!show);
    }

   const submitHandler=async ()=>
    {
          
          setLoading(true);

         if(!name || !email || !password || !confirmPassword || password.trim().length<6 || pics===undefined)
          {
            toast({
              title: 'Please fill all the Fields',
              status: 'warning',
              duration: 5000,
              isClosable: true,
              position:'bottom'
            })

            setLoading(false);
            return;
          }

          if(password!==confirmPassword)
          {
            toast({
              title:"Password doesnt match with Confirm Password",
              status: 'warning',
              duration: 5000,
              isClosable: true,
              position:'bottom'
            })

            setLoading(false);
            return;
          }

    // if(pics.type==="image/jpeg" || pics.type==='image/png')//Predefined atrribute in e.target.files object
    // {
    //   let data=new FormData();//Creates a formdata object without an HTML form and we could append some data by append function.
    //   data.append("file",pics);
    //   data.append("upload_preset","Chat Application");
    //   data.append("cloud_name","duebplvvi")


    //   let res= await fetch("https://api.cloudinary.com/v1_1/duebplvvi/image/upload",{
    //     method:"post",
    //     body:data
      
    //   })
       
    //   if(!res)
    //   {
    //     console.log("No");
    //     return;
    //   }

    //   let jsonData=await res.json();
        
    //   console.log(jsonData);//Here it gives a response
    //   console.log(jsonData.url);//Here we could get the access of utl attribute which we can convert it into string
    //   setPics(jsonData.url);
    //   setLoading(false);

        

        try
          {
                let config = {
                  headers: {
                    "Content-type": "multipart/form-data",
                  },
                };
                
                let data=await axios.post("api/user",{
                  
                  name:name,
                  email:email,
                  password:password,
                  pics:pics
                  
                
              },config
                )
                toast({
                title: 'Registration Sucessfull',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position:'bottom'
              })

              navigate('/chats');

          }
          catch(error)
          {
               console.log(error);
          }

        

      

        }
    

  return (
    <VStack spacing={5} align='stretch'>

<FormControl id='first-name' isRequired>
<FormLabel>Name</FormLabel>
<Input placeholder="Enter your name" onChange={(e)=>setName(e.target.value)} name="name"></Input>
</FormControl>

<FormControl id='email' isRequired>
<FormLabel>Email</FormLabel>
<Input placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} name="email"></Input>
</FormControl>

<FormControl id='password' isRequired>
<FormLabel>Password</FormLabel>
<InputGroup>
<Input type={show ? "text":"password"} placeholder="Enter your name" onChange={(e)=>setPassword(e.target.value)} name="password"></Input>
<InputRightElement width="4.5rem">

<Button h="1.75 rem" size="sm" onClick={handleClick}>
    {show? "Hide":"Show"}
</Button>
</InputRightElement>{/*Adding in the right of the input.Please see the documentation */}
</InputGroup>

</FormControl>

<FormControl id='confirm-password' isRequired>
<FormLabel>Confirm Password</FormLabel>
<InputGroup>
<Input type={show ? "text":"password"} placeholder="Enter your name" onChange={(e)=>setConfirmPassword(e.target.value)} name="setPassword"></Input>
<InputRightElement width="4.5rem">

<Button h="1.75 rem" size="sm" onClick={handleClick}>
    {show? "Hide":"Show"}
</Button>
</InputRightElement>{/*Adding in the right of the input.Please see the documentation */}
</InputGroup>

</FormControl>


<FormControl id='pic' isRequired>
<FormLabel>Upload your Picture</FormLabel>
<Input type="file" p={1.5} accept="image/*" onChange={(e)=>setPics(e.target.files[0])}></Input>
</FormControl>

<Button colorScheme="blue" width="100%" style={{marginTop:15}} onClick={submitHandler} isLoading={loading}>
    Signup
</Button>
  
</VStack>
  )
}

export default Signup
