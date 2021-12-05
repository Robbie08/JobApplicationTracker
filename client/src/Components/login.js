import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Axios from 'axios';
import {useNavigate} from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Login() {

    let navigate = useNavigate();

    
    /**
     * We use this to track state of fields
     */
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

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
                console.log(`Response! : ${response}`)
            });        
            navigate("/applications")
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
                console.log(`Response! : ${response}`)
            });        
            //window.open("https://www.google.com/", "_blank")    // params (URL, "_blank"); _blank opens url in new tab

            setUsername("");
            setPassword("");
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
        <div>
            <h2>Login</h2>
            <div className="login-form">
                <div className="login-user-textfields">
                    <TextField onChange={(e) => {setUsername(e.target.value)}} placeholder="johnnyboy123" id="outlined-basic" label="username" variant="outlined" />
                </div>
                <div className="login-user-textfields">
                    <TextField onChange={(e) => {setPassword(e.target.value)}} placeholder="123456" id="outlined-basic" label="password" type="password" variant="outlined" />
                </div>
                <div className="login-form-buttons">
                    <Button onClick={() => onLoginClick()} variant="contained">Login</Button>
                    <Button onClick={() => onRegisterClick()} variant="contained">Register</Button>
                </div>
            </div>
            <h1>{loginStatus}</h1>
        </div>
    )

}

export default Login;