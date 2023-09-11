const jwt=require('jsonwebtoken')
const User=require('../../frontend/src/Models/usersModel')


require('dotenv').config({
    path: 'C:/Users/Shubham/Desktop/ChatApplication/config.env'
})//For enviornment variables


//We can send token to an request with help of header
const protect=async(req,res,next)=>
{
    try{

        let token=req.headers.authorization.split(' ')[1];//We will send a request like Authorization:Bearer {token}.So we want the 
        //token so that we can verify it.
        //Here we are using try and catch block if some error comes like header is not attached so it will go to catch block.

        console.log(token);

        console.log(process.env.SECRET_KEY)
        const decodedToken= jwt.verify(token,process.env.SECRET_KEY);//Mainly we are checking if the token is correct or not.
        //As token is created with help of secret key which is know to user.So it is almost impossible to generate the token because the key only we know.
        //So we need to verify the token is correct or not and it return payload i.e the data which we encoded

        console.log(decodedToken)
        req.user=await User.findOne({_id:decodedToken.userId}).select("-password");//We are passing all user information to next handler.

        
        next();

    }
    catch(error)
    {
        return res.status(401).send({message:"Authorization Failed"});
    }
   


}

module.exports=protect