const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express ();
const mysql = require('mysql'); 

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "credinform",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/api/get", (req,res) =>{
    const sqlSelect = "SELECT * FROM users";
    db.query(sqlSelect, (err, result)=>{
        res.send(result);
    });
});

app.post("/api/insert", (req, res)=> {
    const username = req.body.username
    const password = req.body.password
    const fname = req.body.fname
    const workposition = req.body.workposition

    const sqlInsert = "INSERT INTO users (username, password, fullname, workposition) VALUE(?,?,?,?)";
    db.query(sqlInsert, [username, password, fname, workposition], (err, result)=>{
        console.log(result);
    });
});

app.delete("/api/delete/:username", (req, res) => {
    const name = req.params.username;
    const sqlDelete= "DELETE FROM users WHERE username = ?";

    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err);
    });
});

app.put("/api/update", (req, res) => {
    const mention = req.body.username;
    const workp = req.body.workposition;
    const sqlUpdate= "UPDATE users SET workposition = ? WHERE username = ?";

    db.query(sqlUpdate, [workp, mention], (err, result) => {
        if (err) console.log(err);
    });
});

app.listen(3001, () => {
    console.log('runing on port 3001')
});
