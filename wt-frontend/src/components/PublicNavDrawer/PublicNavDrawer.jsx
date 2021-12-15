import React, { useState, useRef } from "react";
import URI from "../../constants/URI";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import PaidIcon from "@mui/icons-material/Paid";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import { useNavigate } from "react-router";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";

const PublicNavDrawer = ({ open, onOpen, onClose }) => {
  const navigate = useNavigate();

  const tabs = useRef(
    new Map([
      ["Home", { icon: <HomeIcon />, href: URI.HOME }],
      ["Companies", { icon: <BusinessIcon />, href: URI.COMPANIES }],
      ["Pricing", { icon: <PaidIcon />, href: URI.PRICING }],
      [
        "Instructions",
        { icon: <IntegrationInstructionsIcon />, href: URI.INSTRUCTIONS },
      ],
    ])
  );

  const getSelectedTabKey = () => {
    let selected = null;
    tabs.current.forEach((value, key) => {
      if (window.location.href.includes(value.href)) {
        selected = key;
      }
    });
    return selected;
  };

  const [selectedTabKey, setSelectedTabKey] = useState(getSelectedTabKey());

  const handleTabClick = (key) => () => {
    setSelectedTabKey(key);
    const { href } = tabs.current.get(key);
    navigate(href);
    onClose();
  };

  const renderTabListItems = () => {
    const listItems = [];
    tabs.current.forEach((value, key) => {
      listItems.push(
        <ListItem
          button
          key={key.toString()}
          onClick={handleTabClick(key)}
          selected={selectedTabKey === key}
        >
          <ListItemIcon>{value.icon}</ListItemIcon>
          <ListItemText primary={key} />
        </ListItem>
      );
    });

    return listItems;
  };

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onOpen={onOpen}
      onClose={onClose}
    >
      <List style={{ width: "40vh" }}>{renderTabListItems()}</List>
    </SwipeableDrawer>
  );
};

export default PublicNavDrawer;
