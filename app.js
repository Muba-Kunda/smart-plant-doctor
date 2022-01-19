const express = require("express");
const mysql = require("mysql");
const path = require('path');
const  bodyparser = require("body-parser");

let config = {
    host :"localhost",
    user  : "root",
    password  :"",
    database : "smartplant"
}

//setting up the connection with the db 
let urlenconder = bodyparser.urlencoded({extended : false});



let db = mysql.createConnection(config);
db.connect((err)=>{
    if(err)throw err;
    else{
        console.log("successfully made the connection with the db ");
    }
})
let app = express();
app.use(urlenconder);
//setting up the 
app.use('/static' , express.static('static'))
//setting up the view engine 
app.set("view engine" , "ejs");
    let results ;
app.get("/" , (req , res)=>{
    let getquery = "SELECT * FROM vegetables LIMIT 11 ;";

    db.query(getquery , (err , result)=>{
        if(err)throw err;
        else {
            console.log("fetched the records");
            results = result;
            console.log(results[0].name)
            console.log(results)
        }
    })
    
})

app.set("views" ,path.join(__dirname , ('views')))

app.get("/home" , (req, res)=>{
    // res.render("index1")
    res.render('index', {results : results});
})




//starting the server 
app.listen(30001 , ()=>{
    console.log("the server has started listening on the port 3000")
})