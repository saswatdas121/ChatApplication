// const submitHandler=async (data)=>
    // {
          
    //       setLoading(true);

    //      if(!name || !email || !password || !confirmPassword || password.length<6)
    //       {
    //         toast({
    //           title: 'Please fill all the Fields'
    //           status: 'warning',
    //           duration: 5000,
    //           isClosable: true,
    //           position:'bottom'
    //         })

    //         setLoading(false);
    //         return;
    //       }

    //       if(pics===undefined)
    //       {
    //         toast({
    //           title: 'Please Select a image',
    //           status: 'warning',
    //           duration: 5000,
    //           isClosable: true,
    //           position:'bottom'
    //         })

    //         setLoading(false);
    //         return;
    //       }

    // if(pics.type==="image/jpeg" || pics.type==='image/png')//Predefined atrribute in e.target.files object
    // {
    //   let data=new FormData();//Creates a formdata object without an HTML form and we could append some data by append function.
    //   data.append("file",pics);
    //   data.append("upload_preset","Chat Application");
    //   data.append("cloud_name","duebplvvi")


    //    fetch("https://api.cloudinary.com/v1_1/duebplvvi/image/upload",{
    //     method:"post",
    //     body:data
      
    //   }).then((res)=>res.json()).then((data)=>
    //   {
    //     console.log(data);//Here it gives a response
    //     console.log(data.url);//Here we could get the access of utl attribute which we can convert it into string
    //     setPics(data.url.toString());
    //     setLoading(false);

    //   }).catch((error)=>
    //   {
    //     console.log(error);
    //     setLoading(false);

    //     return;
    //   })

    // }
    //     try
    //       {
    //             console.log(pics);
    //             const data=await axios.post("api/user",{
    //               body: {
    //                 name:name,
    //                 email:email,
    //                 password:password,
    //                 pics:pics
                    
    //               },
    //               headers:
    //               {
    //                 'Content-Type': 'application/json',
    //               },
    //               method:"post"
    //             }
    //            )
    //            toast({
    //             title: 'Registration Sucessfull',
    //             status: 'success',
    //             duration: 5000,
    //             isClosable: true,
    //             position:'bottom'
    //           })

    //       }
    //       catch(error)
    //       {
    //            console.log(error+"ssssssssss");
    //       }


    // }