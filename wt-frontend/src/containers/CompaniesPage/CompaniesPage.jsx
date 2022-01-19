import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import CompanyRegisterForm from "../../components/CompanyRegisterForm/CompanyRegisterForm";
import CompanyImage from "../../assets/CompanyImage.jpg";
import { companySignUp } from "../../api/PublicApi";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";

const CompaniesPage = () => {
  const [showSignUpSuccess, setShowSignUpSuccess] = useState(false);
  const [showSignUpError, setShowSignUpError] = useState(false);
  const [signUpErrorText, setSignUpErrorText] = useState("");

  const onCompanySignUp = (data) => {
    companySignUp(data)
      .then((response) => {
        setShowSignUpSuccess(true);
      })
      .catch((error) => {
        setShowSignUpError(true);
        setSignUpErrorText(error.response.data);
      });
  };

  const hideSignUpMessages = () => {
    setShowSignUpSuccess(false);
    setShowSignUpError(false);
    setSignUpErrorText("");
  };
  return (
    <>
      {showSignUpError && (
        <CustomSnackbar
          message={signUpErrorText}
          onClose={hideSignUpMessages}
          severity="error"
        />
      )}
      {showSignUpSuccess && (
        <CustomSnackbar
          message="Company registered successfully!"
          onClose={hideSignUpMessages}
          severity="success"
        />
      )}
      <Grid className="container" container spacing={2}>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <img src={CompanyImage} alt="company-choice" width={400} />
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <Typography variant="h4">Why should you join us?</Typography>
          </Grid>
          <Grid item xs={12}>
            <p>
              You want to go on work and travel but not waste to much time sending 
              emails one by one to each company? Then, we have the perfect thing 
              for you. Our application will help you sending many emails at once. You can 
              write only one email and send it to all the companies or to select specific ones
              that you want. You can select, the country you want, or to just search through specific
              type of jobs and list only those companies relevant to your wish. 
              Don't spend all your time just typing. With few clicks, and less effort,
              you can do all at once. You can see the raitings of the companies, their location, type of work, pricing 
              and many more things. You can make your choice and make your life way easier.       
              </p>
            <p>
              You will get two options as a user: the basic user and the pro user. If you are
              the basic user you won't need to pay for any of our services, but also you won't be
              able to get all the things that we provide. You will be able to send only 30 emails daily, 
              no company lookup and just random company access. Being basic user will help you to see if
              our application is worth for your money and does it actualy working and doing the things that
              you want to be done like sending mail. So basically, you can test our application for free.

            </p>
            <p>If you want to be Pro user, then you will need to pay 15 euros per month, but
              you will be able to send up to 1500 daily emails, have specific company access,
              check informations about companies, organised task for emails. You will be able to pick specific location or
              specific type of job. You can also separate the companies and write diferent specific mail for each separation and
              send the mail only to them. 
            </p>
            <p> You are a company and you want to find young people from different countries and give them job? Register your company to 
              our application. Help young people that are searching for job to be able to see your company. Insert informations such as what are you 
              searching for, what kind of job you are providing, where is your location, what is your email and provide us with your website.            </p>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">
              What information are we asking?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ul>
              <li>
                Insert your company's name and get into our system.
              </li>
              <li>
                Provide us with your email, website and phone, and make life for young people easier to send you mail.
              </li>
              <li>
                Select where is the location of your company, country, city and address.
              </li>
              <li>
                Tell us what kind of job are you providing.

              </li>
            </ul>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <CompanyRegisterForm onSignUp={onCompanySignUp} />
        </Grid>
        <Grid item xs={12} />
      </Grid>
    </>
  );
};

export default CompaniesPage;
