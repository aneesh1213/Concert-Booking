import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:String, 
    password:String,
    bookedtickets : [{ type:mongoose.Schema.Types.ObjectId, ref:'CONCERT'}]
});

const User = mongoose.model('USER', userSchema);

export default User; 