const express = require("express");
const router= express.Router();
const Student = require("../model/student");
const mongoose = require("mongoose")


router.get('/',(req,res,next)=>{
    res.status(200).json({
        msg:"student get"
    })
})

router.post('/',(req,res,next)=>{
    // console.log(req.body.email)   to get the data in console
    const student = new Student({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender

    })

    student.save()
.then(result=>{
    console.log(result)
    res.status(200).json({
        newStudent:result
    })
})
.catch(err=>{
    console.log(err)
    res.status(500).json({
        error:err
    })
})

})

router.get("/:id",(req,res,next)=>{
     console.log(req.params.id)
     Student.findById(req.params.id)
     .then(result=>{
               res.status(200).json({
                Student:result
        })
    })

    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})


// Delete request
router.delete("/:id",(req,res,next)=>{
     Student.findByIdAndRemove({_id:req.params.id})
     .then(result=>{
        res.status(200).json({
            message:"Deleted",
            result:result
        })
     })
     .catch(err=>{
        res.status(500).json({
            error:err
        })
     })
})



// put : whole data
// patch: only data which we have to udatae

// Put request
router.put("/:id",(req,res,next)=>{
    console.log(req.params.id)
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            gender:req.body.gender
        }
    })
    .then(result=>{
        res.status(200).json({

            message:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})
module.exports =router;