import {
  HomeOutlined,
  BusinessOutlined,
  PaidOutlined,
  IntegrationInstructionsOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Button,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import URI from "../../constants/URI";
import productLogo from "../../assets/ProductLogo.png";
import { useRef, useState } from "react";
import NavDrawer from "../NavDrawer/NavDrawer";
import { useNavigate } from "react-router";
import "./styles.css";

const TopBar = () => {
  const navigate = useNavigate();
  const [showNavDrawer, setShowNavDrawer] = useState(false);

  const toggleNavDrawer = () => {
    setShowNavDrawer(!showNavDrawer);
  };

  const onNavigate = (page) => {
    navigate(page);
  };

  const publicTabs = useRef(
    new Map([
      ["Home", { icon: <HomeOutlined />, href: URI.HOME }],
      ["Companies", { icon: <BusinessOutlined />, href: URI.COMPANIES }],
      ["Pricing", { icon: <PaidOutlined />, href: URI.PRICING }],
      [
        "Instructions",
        { icon: <IntegrationInstructionsOutlined />, href: URI.INSTRUCTIONS },
      ],
    ])
  );

  const privateTabs = useRef(new Map([]));

  const getTabs = () => {
    return isAdmin() ? privateTabs : publicTabs;
  };

  const isAdmin = () => {
    return false;
  };

  const renderTabs = () => {
    const current = window.location.pathname;
    const result = [];
    getTabs().current.forEach((value, key) => {
      result.push(
        <Grid item key={key}>
          <Typography
            variant="subtitle1"
            onClick={() => onNavigate(value.href)}
            className={
              current === value.href
                ? "navigation-item-current"
                : "navigation-item"
            }
          >
            {key}
          </Typography>
        </Grid>
      );
    });
    return result;
  };

  return (
    <>
      <NavDrawer
        tabs={getTabs()}
        open={showNavDrawer}
        onOpen={toggleNavDrawer}
        onClose={toggleNavDrawer}
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
                  <MenuOutlined />
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
                {renderTabs()}
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

export default TopBar;
