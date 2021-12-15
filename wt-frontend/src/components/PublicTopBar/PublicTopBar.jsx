import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import productLogo from "../../constants/ProductLogo.png";
import { useNavigate } from "react-router-dom";
import URI from "../../constants/URI";
const PublicTopBar = () => {
  const navigate = useNavigate();

  const onNavigate = (page) => {
    navigate(page);
  };
  return (
    <AppBar position="relative" elevation={1}>
      <Toolbar>
        <Grid container alignItems="center" spacing={1}>
          <Grid container item xs={8} spacing={2} alignItems="center">
            <Grid item>
              <IconButton edge="start">
                <img
                  src={productLogo}
                  alt="product-logo"
                  width={36}
                  height={36}
                />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                style={{ cursor: "pointer" }}
                onClick={() => onNavigate(URI.HOME)}
              >
                Home
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                style={{ cursor: "pointer" }}
                onClick={() => onNavigate(URI.PRICING)}
              >
                Pricing
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                style={{ cursor: "pointer" }}
                onClick={() => onNavigate(URI.COMPANIES)}
              >
                Companies
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={4} justifyContent="end">
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                sx={{ color: "black" }}
                style={{ alignSelf: "end" }}
                onClick={() => onNavigate(URI.LOGIN)}
              >
                Login/Register
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default PublicTopBar;
