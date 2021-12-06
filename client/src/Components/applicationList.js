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

function ApplicationList() {
  
  /**
   * We use this to track state of fields
   */
  const [company, setCompany] = useState("");
  const [positionTitle, setPositionTitle] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [methodOfApplication, setMethodOfApplication] = useState("");
  const [linkToApplication, setLinkofApplication] = useState("");
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");
  const  [companyList, setCompanyList] = useState([{applicationId: 3, company: 'Google', position: 'Software Engineer I', date: 'Aug 12, 2021'}, {applicationId: 4, company: 'Intuit', position: 'Software Engineer II', date: 'July 10, 2021'}]);


  
    function getApplicationList(){
      Axios.get('http://localhost:4000/api/getApplications')
      .then((response) => response.data )
      .then((response) => { 
        //setCompanyList([...companyList, response]);
        setCompanyList(response)
      });

      console.log(companyList)
    }

    function onSubmitApplication(){
      Axios.post('http://localhost:4000/api/addApplication',{
          company: company,
      })
      .then((response) => {
          console.log(response)
      });
      getApplicationList();
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
                <h2>Applications</h2>
        
                <div className="input-form">
                  <div className="input-form">
                  <TextField onChange={e => {setCompany(e.target.value)}} placeholder="Microsoft" id="outlined-basic" label="Company" variant="outlined" />
                  </div>
                 <div><Button onClick={() => onSubmitApplication()} variant="contained">Submit</Button></div>
                </div>
                <div className="ui-cards">
                    {companyList.map((record) => (
                      
                        <Card sx={{ maxWidth: 345 }}>
                          {/* we can edit card content starting here*/}
                          <CardHeader 
                              title={record["company"]}
                              subheader={record["position"]}
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
                              Date: {record["date"]}
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
                            <Button size="small" onClick={() => onEditClick()}>Edit</Button>
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