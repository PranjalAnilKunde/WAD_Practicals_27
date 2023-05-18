const express = require("express")
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bycrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fetchuser = require("../middleware/fetchuser")


const JWT_SECRET = "jhjjhhj"

//route 1. Create a User using : POST "/api/auth/createuser". no login require
router.post("/createuser", [
  body('name', "Enter a valid name").isLength({ min: 5 }),
  body('email', "Enter a valid email").isEmail(),
  body('password').isLength({ min: 5 }),
], async (req, res) => {
  // If there are errors return bad request and errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //check whether the user with this email exist already
  try {
    let user = await User.findOne({ email: req.body.email });
    //  console.log(user)
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exist" })
    }

    //hashing password
    const salt = await bycrypt.genSalt(10);
    const secPass = await bycrypt.hash(req.body.password, salt)

    //create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })

    //jsonweb token creation
    const data = {
      user: {
        id: user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);

    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    // res.json({error: "please a unique value", message: err.message})})

    res.json({ authtoken })

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server error")
  }
})


//route 2. Authenticate a user using POST "/api/auth/login" . no login required

router.post("/login", [
  body('email', "Enter a valid email").isEmail(),
  body('password', "password can not be blank").exists(),

], async (req, res) => {
  // If there are errors return bad request and errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct credentials" })
    }

    const passwordCompare = await bycrypt.compare(password, user.password)
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please try to login with correct credentials" })

    }

    const data = {
      user: {
        id: user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken })

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server error")
  }

})

  //route 3. Get loggin user details using POST "/api/auth/getuser" a user using POST "/api/auth/login" . no login required

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

// Logout
// router.get('/logout',fetchUser, async (req, res, next)=>  {
//   userid = req.user.email
//   const user=await User.findByIdAndDelete(userid)
//   res.sendStatus(200)
// });


module.exports = router
