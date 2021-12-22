import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router";
import URI from "../../constants/URI";

const tiers = [
  {
    title: "Basic",
    price: "0",
    description: [
      "30 daily emails",
      "Random company access",
      "No company lookup",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "Pro",
    subheader: "Most popular",
    price: "15",
    description: [
      "1500 daily emails",
      "Specific company access",
      "Company information lookup",
      "Organised tasks for emails",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
];

const PricingPage = () => {
  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };
  return (
    <Grid
      className="container"
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography component="h1" variant="h4" align="center">
          Pricing
        </Typography>
      </Grid>
      {tiers.map((tier) => (
        // Enterprise card is full width at sm breakpoint
        <Grid
          item
          key={tier.title}
          xs={12}
          sm={tier.title === "Enterprise" ? 12 : 6}
          md={4}
        >
          <Card>
            <CardHeader
              title={tier.title}
              subheader={tier.subheader}
              titleTypographyProps={{ align: "center" }}
              action={tier.title === "Pro" ? <StarIcon /> : null}
              subheaderTypographyProps={{
                align: "center",
              }}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700],
              }}
            />
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "baseline",
                  mb: 2,
                }}
              >
                <Typography component="h2" variant="h3" color="text.primary">
                  €{tier.price}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  /mo
                </Typography>
              </Box>
              <ul style={{ listStyleType: "none" }}>
                {tier.description.map((line) => (
                  <Typography
                    component="li"
                    variant="subtitle1"
                    align="center"
                    key={line}
                  >
                    {line}
                  </Typography>
                ))}
              </ul>
            </CardContent>
            <CardActions>
              <Button
                color="secondary"
                fullWidth
                variant={tier.buttonVariant}
                onClick={() => onNavigate(URI.REGISTER)}
              >
                {tier.buttonText}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PricingPage;
