import { Grid, Typography } from "@mui/material";
import CompanyRegisterForm from "../../components/CompanyRegisterForm/CompanyRegisterForm";
import CompanyImage from "../../assets/CompanyImage.jpg";
import { companySignUp } from "../../api/PublicApi";

const CompaniesPage = () => {
  const onCompanySignUp = (data) => {
    companySignUp(data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  return (
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            aliquid nihil dolor pariatur magni, vitae laudantium provident illo
            culpa asperiores. Sapiente perspiciatis placeat autem alias corporis
            officiis at reiciendis fuga? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Iste at officia modi repellat alias? Beatae labore
            earum soluta, officiis mollitia, ad distinctio quo maxime porro
            dolorem consequuntur quaerat placeat delectus.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum sed
            quas cumque reiciendis quidem dolores eum deserunt, aspernatur
            nesciunt quod possimus, quasi doloremque fugit. Enim qui sapiente
            perspiciatis quidem nobis.
          </p>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">What information are we asking?</Typography>
        </Grid>
        <Grid item xs={12}>
          <ul>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
              laboriosam sunt.
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
              laboriosam sunt.
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
              laboriosam sunt.
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
              laboriosam sunt.
            </li>
          </ul>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CompanyRegisterForm onSignUp={onCompanySignUp} />
      </Grid>
      <Grid item xs={12} />
    </Grid>
  );
};

export default CompaniesPage;
