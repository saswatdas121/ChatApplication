const User=require('../../frontend/src/Models/usersModel');
const bcrypt=require('bcryptjs')


const registerUser=async (req,res)=>
{
     const file=req.file;
     const userDetail=req.body;
     const name=userDetail.name;
     const email=userDetail.email;
     const password=userDetail.password;
     const pics=file.path.substring(7);

     if(!name || !email || !password || password.length<5 || pics==undefined)
     {
         res.status(400);
         console.log("Requirements doesnt meet");
         return;
     }//Refactor it

     const userExists=await User.findOne({
        email:email
     })

       //If we dont use mongoose then out code will look like db.getDb()//which gives database then 
     //.collection('User') then findOne() function.

     //But in mongoose we already created a schema for a collection and we have a model to do all operations.
     //So we can import that model and write functions 

     if(userExists)
     {
        console.log("Email Exists");

        return;
     }

    const hashedPassword=await bcrypt.hash(password,12);

    const user=await User.create({
        name:name,
        password:hashedPassword,
        email:email,
        pics:pics
     });

     console.log("User registered successfully");

}

const authUser=async (req,res)=>
{
    const userDetail=req.body;

    const email=userDetail.email;
    const password=userDetail.password;

    const checkUser=await User.findOne({email:email});

    if(!checkUser)
    {
       console.log("No user exist in the database");
       return;
    }


    let passwordCheck=bcrypt.compare(password,checkUser.password);

    if(!passwordCheck)
    {
       console.log("Invalid credentials");
       return;
    }

    req.session.user={
      id:userDetail._id
    }


}

//api/user?search=saswat
//path params are used to identify a specific resource or resources, while query parameters are used to sort/filter those resources.
//GET /cars/:id-To search the paricular user
//GET /cars?color=blue Suppose you wanted to add the capability to filter the cars by color in your GET requests. 
//Because color is not a resource (it is a property of a resource), you could add a query parameter that does this. 
//You would add that query parameter to your GET /cars request like this:

const allUsers=async(req,res)=>
{
    const keyword=req.query.search?
    {
      $or:[
         {name:{$regex:req.query.search,$options:"i"}},
         {email:{$regex:req.query.search,$options:"i"}}
      ],//It is an conditional perator in mongodb.We are just telling like if there is req.query.search we are finding if our search value matches with name or email.
      //regex provides regular expression capabilities for pattern matching strings in queries.So for example if we write s so it will return the users where either name or email pattern matches with s
      //If we write st so it matches the pattern if st substring or pattern present or not.
    }:{}

   

const users=await User.find(keyword)

res.send(users);
}


module.exports={
    registerUser:registerUser,
    authUser:authUser,
    allUsers:allUsers
};