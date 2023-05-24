//We can connect in both ways by mongodb and mongoose.
//By mongodb we can require mongodb then we could take a function from mongodb which is mongoClient.
//Then we could easily connect byb saying mongoClient.connect().Then connect it before our page gets render.

//By mongoose-It has a internal function which is connect which could help us connect with mongodb.

const mongoose=require('mongoose');


require('dotenv').config({
    path: 'C:/Users/Shubham/Desktop/ChatApplication/config.env'
})//For enviornment variables

const connectDB=async ()=>
{
    try
    {
        
         const conn=await mongoose.connect(process.env.MONGODB_URI,
            {
                useUnifiedTopology:true
            });
        console.log("MongoDB connected");
    }
    catch(error){
        console.log(error);
        process.exit();

    }
}

module.exports=
{
    connectDB:connectDB
};