const mongoose=require('mongoose');

const chatModel=new mongoose.Schema({
    chatName:
    {
        type:String,
        trim:true
    },
    isGroupChat:
    {
        type:Boolean,
        default:false
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    latestMessage:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message'

    },
    isGroupAdmin:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'//Acts as a foreign Key which helps us to store data of user.
        //So we can populate it and show it directly.That means we can show all the data of User(particular ObjectID)
        //by fetching the data of chat.This is known as Query Population

    },

},
{
    timestamps:true
}
)//Created a Schema

const Chat=mongoose.model("Chat",chatModel);//Created a model to update,delete and create documents based on schema chatModel and in collection Chat

module.exports=Chat;