import React from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader } from '@mui/material';


class ApplicationList extends React.Component {
    
    /**
     * We use this to track state of fields
     */
    state = {
        company : "",
        positionTitle: "",
        dateApplied: "",
        methodOfApplication: "",
        linkToApplication: "",
        status: "",
        comments: ""
    }

    /**
     *  This function is called when the "edit" button is clicked on the card
     *  We can find the call inside the <Button> tag
     */
    onDeleteClick = () => {
        // do stuff when button is clicked
        console.log('Clicked Delete!')
    }

    /**
     * This function is called when the "delete" button is clicked on the card
     * We can find the call inside the <Button> tag
     */
    onEditClick = () => {
        // do stuff when button is clicked
        console.log('Clicked Edit!')
    }

    /**
     * This function is called when the "delete" button is clicked on the card
     * We can find the call inside the <Button> tag
     */
    onGoToPortalClick = () => {
        // Go to application link
        console.log('Go To Portal Clicked')
        window.open("https://www.google.com/", "_blank")    // params (URL, "_blank"); _blank opens url in new tab
    } 

    /**
     * The value={} will grab our value from our state and display whatever the current state is set to. By default it's "".
     * We use the onChange={e => this.setState({})} to allow for user input into the text field.
     */
    render(){
        console.log(this.state.company) /* This will print out every character change inside the text company text box */
        return(         
            <div>
                <h2>Applications</h2>
        
                <div className="input-form">
                 <TextField value={this.state.task} onChange={e => this.setState({company: e.target.value})} placeholder="Microsoft" id="outlined-basic" label="Company" variant="outlined" />
                </div>
                <div><Button variant="contained">Submit</Button></div>
                

                <Card sx={{ maxWidth: 345 }}>

                {/* we can edit card content starting here*/}
                <CardHeader 
                    title="Google"
                    subheader="Software Engineer I"
                />
                <CardMedia
                  component="img"
                  width= "50%"
                  height= "160"
                  image={`${process.env.PUBLIC_URL}/images/google.png`   /*This accesses our working dir at public/images/   */}
                  alt="job_post"
                />

                <CardContent>
                  <Typography  align="left" variant="body2" color="text.secondary">
                    Date: Novemeber 12,2021
                  </Typography>
                  <Typography align="left" variant="body2" color="text.secondary">
                    Status: Final Round
                  </Typography>
                  <Typography  align="left" variant="body2" color="text.secondary">
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                  </Typography>
                </CardContent>
                <CardActions>

                {/*We use onClick caller to call our handler functions... that we put outside of render */}
                  <Button size="small" onClick={() => this.onEditClick()}>Edit</Button>
                  <Button size="small" onClick={() => this.onDeleteClick()}>Delete</Button>
                  <Button size="small" onClick={() => this.onGoToPortalClick()}>Go To Portal</Button>
                </CardActions>
              </Card>
                
            </div>
            
        )
    }
}

export default ApplicationList;