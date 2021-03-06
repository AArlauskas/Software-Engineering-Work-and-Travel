import {
  HomeOutlined,
  BusinessOutlined,
  PaidOutlined,
  IntegrationInstructionsOutlined,
  MenuOutlined,
  SearchOutlined,
  ExitToAppOutlined,
  TaskOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Button,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Avatar,
} from "@mui/material";
import URI from "../../constants/URI";
import productLogo from "../../assets/ProductLogo.png";
import { useRef, useState } from "react";
import NavDrawer from "../NavDrawer/NavDrawer";
import { useNavigate } from "react-router";
import "./styles.css";
import UserRoles from "../../constants/UserRoles";

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
      [
        "System Instructions",
        {
          icon: <IntegrationInstructionsOutlined />,
          href: URI.SYSTEM_INSTRUCTIONS,
        },
      ],
    ])
  );

  const basicTabs = useRef(
    new Map([
      ["Tasks", { icon: <TaskOutlined />, href: URI.TASKS }],
      ["See Plans", { icon: <SearchOutlined />, href: URI.PRICING }],
      [
        "System Instructions",
        {
          icon: <IntegrationInstructionsOutlined />,
          href: URI.SYSTEM_INSTRUCTIONS,
        },
      ],
    ])
  );

  const proTabs = useRef(
    new Map([
      ["Tasks", { icon: <TaskOutlined />, href: URI.TASKS }],
      ["Lookup", { icon: <SearchOutlined />, href: URI.LOOKUP }],
      [
        "System Instructions",
        {
          icon: <IntegrationInstructionsOutlined />,
          href: URI.SYSTEM_INSTRUCTIONS,
        },
      ],
    ])
  );

  const adminTabs = useRef(
    new Map([
      ["Tasks", { icon: <TaskOutlined />, href: URI.TASKS }],
      ["Lookup", { icon: <SearchOutlined />, href: URI.LOOKUP }],
      ["Logs", { icon: <IntegrationInstructionsOutlined />, href: URI.LOGS }],
    ])
  );

  const getTabs = () => {
    const role = window.localStorage.getItem("role");
    if (role === UserRoles.PUBLIC) return publicTabs;
    if (role === UserRoles.BASIC) return basicTabs;
    if (role === UserRoles.PRO) return proTabs;
    if (role === UserRoles.ADMIN) return adminTabs;
  };

  const isPublic = () => {
    return window.localStorage.getItem("role") === null;
  };

  const onLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const getCredentials = () => {
    return (
      window.localStorage.getItem("firstname")[0] +
      window.localStorage.getItem("lastname")[0]
    );
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
              {isPublic() ? (
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
              ) : (
                <>
                  <Grid item>
                    <Tooltip title={window.localStorage.getItem("role")}>
                      <Avatar sx={{ bgcolor: "#E86D5E" }}>
                        {getCredentials()}
                      </Avatar>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={onLogout}>
                      <ExitToAppOutlined />
                    </IconButton>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopBar;
