const express = require('express');
const router = express.Router();


const mysql = require('mysql2');


router.use((req, res, next) => {
    next();
});

router.get('/getFridgeStatus', (req, res) => {
    console.log("req to getfridge");
    
    
    var con = mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected! getfridge status");
        
        con.query("SELECT * FROM Pinter_Pi.Temperature ORDER BY ID DESC LIMIT 1;", 
        function (err, result) {
            if (err) throw err;
            console.log("result1",result);
            //return result;
            res.send(result);
        });
    });  

});

module.exports = router;