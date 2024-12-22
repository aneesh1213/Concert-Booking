import mongoose, { mongo } from "mongoose";

const concertSchema = new mongoose.Schema({
    artistname:String,
    date:String, 
    location:String, 
    ticketprice : String,
    availabletickets:Number,
    starttime:String, 
    endtime:String,
    bookedby : [{type: mongoose.Schema.Types.ObjectId, ref : 'USER'}]
})

const Concert = new mongoose.model('CONCERT', concertSchema);

export default Concert;