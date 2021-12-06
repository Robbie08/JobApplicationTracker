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

app.get("/api/getApplications", (req,res) =>{
    const getApplicationsQuery = "SELECT * FROM jobapplicationtracker.jobapplication;"
    db.query(getApplicationsQuery, (err, response) => {
        if(err) console.log(err)
        else res.send(response)
    })
})

/**
 * Logic to handle ADD operation from our MySQL database
 */
 app.post("/api/addApplication", (req, res) => {

    const company = req.body.company
    const position = "Software Engineer II"
    const date = "July 10, 2021"
    // const username = "uniqueuser2"
    // const password = "1234"

    let authError = false;

    // Only if this user is not in the records, let's create the account
    const sqlInsert = `INSERT INTO jobapplication (company, position, date) VALUES (?,?,?);`
    db.query(sqlInsert, [company, position, date], (err, result) => {
        console.log(err);
        res.send("You hit me!")
    })

});

/**
 * Logic to handle DELETE operation from our MySQL database
 */
app.delete("/api/deleteApplication/:appId", (req, res) => {
 

        console.log(req.params.appId)
        const applicationId = req.params.appId
        // let authError = false;
    
        // check if this user does not exist first
        const sqlValidateUser = "SELECT * FROM jobapplicationtracker.jobapplication WHERE `applicationId` = ?;"
        db.query(sqlValidateUser, [applicationId], (err, result) => {
                if(err){
                    res.send({err: err});
                }
    
                /* If we got a username and password with a match */
                if(result.length > 0){
                    // Only if this user is in the records let's delete the account
                    const sqlInsert = "DELETE FROM jobapplicationtracker.jobapplication WHERE `applicationId` = ?;"
                    db.query(sqlInsert, [applicationId], (err, result) => {
                        //console.log(err);
                        res.send("Application deleted!")
                    })
                }
                else if(result.length == 0){
                    res.send("This application ID is invalid")
                }
        })
    
})


app.post("/api/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    // check if this user does not exist first
    const sqlValidateUser = "SELECT * FROM jobapplicationtracker.user WHERE `username` = ? AND `password` = ?;"
    db.query(sqlValidateUser, [username, password], (err, result) => {
            if(err){
                res.send({err: err});
            }

            /* If we got a username and password with a match */
            if(result.length > 0){
                //console.log(result);
                res.send("Logged in!")
            } else if(result.length == 0){
                res.send({message: "Wrong Username/Password"})
            }

    })
});

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
    const sqlValidateUser = "SELECT * FROM jobapplicationtracker.user WHERE `username` = ?;"
    db.query(sqlValidateUser, [username], (err, result) => {
            if(err){
                res.send({err: err});
            }

            /* If we got a username and password with a match */
            if(result.length > 0){
                //console.log(result);
                res.send("You already have an account!")
                authError = true; // set this flag so we don't crate another user
            }
            else if(result.length == 0){
                // Only if this user is not in the records, let's create the account
                const sqlInsert = `INSERT INTO user (username, password) VALUES (?,?);`
                db.query(sqlInsert, [username, password], (err, result) => {
                    console.log(err);
                    res.send("User successfully registerd!")
                })
            }

    })

});

app.post("/api/deleteUser", (req, res) => {

    const username = req.body.username
    const password = req.body.password

    let authError = false;

    // check if this user does not exist first
    const sqlValidateUser = "SELECT * FROM jobapplicationtracker.user WHERE `username` = ?;"
    db.query(sqlValidateUser, [username], (err, result) => {
            if(err){
                res.send({err: err});
            }

            /* If we got a username and password with a match */
            if(result.length > 0){
                // Only if this user is in the records let's delete the account
                const sqlInsert = "DELETE FROM jobapplicationtracker.user WHERE `username` = ? AND `password` = ?;"
                db.query(sqlInsert, [username, password], (err, result) => {
                    console.log(err);
                    res.send("User deleted!")
                })
            }
            else if(result.length == 0){
                res.send("Error with username and password combination")
            }
    })
});
/** 
 * Tell our express server to listen on port 4000.
 * This will allow us to get requests and provide responses. 
 * */
app.listen(portListen, ()=>{
    console.log(`Listening on port: ${portListen}`);
})