const express=require('express');
const userControllers = require('../Controllers/userControllers');
const multer=require('multer');
const app=express();

const storageConfig=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,'backend/public/img');
    },//Where you file will be saved 
    filename:function(req,file,cb)
    {
       cb(null,Date.now()+'-'+file.originalname);
    }//Name of you file
  });

  const upload= multer({storage:storageConfig})
//When var app = express() is called, an app object is returned. Think of this as the main app.
//When var router = express.Router() is called, a slightly different mini app is returned.
//The idea behind the mini app is that each route in your app can become quite complicated, and you'd benefit from moving all that code into a separate file. Each file's router becomes a mini app, which has a very similar structure to the main app.

const router=express.Router();

router.post('/',upload.single('pics'),userControllers.registerUser);

router.post('/login',userControllers.authUser);

router.get('/',userControllers.allUsers)

module.exports=router