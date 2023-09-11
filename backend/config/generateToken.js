const jwt=require('jsonwebtoken');

const generateToken=(userId)=>
{
      try
      {
          let token=jwt.sign({userId},process.env.SECRET_KEY);

          return token;
      }
      catch(error)
      {
        console.log(error);
      }
}

module.exports=generateToken