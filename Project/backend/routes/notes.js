const express = require("express")
const router = express.Router();
const Order = require("../models/Notes")
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser")
const Notes = require("../models/Notes")

//route 1. Get All Notes using POST "/api/auth/fetchallnotes" a user using POST "/api/auth/login" . no login required
// router.get("/fetchallnotes", fetchuser, async (req, res) => {

//     try {
//         const notes = await Notes.find({ user: req.user.id });
//         res.json(notes)

//     } catch (error) {
//         console.error(error.message)
//         res.status(500).send("Internal Server error")
//     }

//     res.json([])
// })


// //route 2. Add All Notes using POST "/api/auth/addnote" a user using POST "/api/auth/login" . no login required
// router.post("/addnote", fetchuser, [
//     body('title', "Enter a valid title").isLength({ min: 5 }),
//     body('description', "Description must be atleast 5 character").isLength({ min: 5 })], async (req, res) => {

//         try {
//             const { title, description, tag } = req.body;
//             // If there are errors return bad request and errors 
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ errors: errors.array() });
//             }

//             const notes = new Notes({
//                 title, description, tag, user: req.user.id
//             })
//             const saveNote = await notes.save()
//             res.json(saveNote)
//         } catch (error) {
//             console.error(error.message)
//             res.status(500).send("Internal Server error")
//         }


//     })

// //route 3. Update And existing Notes using put "/api/auth/updatenote" a user using POST "/api/auth/login" . no login required

// router.put("/updatenote/:id", fetchuser, async (req, res) => {
//     const { title, description, tag } = req.body;

//     try {
//         //create a newnote object
//         const newNote = {};
//         if (title) { newNote.title = title };
//         if (description) { newNote.description = description };
//         if (tag) { newNote.tag = tag };


//         //find the note to be updated and update

//         let note = await Notes.findById(req.params.id);
//         if (!note) { return res.status(404).send("Not Found") }

//         if (note.user.toString() !== req.user.id) {
//             return res.status(401).send("Not Allowed");
//         }
//         note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
//         res.json(note)
//     } catch (error) {
//         console.error(error.message)
//         res.status(500).send("Internal Server error")
//     }

// })

// //route 4. Update And existing Notes using delete "/api/auth/deletenote" a user using POST "/api/auth/login" . no login required

// router.delete("/deletenote/:id", fetchuser, async (req, res) => {
//     const { title, description, tag } = req.body;

//     try {
//         //find the note to be deleted and delete

//         let note = await Notes.findById(req.params.id);
//         if (!note) { return res.status(404).send("Not Found") }

//         //aalows deletion onlu if user ows note
//         if (note.user.toString() !== req.user.id) {
//             return res.status(401).send("Not Allowed");
//         }
//         note = await Notes.findByIdAndDelete(req.params.id);
//         res.json({ "Success": "Notes Hass been deleted", note: note });
//     } catch (error) {
//         console.error(error.message)
//         res.status(500).send("Internal Server error")
//     }


// })




router.post("/ordernow", [
    body('title', "Enter a valid title").isLength({ min: 5 }),
    body('address', "Description must be atleast 5 character").isLength({ min: 5 })], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      //create a new order
     const order =await Order.create({
        title: req.body.title,
        address: req.body.address,
        price: req.body.price,
      })
  
      //jsonweb token creation
      const data = {
        order: {
          id: order.id
        }
      }
      console.log(order)
    
  })

  router.post("/getuser", fetchuser, async (req, res) => {

    try {
      userId = req.user.id
      const user = await User.findById(userId).select("-password")
      res.send(user)

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error");
    }
 
})

module.exports = router
