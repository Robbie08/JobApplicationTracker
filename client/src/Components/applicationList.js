import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader, listClasses } from '@mui/material';
import Axios from 'axios';
import {useCookies} from 'react-cookie';

function ApplicationList() {

  
  
  /**
 * We use this to track state of fields
 */
  const [company, setCompany] = useState("");
  const [positionTitle, setPositionTitle] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [methodOfApplication, setMethodOfApplication] = useState("");
  const [linkToApplication, setLinkofApplication] = useState("");
  const [appstatus, setAppStatus] = useState("");
  const [comments, setComments] = useState("");
  const  [companyList, setCompanyList] = useState([{applicationId: 3, company: 'Google', position: 'Software Engineer I', date: 'Aug 12, 2021'}, {applicationId: 4, company: 'Intuit', position: 'Software Engineer II', date: 'July 10, 2021'}]);
  const [loggedin, setLoggedIn] = useState("");
  const [cookies, setCookie] = useCookies(["userId"]);
  const [currentUser, setCurrentUser] = useState("User");
  const [currentUserId, setCurrentUserId] = useState(1)
  Axios.defaults.withCredentials = true;  // we need this in order to access our cookies

  // This useEffect will allow us to retrieve the list of companies once the page is refreshed
  React.useEffect(()=>{
      console.log("Component mounted at -> " +Date.now())
      console.log(cookies)

      Axios.get('http://localhost:4000/api/logininfo')
      .then((response) => response.data )
      .then((response) => { 
        console.log(response[0]);
        setCurrentUser(response[0].username);
        setCurrentUserId(response[0].userId)
        console.log("curr user: " +response[0].userId)
        getApplicationList(response[0].userId);                     // Grab our applications list only if we have retrieved user

      }).catch((err) =>{
        console.log(err);
      });
      
      
  },[])


  
    function getApplicationList(curruser){
      console.log("userID: " +curruser)
      Axios.post('http://localhost:4000/api/getApplications',{
        userId: curruser
      })
      .then((response) => response.data )
      .then((response) => { 
        setCompanyList(response)
      });
      console.log(companyList)
    }

    function onSubmitApplication(){
      Axios.post('http://localhost:4000/api/addApplication',{
          company: company,
          position: positionTitle,
          date: dateApplied,
          method: methodOfApplication,
          link: linkToApplication,
          appstatus: appstatus,
          comments: comments,
          userId:currentUserId
      })
      .then((response) => {
          console.log(response)
          getApplicationList(currentUserId);
          setCompany("");
          setPositionTitle("");
          setDateApplied("");
          setMethodOfApplication("");
          setLinkofApplication("");
          setAppStatus("");
          setComments("");
      });
     
    }
    /**
     *  This function is called when the "edit" button is clicked on the card
     *  We can find the call inside the <Button> tag
     */
    function onDeleteClick(appId){
      
        // do stuff when button is clicked
        Axios.delete(`http://localhost:4000/api/deleteApplication/${appId}`)
        .then((response) => {
            console.log(response)
            getApplicationList();
        }).catch(err => {
          return err;
        });
        
    }

    /**
     * This function is called when the "delete" button is clicked on the card
     * We can find the call inside the <Button> tag
     */
    function onEditClick(){
        // do stuff when button is clicked
        console.log('Clicked Edit!')

    }

    /**
     * This function is called when the "delete" button is clicked on the card
     * We can find the call inside the <Button> tag
     */
    function onGoToPortalClick(){
        // Go to application link
        console.log('Go To Portal Clicked')
        window.open("https://www.google.com/", "_blank")    // params (URL, "_blank"); _blank opens url in new tab
    } 

    /**
     * The value={} will grab our value from our state and display whatever the current state is set to. By default it's "".
     * We use the onChange={e => this.setState({})} to allow for user input into the text field.
     */
     
        return(         
            <div>
                <h2>Welcome {currentUser}</h2>
        
                <div className="input-form">
                 <TextField onChange={e => {setCompany(e.target.value)}} placeholder="Microsoft" id="outlined-basic" label="Company" variant="outlined" required />  &nbsp;
                 <TextField onChange={e => {setPositionTitle(e.target.value)}} placeholder="Software Engineer" id="outlined-basic" label="Position Title" variant="outlined" required />  &nbsp;
                 <TextField onChange={e => {setDateApplied(e.target.value)}} placeholder="MM/DD/YYYY" id="outlined-basic" label="Date Applied" variant="outlined" required />  &nbsp;
                 <TextField onChange={e => {setMethodOfApplication(e.target.value)}} placeholder="Linkedin" id="outlined-basic" label="Method of Application" variant="outlined" /> &nbsp;
                 <p></p>
                 <TextField onChange={e => {setLinkofApplication(e.target.value)}} id="outlined-basic" label="Link to Application" variant="outlined" /> &nbsp;
                 <TextField onChange={e => {setAppStatus(e.target.value)}} placeholder="Applied" id="outlined-basic" label="Status" variant="outlined" /> &nbsp;
                 <p></p>
                 <TextField  onChange={e => {setComments(e.target.value)}} id="outlined-basic" label="Comments" variant="outlined" /> &nbsp;
                </div>
                <br></br>
                <div><Button onClick={() => onSubmitApplication()} variant="contained">Submit</Button></div>
                <br></br>
                <div className="ui-cards">
                    {companyList.map((record) => (
                      
                        <Card sx={{ maxWidth: 345 }}>
                          {/* we can edit card content starting here*/}
                          <CardHeader 
                              title={record["company"]}
                              subheader={record["position"]}
                          />
                          {/**
                            <CardMedia
                            component="img"
                            width= "50%"
                            height= "160"
                            image={`${process.env.PUBLIC_URL}/images/google.png`   // This accesses our working dir at public/images/ }
                            alt="job_post"
                          />
                          **/}
                          
                          
                          <CardContent>
                            <Typography  align="left" variant="body2" color="text.secondary">
                              Date: {record["date"]}
                            </Typography>
                            <Typography align="left" variant="body2" color="text.secondary">
                              Status: {record["appstatus"]}
                            </Typography>
                            <Typography  align="left" variant="body2" color="text.secondary">
                              {record["comments"]}
                            </Typography>
                          </CardContent>
                          <CardActions>

                          {/*We use onClick caller to call our handler functions... that we put outside of render */}
                            <Button size="small" onClick={() => onEditClick(record["applicationId"])}>Edit</Button>
                            <Button size="small" onClick={() => onDeleteClick(record["applicationId"])}>Delete</Button>
                            <Button size="small" onClick={() => onGoToPortalClick()}>Go To Portal</Button>
                          </CardActions>
                      </Card>
                     
                    ))} 
                    </div>
               
                  
            </div>
            
        )
}

export default ApplicationList;