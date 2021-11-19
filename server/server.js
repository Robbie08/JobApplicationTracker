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

const app = express();  // save instance of express in app
app.use(cors());        


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
    res.send(`Application Received`)
})

/**
 * Logic to handle DELETE operation from our MySQL database
 */
app.get("/deleteApplication", (req, res) => {
    res.send(`Application to delete`)
})

/** 
 * Tell our express server to listen on port 4000.
 * This will allow us to get requests and provide responses. 
 * */
app.listen(portListen, ()=>{
    console.log(`Listening on port: ${portListen}`);
})