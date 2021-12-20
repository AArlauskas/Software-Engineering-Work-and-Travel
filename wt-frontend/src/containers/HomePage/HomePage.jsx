import { Grid, Typography,Button } from "@mui/material";

import travel from "../../constants/travel.png";
import cali from "../../constants/cali.jpg";
import bronx from "../../constants/bronx.jpg";
import broo from "../../constants/broo.jpg";
import alabama from "../../constants/alabama.jpg";
import arizona from "../../constants/arizona.jpg";
import arkansas from "../../constants/arkansas.jpg";
import ohio from "../../constants/ohio.jpg";
import texas from "../../constants/texas.jpg";
import buffalo from "../../constants/buffalo.jpg";
import baltimore from "../../constants/baltimore.jpg";
import fresno from "../../constants/fresno.jpg";
import URI from "../../constants/URI";
import { useState } from "react";


const HomePage = () => {
    return (
        <Grid className="container" container spacing={2}>
          <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Typography variant="h4">About us</Typography>
        </Grid>
      <Grid item  container xs={12}>
        <Grid item  xs={6} alignItems="center">
          <p>
          The Work and Travel USA program is a great opportunity for students to get to know the people, 
          culture, nature of the United States, 
          make new friends, and bring back many impressions that will last for a long time.
          About 100,000 Work and Travel USA participants a year from many parts of the world worked 
          and traveled to the U.S. for months during their summer vacation. Becoming a participant in 
          the program is easy, but finding a job in a host country is often time consuming. Many participants
           in the program look for work themselves by sending letters, e-mails provided by the agency, but 
           after sending several hundred letters and taking a couple of months to reply to them, there are 
           few attractive offers. To avoid finding the desired job for the summer as a tedious and time-consuming 
           task, we offer a time-tested service that will help you select the job offers you are interested in
            during the week and quickly contact the employer you are interested in.
          </p>
          <Typography variant="h5">Do you want to join us? Click here.
          <Button variant="contained" 
                  style={{margin:20}} 
                  color="secondary"
                  >Login/Register</Button>
          </Typography>
        <Grid item xs={2}></Grid>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "top"}}>
        <img src={travel} alt="home" width={400} height={360}/>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <img src={alabama} alt="alabama" width={180} height={150}></img>
        </Grid>
        <Grid item xs={2}>
          <img src={arizona} alt="arizona" width={180} height={150}></img>
        </Grid>
        <Grid item xs={2}>
          <img src={arkansas} alt="arkansas" width={180} height={150}></img>
        </Grid>
        <Grid item xs={2}>
          <img src={cali} alt="cali" width={180} height={150}></img>
        </Grid>
        <Grid item xs={2}>
          <img src={bronx} alt="bronx" width={180} height={150}></img>
        </Grid>
        <Grid item xs={2}>
          <img src={broo} alt="broo" width={180} height={150}></img>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Questions and Answers</Typography>
        </Grid>
        <Grid item xs={6}>
             <ul>
              <li>How it works?<br></br>
              A participant looking to save time and find a favorite summer job in America logs
               on to the wt.emailer website (link here). Selecting the "Get a code" button directs
                the participant to the payment system. After confirming the payment, the system 
                automatically returns you to our page, at the bottom of which is the code you need 
                to enter into the system to log in. After logging in, a newly created e-mail and 
                password are entered. (This mail will only be used to search for work in the Work 
                and Travel USA program). In the system, according to the instructions (here), the 
                participant writes a letter to the employer, attaching his written or video CV. At 
                this point, we recommend that you write the letter in general, without emphasizing 
                the specific company or specific job where you would like to work. This will increase 
                
                the number of job offers you receive.
                Following these steps, from a program participant’s newly created email, which we recall is only used 
                to find work in the Work and Travel USA program, we send +1500 emails over a few days to employers looking 
                for employees throughout the summer season across America. When all letters have been sent, the system 
                indicates that the job is complete and it is time for the participant to start reading the letters and 
                selecting job offers.
                Why create a separate email? Mail and grant access?
                The system only uses the data of the newly created account to send the participant's letter / CV to
                 employers, thus avoiding the restrictions applied by Google. After logging in to the system and completing 
                 all the steps, we recommend that you log in to the system again after 2-3 days and check whether the mailing
                  job is completed. If you see "Emails have been sent" when you're signed in, then emails have been sent.
             </li></ul>
          </Grid>
          <Grid item xs={6}>
            <ul>
              <br></br>
            <li>
                Will I only get positive job offers?<br></br>
                Subscriber to newly created email The mail receives both positive and negative responses
                 from the employers to whom its letter / CV was sent. Our task is to help the participant to send a
                  large amount of personal letters in a short time and increase the chances of finding an attractive job.
            </li><br></br>
            <li>
              When can I change the email I created for the Work and Travel USA job search application? Email password?
              <br></br>
              When a participant sees "Emails have been sent" in the system and can no longer log in with the same 
              password after logging out, our work is complete and the participant can change the password.
            </li><br></br>
            <li>
              Will I really find a job?<br></br>
              The probability of getting a job is 97 percent. Participants are often intimidated by the remaining 3%,
               but we would like to remind you that we do not write or edit the participant's letter / CV, nor do we 
               communicate directly with the employer. Our task is to send a large number of letters to employers in
                a short time and increase the chances of finding an attractive job.
            </li><br></br>
            <li>
              Can I use this service through an agency?
              <br></br>
              Our system uses approved job postings, so it doesn’t matter which agency a participant goes to.
            </li>
          </ul>
      </Grid>
      </Grid>
      <Grid item xs={2}>
          <img src={ohio} alt="ohio" width={180} height={150}></img>
        </Grid>
        <Grid item xs={2}>
          <img src={texas} alt="texas" width={180} height={150}></img>
        </Grid>
        <Grid item xs={2}>
          <img src={buffalo} alt="buffalo" width={180} height={150}></img>
        </Grid>
        <Grid item xs={2}>
          <img src={baltimore} alt="baltimore" width={180} height={150}></img>
        </Grid>
        <Grid item xs={2}>
          <img src={fresno} alt="fresno" width={180} height={150}></img>
        </Grid>
        <Grid item xs={2}>
          <img src={broo} alt="broo" width={180} height={150}></img>
        </Grid>
      <Grid item xs={12}>
      </Grid>
      <Grid item xs={12} />
    </Grid>
  );
}

export default HomePage;
