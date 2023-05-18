const mongoose = require("mongoose")
const studentSchema = new mongoose.Schema({
    id:mongoose.Types.ObjectId,
    name:String,
    email:String, 
    phone:Number,
    gender:String
})
module.exports = mongoose.model("student", studentSchema);