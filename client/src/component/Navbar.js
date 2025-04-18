import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container1 from "./Container1";
import MenuIcon from "@mui/icons-material/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserFriends,
  faEnvelope,
  faMoneyCheckAlt,
  faUser,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

import { useMediaQuery, Menu, MenuItem } from "@mui/material";

const Navbar = () => {
  const isLargeScreen = useMediaQuery("(min-width:600px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isJobMenuOpen, setIsJobMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  function handleNavAndClose() {
    handleMenuClose();
  }

  const handleJobMenuToggle = () => {
    setIsJobMenuOpen(!isJobMenuOpen);
  };

  useEffect(() => {
    return () => {
      setIsJobMenuOpen(false);
    };
  }, []);

  useEffect(() => {
    setIsJobMenuOpen(location.pathname === "/showjob");
  }, [location.pathname]);

  return (
    <>
    <AppBar position="fixed" sx={{ background: 'rgb(88 28 135)' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         WEBSTER
          </Typography>
          {isLargeScreen ? (
            <>
              <Button color="inherit" component={Link} to="/home2">
                <FontAwesomeIcon icon={faHome} style={{ marginRight: "5px" }} />
                Home
              </Button>
              <Button color="inherit" component={Link} to="/about">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ marginRight: "5px" }}
                />
                About Us
              </Button>
              
              <Button
  color="inherit"
  component={Link}
  to="/signin"
>
  <FontAwesomeIcon
    icon={faSignInAlt}
    style={{ marginRight: "5px" }}
  />
  Login
</Button>


            </>
          ) : (
            <>
              <IconButton
                color="inherit"
                style={{ marginRight: "20px" }}
                component={Link}
                to="/home2"
              >
                <FontAwesomeIcon icon={faHome} />
              </IconButton>

              <IconButton
                color="inherit"
                style={{ marginRight: "20px" }}
                component={Link}
                to="/about"
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </IconButton>
              <IconButton
                color="inherit"
                style={{ marginRight: "20px" }}
                component={Link}
                to="/signin"
              >
                <FontAwesomeIcon icon={faSignInAlt} />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <div
        style={{
          paddingTop: "9vh" /* Adjust the value based on your design */,
        }}
      >
        <Container1 />
      </div>
    </>
  );
};

export default Navbar;
