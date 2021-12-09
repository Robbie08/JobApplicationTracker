/**
 * This file will contain our server code for our project. Our Frontend
 * will perform API calls to this server in order to perfrom the CRUD
 * applications to the MySQL database.
 * 
 * This server is using nodemon so we don't need to restart our server after
 * making changes. 
 */
const express       = require('express');           // save a express ref
const cors          = require('cors');              // save a corse ref
const portListen    = 4000;                         // port on which we will listen
const mysql         = require("mysql");             // to allow us to interact with mySQL DB
const bcrypt        = require("bcrypt")             // allos us to use hashing algorithms to secure passwords
const bodyParser    = require("body-parser");       // parses the front-end body
const cookieParser  = require("cookie-parser");     // parse all cookies
const session       = require("express-session")    // creating sessions
const cookie        = require("cookie");
const saltRounds    = 10

const app = express();   // save instance of express in app
app.use(express.json()); // to help unpackage json payload

// allows cross platform multiplexing
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}));         

// establishes our ability to use these tools
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
    session({
    key: "userId",
    secret: "csproject",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 *24,
    },
    })
);
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

app.post("/api/getApplications", (req,res) =>{
    const userId = req.body.userId
    console.log("userId: "+userId)


    const getApplicationsQuery = "SELECT * FROM jobapplicationtracker.jobapplication WHERE userId = ?;"
    db.query(getApplicationsQuery,[userId], (err, response) => {
        if(err) console.log(err)
        else res.send(response)
    })
})

/**
 * Logic to handle ADD operation from our MySQL database
 */
 app.post("/api/addApplication", (req, res) => {

    const company   = req.body.company;
    const position  = req.body.position;
    const date      = req.body.date;
    const link      = req.body.link;
    const method    = req.body.method
    const appstatus = req.body.appstatus;
    const comments  = req.body.comments;
    const userId    = req.body.userId

    if(link == null)
        link = "n/a";

    // Only if this user is not in the records, let's create the account
    const sqlInsert = `INSERT INTO jobapplication (company, position, date, method, link, appstatus, comments, userId) VALUES (?,?,?,?,?,?,?,?);`
    db.query(sqlInsert, [company, position, date, method, link,appstatus,comments, userId], (err, result) => {
        console.log(err);
        res.send("You hit me!")
    })

});


app.post("/api/getAppLink/:appId", (req, res) => {
 

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
                const sqlInsert = "SELECT link FROM jobapplicationtracker.jobapplication WHERE `applicationId` = ?;"
                db.query(sqlInsert, [applicationId], (err, result) => {
                    //console.log(err);
                    res.send(result)
                })
            }
            else if(result.length == 0){
                res.send("This application ID is invalid")
            }
    })

})

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


app.get("/api/logininfo", (req, res) => {
    const getSessionUser = "SELECT * FROM jobapplicationtracker.usersession WHERE sessionId = 1;"
    db.query(getSessionUser, (req,resp) => {
        console.log(resp)
        res.send(resp);
    })

    console.log("Cookies from logininfo:")
    //req.cookies
    //console.log(cookie.parse(req.headers.cookie || ''));

})

// This one handles obtaining current session user information
app.get("/api/login", (req, res) => {
    // ask if the user is logged in


    console.log(req.session.user)
    if(req.session.user){
        console.log("Logged In")
        res.send({loggedIn: true, user: req.session.user})
    } else{
        console.log("Not logged In")
        res.send({loggedIn: false}) // if the user is not logged in
    }
});


// This one handles login from the login page (Authenticating)
app.post("/api/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    // check if this user does not exist first
    const sqlValidateUser = "SELECT * FROM jobapplicationtracker.user WHERE `username` = ?;"
    db.query(sqlValidateUser, [username], (err, result) => {
            if(err){
                res.send({err: err});
            }

            /* If we got a username and password with a match */
            if(result.length > 0){
                //console.log(result[0].password);
                // check if hash is correct
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response){
                        req.session.user = result
                        res.send(result);
                        
                        // Will update our cache to have the current user
                        const sqlInsert = "UPDATE jobapplicationtracker.usersession SET `userId` = ?, `username` = ?, `password` = ? WHERE sessionId = 1;"
                        db.query(sqlInsert, [result[0].userId, username, result[0].password], (err, result) => {
                            console.log(err);
                        })
                        
                    }else{
                        res.send({message: "Wrong Username/Password"})
                    }
                })
                
            } else if(result.length == 0){
                res.send({message: "User does not does not exist"})
            }

    })
});

/** 
 * Logic to handle register user
 */
app.post("/api/register", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err){
            res.send({err:err})
        }

        // Only if this user is not in the records, let's create the account
        const sqlValidateUser = "SELECT * FROM jobapplicationtracker.user WHERE `username` = ?;"
        db.query(sqlValidateUser, [username], (err, result) => {
                if(err){
                    res.send({err: err});
                }

                /* If we got a username with a match */
                if(result.length > 0){
                    //console.log(result);
                    res.send("You already have an account!")
                    authError = true; // set this flag so we don't crate another user
                }
                else if(result.length == 0){
                    // Only if this user is not in the records, let's create the account
                    const sqlInsert = `INSERT INTO user (username, password) VALUES (?,?);`
                    db.query(sqlInsert, [username, hash], (err, result) => {
                        console.log(err);
                        res.send("User successfully registerd!")
                    })
                }

        })
    })
});

app.post("/api/updateApplication/:appId", (req, res) => {

    const appstatus = req.body.appstatus
    const comments = req.body.comments
    const appid = req.params.appId

    console.log("AppId: "+appid)

    // check if this user does not exist first
    const sqlValidateUser = "SELECT * FROM jobapplicationtracker.jobapplication WHERE applicationId = ?;"
    db.query(sqlValidateUser, [appid], (err, result) => {
            if(err){
                res.send({err: err});
            }

            /* If we got a username and password with a match */
            if(result.length > 0){
                // Only if this user is in the records let's delete the account
                const sqlUpdateCard = "UPDATE jobapplicationtracker.jobapplication SET appstatus = ?, comments = ? WHERE applicationId = ?;"
                db.query(sqlUpdateCard, [appstatus, comments, appid], (err, result) => {
                    console.log(err);
                    res.send("Card updated!")
                })
            
            }
            else if(result.length == 0){
                res.send("This card doesn't exists")
            }
    })
});


app.post("/api/updateUser", (req, res) => {

    const username = req.body.username
    const password = req.body.password

    let authError = false;

    // check if this user does not exist first
    const sqlValidateUser = "SELECT * FROM jobapplicationtracker.user WHERE username = ?;"
    db.query(sqlValidateUser, [username], (err, result) => {
            if(err){
                res.send({err: err});
            }

            /* If we got a username and password with a match */
            console.log('hello',result)
            if(result.length > 0){
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if(err){
                        res.send({err:err})
                    }
                    // Only if this user is in the records let's delete the account
                    const sqlInsert = "UPDATE jobapplicationtracker.user SET password = ? WHERE username = ?;"
                    db.query(sqlInsert, [hash, username], (err, result) => {
                        console.log(err);
                        res.send("User updated!")
                    })
                })
            }
            else if(result.length == 0){
                res.send("No user found")
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
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if(err){
                        res.send({err:err})
                    }
                // Only if this user is in the records let's delete the account
                const sqlInsert = "DELETE FROM jobapplicationtracker.user WHERE `username` = ?;"
                db.query(sqlInsert, [username, hash], (err, result) => {
                    console.log(err);
                    res.send("User deleted!")
                })

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