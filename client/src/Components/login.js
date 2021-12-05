import React from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader } from '@mui/material';
import Axios from 'axios';


class Login extends React.Component {

    
    /**
     * We use this to track state of fields
     */
    state = {
        username:"",
        password:"",
    }

    /**
     * This function is called when the "delete" button is clicked on the card
     * We can find the call inside the <Button> tag
     */
    onLoginClick = () => {
        // do stuff when button is clicked
        console.log('Login!')
        console.log("UserName: " +this.state.username);
        console.log("Password: " +this.state.password);
    }

    /**
     * This function is called when the "delete" button is clicked on the card
     * We can find the call inside the <Button> tag
     */
    onRegisterClick = () => {
        // make sure to clear text
        console.log("UserName: " +this.state.username);
        console.log("Password: " +this.state.password);
        Axios.post("http://localhost:4000/api/register", {
            username: this.state.username, 
            password: this.state.password
        }).then((response) => {
            console.log(`Response! : ${response}`)
        });

        this.setState({
            username: "",
            password: ""
        })

        
        
        //window.open("https://www.google.com/", "_blank")    // params (URL, "_blank"); _blank opens url in new tab
    } 

    /**
     * The value={} will grab our value from our state and display whatever the current state is set to. By default it's "".
     * We use the onChange={e => this.setState({})} to allow for user input into the text field.
     */
    render(){
        console.log(this.state.company) /* This will print out every character change inside the text company text box */
        return(         
            <div>
                <h2>Login</h2>
                <div className="login-form">
                    <div className="login-user-textfields">
                        <TextField value={this.state.task} onChange={e => this.setState({username: e.target.value})} placeholder="johnnyboy123" id="outlined-basic" label="username" variant="outlined" />
                    </div>
                    <div className="login-user-textfields">
                        <TextField value={this.state.task} onChange={e => this.setState({password: e.target.value})} placeholder="123456" id="outlined-basic" label="password" type="password" variant="outlined" />
                    </div>
                    <div className="login-form-buttons">
                        <Button onClick={() => this.onLoginClick()} variant="contained">Login</Button>
                        <Button onClick={() => this.onRegisterClick()} variant="contained">Register</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;