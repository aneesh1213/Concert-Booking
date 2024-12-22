import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import cors from 'cors';
import UserAuth, {SECRET} from './auth/auth.js';
import Concert from './db/concert.js';
import User from './db/user.js';

const app = express();
const port = 3000;



app.use(cors({
    origin: '*', 
    credentials: true,
  }));
  
app.use(express.json());


const mongoUrl = "mongodb+srv://aneeshkulkarni007:583683@cluster0.ajkhk.mongodb.net/concertbook"

// register api
mongoose.connect(mongoUrl, {
    tls: true
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


//   register api

app.post("/register", async (req, res) => {

    try{
        
        const {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message:"this user exists already"});
        }

        const newuser = new User ({username, password});
        await newuser.save();

        const token = jwt.sign({id:newuser._id, username: newuser.username}, SECRET, {expiresIn:"1h"});
        return res.status(200).json({message:"new user registered successfully !", token});
    }
    catch(err){
        return res.status(400).json({message:"error in registering !"});
    }
});


// login api

app.post("/login", async (req, res) => {
    try{
        
        const {username, password} = req.body;
        console.log(username,password)

        const user = await User.findOne({username});
        if(!user){
            return res.status(403).json({message:"this user dpes not exists"});
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        if(user.password === password){
            const token = jwt.sign({id:user._id, username:user.username}, SECRET, {expiresIn:"1h"});
            console.log(token)
            return res.status(200).json({message: "the login is successfull!",token})
        }

        else{
            return res.status(404).json({message:"please enter the coorect password !"})
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"the error has occured"})
    }
    
})


// get concerts

app.get("/concerts", UserAuth ,async (req, res) =>{

    try{

        const concerts = await Concert.find({});
        if(!concerts){
            res.status(400).json({message:"concerts does not exists!"});
        }

        return res.status(200).json({concerts});
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:"error fetching the contracts!"});
    }

})


//  get respective concert details 

app.get("/concerts/:id", async (req, res) => {
    try{

        const concertId = req.params.id;

        const concert = await Concert.findById(concertId);
        if(!concert){
            return res.status(400).json({message:"this concert doesnt exists"});
        }

        return res.status(200).json({concert});
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:"error getting respective concert details!"});
    }

})



// admin page get concerts

app.get("/admin/concerts", async (req, res) => {
    try{
        const concerts = await Concert.find({});
        if(!concerts){
            return res.status(400).json({message: "there are no concerts available right now!"});
        }

        return res.status(200).json({concerts});
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:"error finding concerts"})
    }
});


// delete concert from the admin

app.delete("/admin/concerts/:id", async (req, res) => {
    try{
        const concerId = req.params.id;
        const concert = await Concert.findById(concerId);

        if(!concert){
            return res.status(400).json({message:"the concert doesnt exist"});
        }

        await Concert.findByIdAndDelete(concerId);
        return res.status(201).json({message:"the concert deleted successfully !"});
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:"error finding and deleting the concert!"});
    }
})  


// booking an concert

app.post("/concerts/:id/book", async(req, res) => {
    try{    
        const userId = req.user.id;
        const concertId = req.params.id;

        const concert = await Concert.findById(concertId);

        if(!concert){
            return res.status(401).json({message:"there is no such concert exist for booking !"});
        }

        if(concert.availabletickets <= 0){
            return res.status(401).json({message: "there are no available tickets for this concert! "});
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({message:"there is no such user exists to book a concert !"});
        }

        if(user.bookedtickets.includes(concertId)){
            return res.status(400).json({message:"You have already booked this concert previuosly!"});
        }

        concert.bookedby.push(userId);
        concert.availabletickets -= 1;

        await concert.save();

        user.bookedtickets.push(concertId);
        await user.save();

        return res.status(200).json({message:"concert booked successfully !"});

    }
    catch(err){
        console.log("there is error in booking concert in backend !", err);
    }
});

app.listen(port, () => console.log(`server running on port ${port}`));