// const express = require("express")

// const app = express();

// const port = process.env.PORT || 2000

// app.get("/", (req, res)=>{
//     res.send("Hello")
// })

// app.listen(port, ()=>{console.log(`${port} running`)})

const connectToMongo = require("./db");
var express = require("express");

connectToMongo();
const app = express();
const port = 5000;

var cors = require("cors");
app.use(cors());

app.use(express.json());

//available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.listen(port, () => {
  console.log(`Food hub backend listening on port ${port}`);
});
