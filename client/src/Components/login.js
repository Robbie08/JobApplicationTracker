import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Axios from 'axios';
import {useNavigate} from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";

function Login() {

    let navigate = useNavigate();

    Axios.defaults.withCredentials = true;  // we need this in order to access our cookies
    /**
     * We use this to track state of fields
     */
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");



    // This useEffect will allow us to retrieve the list of companies once the page is refreshed
    React.useEffect(()=>{
        console.log("Component mounted at -> " +Date.now())

        // this endpoint looks exactly like the one from the other login, except
        // this one is a GET request while the other one is a POST request
        Axios.get("http://localhost:4000/api/login")
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err)
        })
    },[])
    /**
     * This function is called when the "delete" button is clicked on the card
     * We can find the call inside the <Button> tag
     */
    function onLoginClick() {
        // do stuff when button is clicked
        console.log('Login!')
        console.log("UserName: " +username);
        console.log("Password: " +password);
        if(username != "" && password != ""){
            Axios.post("http://localhost:4000/api/login", {
                username: username, 
                password: password
            }).then((response) => {
                console.log(`Response! : ${response.data}`)
                if(response.data.message){
                    setLoginStatus(response.data.message);
                }else{
                    navigate("/applications")   // this will change the route and send us to the applications list page
                }
            }).catch(err => {
                return err;
            });    
        }else{
            setLoginStatus("Error: please enter non null fields");
        }
        
    
    }

    /**
     * This function is called when the "delete" button is clicked on the card
     * We can find the call inside the <Button> tag
     */
    function onRegisterClick () {
        // make sure to clear text
        console.log("UserName: " +username);
        console.log("Password: " +password);

        if(username != "" && password != ""){
            Axios.post("http://localhost:4000/api/register", {
                username: username, 
                password: password
            }).then((response) => {
                console.log(`Response! : ${response.data}`)
                setLoginStatus(response.data)
            }).catch(err => {
                return err;
            });        
            //window.open("https://www.google.com/", "_blank")    // params (URL, "_blank"); _blank opens url in new tab

        }
        else{
            console.log("register values are null")
        }
    } 

    function onDeleteUser () {
        // make sure to clear text
        console.log("UserName: " +username);
        console.log("Password: " +password);

        if(username != "" && password != ""){
            Axios.post("http://localhost:4000/api/deleteUser", {
                username: username, 
                password: password
            }).then((response) => {
                console.log(`Response! : ${response.data}`)
                setLoginStatus(response.data)
            }).catch(err => {
                return err;
            });        
            //window.open("https://www.google.com/", "_blank")    // params (URL, "_blank"); _blank opens url in new tab

        }
        else{
            console.log("register values are null")
        }
    } 

    function onUpdateUser(){
        // make sure to clear text
        console.log("UserName: " +username);
        console.log("Password: " +password);

        if(username && password){
            Axios.post("http://localhost:4000/api/updateUser", {
                username: username, 
                password: password
            }).then((response) => {
                console.log(response.data)
                setLoginStatus(response.data.message)
            }).catch(err => {
                return err;
            });
            //window.open("https://www.google.com/", "_blank")    // params (URL, "_blank"); _blank opens url in new tab

        }
        else{
            console.log("register values are null")
        }
    }

    /**
     * The value={} will grab our value from our state and display whatever the current state is set to. By default it's "".
     * We use the onChange={e => this.setState({})} to allow for user input into the text field.
     */
  
    return(         
        <Container>
            <h2>Login/Registration</h2>
            <div className="login-form">
                <div className="login-user-textfields">
                    <TextField onChange={(e) => {setUsername(e.target.value)}} placeholder="johnnyboy123" id="outlined-basic" label="username" variant="outlined" />
                </div>
                <br></br>
                <div className="login-user-textfields">
                    <TextField onChange={(e) => {setPassword(e.target.value)}} placeholder="123456" id="outlined-basic" label="password" type="password" variant="outlined" />
                </div>
                <br></br>
                <Grid container spacing={3} className="login-form-buttons">
                    <Grid item>
                    <Button onClick={() => onLoginClick()} variant="contained">Login</Button>
                    </Grid>
                    <Grid item>
                    <Button onClick={() => onRegisterClick()} variant="contained">Register</Button>
                    </Grid>
                    <Grid item>
                    <Button onClick={() => onDeleteUser()} variant="contained">Delete User</Button>
                    </Grid>
                    <Grid item>
                    <Button onClick={() => onUpdateUser()} variant="contained">Update Password</Button>
                    </Grid>
                </Grid>
            </div>
            <h4>{loginStatus}</h4>
        </Container>
    )

}

export default Login;