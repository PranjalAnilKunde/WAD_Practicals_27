const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    id:mongoose.Types.ObjectId,
    username:String,
    password:String,
    phone:Number,
    email:String,
    
})
module.exports = mongoose.model("user", userSchema);