const mongoose=require('mongoose');

const userModel=new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true,
        unique:true
    },
    password:
    {
        type:String,
        required:true
    },
    pics:
    {
        type:String,
        required:true
    },
   },
{
    timestamps:true
}
)//Created a Schema

const User=mongoose.model("User",userModel);//Created a model to update,delete and create documents based on schema chatModel and in collection Chat

module.exports=User; 