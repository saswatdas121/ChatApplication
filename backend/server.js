//Which is app.js

const express=require('express');
const app=express();
const db=require('./config/db');
const bodyParser = require('body-parser');
const userRoutes=require('./Routes/userRoutes');
const session=require('express-session');
const mongodbStore=require('connect-mongodb-session');
const chatRoutes=require('./Routes/chatRoutes')
const messageRoutes=require('./Routes/messageRoutes')


require('dotenv').config({
    path: 'C:/Users/Shubham/Desktop/ChatApplication/config.env'
})//For enviornment variables

db();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

app.use('/api/user',userRoutes);
//The reason why it is used is  
//the code for the /api/user route has been moved into its own file so it doesn't clutter up the main app.
//So all the request which are coming /api/user handled by userRoutes so that it will not be piled up in server.js

app.use("/api/chat", chatRoutes);

app.use("/api/message", messageRoutes);

const server=app.listen(3000);

    const io=require("socket.io")(server,{
        pingTimeout:60000,
        cors:{
            origin:"*",
            
        },
    });

    
    io.on("connection",(socket)=>
    {
          console.log("Connected to socket.io");

          socket.on("setup", (userData) => {
            socket.join(userData._id);
            socket.emit("Connected");
            
        });//listen for specific events to collect data.Looking for setup event to collect data

        socket.on('join chat',(room)=>
        {
            socket.join(room);//So we are creating one room for a selectedChat.
            console.log("User joined room"+room);
        });

        socket.on('new message',(newmessageReceived,selectedChat)=>
        {

             console.log(selectedChat._id);
             socket.to(selectedChat._id).emit("message recieved",newmessageReceived);//To send the message to the room members except the sender.
       // So the event will be open to the reciever only and message will go to in reciever side only
               
        });

        socket.on("typing",(room)=>
        {
            console.log("ttt");
            socket.in(room).emit("typing");
        });

        socket.on("stop typing",(room)=>
        {
            socket.in(room).emit("stop typing");
        })

        // socket.on("new message", (newMessageRecieved) => {
        //     var chat = newMessageRecieved.chat;
        
        //     if (!chat.users) return console.log("chat.users not defined");
        
        //     chat.users.forEach((user) => {
        //       if (user._id == newMessageRecieved.sender._id) return;
        
        //       socket.in(user._id).emit("message recieved", newMessageRecieved);
        //     });
        // });
    });
   
 






//Add proxy in frontend package.json file to connect frontend and backend.It proxy all http request to backend port


//Axios
// Axios, which is a popular library is mainly used to send asynchronous HTTP requests to REST endpoints. This library is very useful to perform CRUD operations.
//This popular library is used to communicate with the backend. 
//Axios supports the Promise API, native to JS ES6.
//Using Axios we make API requests in our application. 
//Once the request is made we get the data in Return, and then we use this data in our project.