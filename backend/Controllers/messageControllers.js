const Chat = require("../../frontend/src/Models/chatModel");
const User = require("../../frontend/src/Models/usersModel");
const Message = require("../../frontend/src/Models/messageModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = async (req, res) => {
  //Here in this route we are just for a selected chat id we are making a message model and updating that selected
  //chat with the latest message and sending a JSON message with populated name of the sender pic etc.
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,//The person which is logged in
    content: content,//Message
    chat: chatId,//For a particular chat id we are creating a message
  };

  try {
    let message = await Message.create(newMessage);

    message = await Message.findOne({ sender: req.user._id,
    content: content,
    chat: chatId,}).populate("sender").populate("chat")

    message=await Message.populate(message,{
      path: "chat.users",
      select: "name pics email",
    })//It is used for populating 2 levels like first we are populating chats than going into chats 
    //we are populating users with name pic and email.

    //So it is necessary to populate and send the file because id we dont do it then we will see only object id
    //in our frontend and not necessary user info if we wanted.
    //We can see the example by removing the populate method
    
    await Chat.findOneAndUpdate({_id:req.body.chatId}, {$set:{latestMessage: message }}).populate("latestMessage");
    //Just we are updating that particular selected chat and adding a latest message

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports = { allMessages, sendMessage };