import {
  AppBar,
  Button,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import productLogo from "../../constants/ProductLogo.png";
import { useNavigate } from "react-router-dom";
import URI from "../../constants/URI";
import { useState } from "react";
import PublicNavDrawer from "../PublicNavDrawer/PublicNavDrawer";
const PublicTopBar = () => {
  const navigate = useNavigate();
  const [showNavDrawer, setShowNavDrawer] = useState(false);

  const toggleNavDrawer = () => {
    setShowNavDrawer(!showNavDrawer);
  };

  const onNavigate = (page) => {
    navigate(page);
  };
  return (
    <>
      <PublicNavDrawer
        open={showNavDrawer}
        onClose={toggleNavDrawer}
        onOpen={toggleNavDrawer}
      />
      <AppBar position="relative" elevation={1}>
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid container item xs={8} spacing={2} alignItems="center">
              <Hidden smUp>
                <IconButton
                  style={{ marginTop: 20 }}
                  edge="end"
                  onClick={toggleNavDrawer}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <Hidden smDown>
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
                <Grid item>
                  <Typography
                    variant="subtitle1"
                    style={{ cursor: "pointer" }}
                    onClick={() => onNavigate(URI.INSTRUCTIONS)}
                  >
                    Instructions
                  </Typography>
                </Grid>
              </Hidden>
            </Grid>
            <Grid container item xs={4} justifyContent="end">
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
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
    </>
  );
};

export default PublicTopBar;
