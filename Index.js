const express = require('express');
const register = require("./register");
const bcrypt = require('bcrypt');
const fs = require('fs');
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonparser = bodyParser.json();
const findIndex = require("./login");


const port = process.env.PORT || 4000;


//method to read data from database

let users;


const readUsers = (rej, res, next) => {
    
    try{
        users = fs.readFileSync("./DB.json", "utf-8");
    } catch (err) {
        console.log(err);
    }

    next();
}


const app = express();
app.use(express.static("public"));
app.use(cors());
//app.use(express.urlencoded({extended: false}));

app.use(readUsers);

app.get('/', (req, res) => {
    res.send("tokopedia server");
})

app.get('/users', (req, res) =>  {
    console.log(users);
    res.send(JSON.parse(users));
})

app.get('/users/add', (req, res) => {
    let user = {
        "name": "Raghav",
        "email": "dvbsjb34@gmail.com",
        "paswword": "acsjbi49"
    }
    register(user);
    console.log("successfully added!");
    res.send("user added");
})



 app.post("/register", jsonparser,  async (req, res) => {
        let dt = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        dt.password = hashedPassword;
        register(dt);
        res.json("successfully added!");
    
 })

app.post("/login", jsonparser, readUsers, async (req, res) => {
    console.log("login request received");
    const uData = findIndex(req.body.email);
    
        console.log(uData);
        if(uData == null) {
            res.json("user not found!");
        } else {
            if(await bcrypt.compare(req.body.password, uData.password) == true) {
            console.log("correct password");
            res.json(uData);
            }else {
                res.json("password incorrect")
            }
        }
    
    
})

app.listen(port, () => {
    console.log("Tokopedia Server is active!");
})
