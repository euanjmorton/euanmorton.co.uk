// Importing express module 
const express = require("express")
const app = express()
const router = express.Router();

// Handling GET / request 
app.use("/", router);

router.get("/", (req, res, next) => {
    console.log("hello 1")
    res.send("This is the 1 response");
})

// Handling GET /hello request 
router.get("/hello", (req, res, next) => {
    res.send("This is the hello response");
})

router.get('/test', function(req,res){
    console.log("hello test")
    res.sendFile(__dirname + "/index.html");    
})

// Server setup 
app.listen(3000, () => {
    console.log("Server is Running on port 3000...")
}) 