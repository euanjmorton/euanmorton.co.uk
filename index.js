// Importing express module 
const express = require("express")
const app = express()
const router = express.Router();

require('dotenv').config(); //.env file for config strings

const mysql = require('mysql2');



//remove MIME type executable error
app.use(express.static(__dirname + "/public"))



var apiRoutes = require('./routes/api');

//app.use("/", router);

router.get("/", (req, res, next) => {
    console.log("hello 1")
    res.send("This is the 1 response");
})

// Handling GET /hello request 
router.get("/hello", (req, res, next) => {
    res.send("This is the hello response");
})

router.get('/temps', function(req,res){
    res.sendFile(__dirname + "/public/views/temperatureGraph.html");  
    
    var con = mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        
        /*con.query("SELECT * FROM Pinter_Pi.Temperature", function (err, result) {
            if (err) throw err;
            console.log("result",result);
        });*/
    });  
})

app.use('/', router);
app.use('/api', apiRoutes);

// Server setup 
app.listen(80, () => {
    console.log("Server is Running on port 80...")
}) 
   /* var port = process.env.PORT || 3000;
    app.listen(port);*/
