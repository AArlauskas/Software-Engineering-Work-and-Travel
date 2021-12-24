import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";

const NavDrawer = ({ open, onOpen, onClose, tabs }) => {
  const navigate = useNavigate();

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

export default NavDrawer;
