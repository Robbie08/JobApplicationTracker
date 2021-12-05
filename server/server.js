/**
 * This file will contain our server code for our project. Our Frontend
 * will perform API calls to this server in order to perfrom the CRUD
 * applications to the MySQL database.
 * 
 * This server is using nodemon so we don't need to restart our server after
 * making changes. 
 */
const express = require('express'); // save a express ref
const cors = require('cors');       // save a corse ref
const portListen = 4000;            // port on which we will listen
const mysql = require("mysql");

const app = express();   // save instance of express in app
app.use(express.json()); // to help unpackage json payload
app.use(cors());         // allows cross platform multiplexing


/**
 * Create connection with our database!
 * 
 * NOTE!: I got an error message about authentication and I used this link to help me solve the issue.
 *        https://stackoverflow.com/questions/51008807/nodejs-mysql-client-does-not-support-authentication-protocol    
 */
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password1",
    database: "jobapplicationtracker"
})


/**
 * We will make API calls to the CRUD functions from from the front end client.
 * At the moment all these functions are written with "get" but once we set up
 * our MySQL database we can change them to the appropriate CRUD calls.
 * ex) app.post(...)
 */

/**
 * Logic to handle READ operation from our MySQL database
 */
app.get("/applications", (req, res) => {
    res.send("list of all job applications")
})

/**
 * Logic to handle ADD operation from our MySQL database
 */
app.get("/addApplication", (req, res) => {
    console.log("Processing add op")
    res.send(`Application Received`)
})

/**
 * Logic to handle DELETE operation from our MySQL database
 */
app.get("/deleteApplication", (req, res) => {
    console.log("Processing delete op")
    res.send(`Application to delete`)
})


app.post("/api/login"), (req, res) => {
    const username = req.body.username
    const password = req.body.password
    // const username = "uniqueuser2"
    // const password = "1234"

    let authError = false;

    // check if this user does not exist first
    const sqlValidateUser = `SELECT * FROM users WHERE username = ?;`
    // db.query(sqlValidateUser, [username], (err, result) => {
    //         res.send({err: err});

    //         if(result.length > 0){
    //             res.send(result);
    //             userExists = true;
    //         }
    // })
}

/** 
 * Logic to handle register user
 */

app.post("/api/register", (req, res) => {

    const username = req.body.username
    const password = req.body.password
    // const username = "uniqueuser2"
    // const password = "1234"

    let authError = false;

    // check if this user does not exist first
    const sqlValidateUser = `SELECT * FROM users WHERE username = ?;`
    // db.query(sqlValidateUser, [username], (err, result) => {
    //         res.send({err: err});

    //         if(result.length > 0){
    //             res.send(result);
    //             userExists = true;
    //         }
    // })

    if(username == null || password == null){
        res.send({message: "Fields cannot be null"})
        authError = true
    }

    if(authError != true){
        // Only if this user is not in the records, let's create the account
        const sqlInsert = `INSERT INTO user (username, password) VALUES (?,?);`
        db.query(sqlInsert, [username, password], (err, result) => {
            console.log(err);
            res.send("You hit me!")
        })
    }
});
/** 
 * Tell our express server to listen on port 4000.
 * This will allow us to get requests and provide responses. 
 * */
app.listen(portListen, ()=>{
    console.log(`Listening on port: ${portListen}`);
})