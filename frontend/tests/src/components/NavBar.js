import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";

const root = {
  flexGrow: "1"
};

const grow = {
  flexGrow: "1"
};
const menuButton = {
  marginLeft: "-12",
  marginRight: "20"
};

export const NavBar = props => {
  const [state, setState] = useState({
    auth: true,
    anchorEl: null
  });
  const open = Boolean(state.anchorEl);

  const handleMenu = event => {
    setState({ anchorEl: event.currentTarget });
  };

  const handleClose = () => {
    setState({ anchorEl: null });
  };

  return (
    <div style={root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            aria-owns={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={e => handleMenu(e)}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Typography variant="h6" color="inherit" style={grow}>
            {props.page === 0 && props.currentUser.name
              ? `Account Info for ${props.currentUser.name}`
              : props.currentUser.name
              ? `Orders for ${props.currentUser.name}`
              : `Not Logged In`}
          </Typography>

          <Menu
            id="menu-appbar"
            anchorEl={state.anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={() => handleClose()}
          >
            <MenuItem
              onClick={() => {
                props.setCurrentPage(0);
                handleClose();
              }}
            >
              My Account
            </MenuItem>
            <MenuItem
              onClick={() => {
                props.setCurrentPage(1);
                handleClose();
              }}
            >
              My Orders
            </MenuItem>
          </Menu>
          {/*<Button style={{ color: "white" }}>Logout</Button>*/}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
