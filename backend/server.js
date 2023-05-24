//Which is app.js

const express=require('express');
const app=express();
const db=require('./config/db');
const bodyParser = require('body-parser');
const userRoutes=require('./Routes/userRoutes');
const session=require('express-session');
const mongodbStore=require('connect-mongodb-session');

require('dotenv').config({
    path: 'C:/Users/Shubham/Desktop/ChatApplication/config.env'
})//For enviornment variables

const MongoDBStore=mongodbStore(session);

const sessionStore=new MongoDBStore({
    uri:process.env.MONGODB_URI,
    databaseName:'test',
    collection:'sessions'
  })

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(session(
    {
        secret:'super-secret',
        resave:false,
        saveUninitialized:false,
        store:sessionStore,
    }    
))

app.use(express.static('public'));

require('dotenv').config({
    path: 'C:/Users/Shubham/Desktop/ChatApplication/config.env'
})//For enviornment variables

app.use('/api/user',userRoutes)
//The reason why it is used is  
//the code for the /api/user route has been moved into its own file so it doesn't clutter up the main app.
//So all the request which are coming /api/user handled by userRoutes so that it will not be piled up in server.js


db.connectDB().then(()=>{
    app.listen(3000);
})


//Add proxy in frontend package.json file to connect frontend and backend.It proxy all http request to backend port


//Axios
// Axios, which is a popular library is mainly used to send asynchronous HTTP requests to REST endpoints. This library is very useful to perform CRUD operations.
//This popular library is used to communicate with the backend. 
//Axios supports the Promise API, native to JS ES6.
//Using Axios we make API requests in our application. 
//Once the request is made we get the data in Return, and then we use this data in our project.