import MuiAppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import React, { useContext } from "react";
import profile_avater from './../../qms/assets/profiles/1.jpg';

import AccountCircle from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import OutputIcon from "@mui/icons-material/Output";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appConfig } from "../../constants/app_cont";
import { LayoutContext } from "../../context/layout-context";
import { isLogout } from "../../store/authentication/authenticationService";

const drawerWidth = 280;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const NavbarComponent = () => {
  const { toggleNavbar, setToggleNavbar } = useContext(LayoutContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector((state) => state?.userAuthendicated);

  const handleLogout = () => {
    dispatch(isLogout());
    navigate("/login");
  };

  const handleSetMinSidebar = () => {
    setToggleNavbar(!toggleNavbar);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        open={toggleNavbar}
        sx={{ backgroundColor: appConfig.systemColor }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleSetMinSidebar}
            edge="start"
          >
            {toggleNavbar ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            {appConfig.appName}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* Message feature */}
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              sx={{ display: "none" }}
            >
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <div>
                    <Badge badgeContent={4} color="error">
                      <MailIcon
                        variant="contained"
                        {...bindTrigger(popupState)}
                      />
                      <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <List
                          sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                          }}
                        >
                          <ListItem
                            alignItems="flex-start"
                            className="tableHover"
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Brunch this weekend?"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    Ali Connors
                                  </Typography>
                                  {
                                    " — I'll be in your neighborhood doing errands this…"
                                  }
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                          <ListItem
                            alignItems="flex-start"
                            className="tableHover"
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt="Travis Howard"
                                src="/static/images/avatar/2.jpg"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Summer BBQ"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    to Scott, Alex, Jennifer
                                  </Typography>
                                  {
                                    " — Wish I could come, but I'm out of town this…"
                                  }
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                          <ListItem
                            alignItems="flex-start"
                            className="tableHover"
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt="Cindy Baker"
                                src="/static/images/avatar/3.jpg"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Oui Oui"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    Sandra Adams
                                  </Typography>
                                  {
                                    " — Do you have Paris recommendations? Have you ever…"
                                  }
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </List>
                      </Popover>
                    </Badge>
                  </div>
                )}
              </PopupState>
            </IconButton>

            {/* Notification feature */}
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{ display: "none" }}
            >
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <div>
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon
                        variant="contained"
                        {...bindTrigger(popupState)}
                      />
                      <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <List
                          sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                          }}
                        >
                          <ListItem
                            alignItems="flex-start"
                            className="tableHover"
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Brunch this weekend123?"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    Ali Connors
                                  </Typography>
                                  {
                                    " — I'll be in your neighborhood doing errands this…"
                                  }
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                          <ListItem
                            alignItems="flex-start"
                            className="tableHover"
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt="Travis Howard"
                                src="/static/images/avatar/2.jpg"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Summer BBQ123"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    to Scott, Alex, Jennifer
                                  </Typography>
                                  {
                                    " — Wish I could come, but I'm out of town this…"
                                  }
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                          <ListItem
                            alignItems="flex-start"
                            className="tableHover"
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt="Cindy Baker"
                                src="/static/images/avatar/3.jpg"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Oui Oui123"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    Sandra Adams
                                  </Typography>
                                  {
                                    " — Do you have Paris recommendations? Have you ever…"
                                  }
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </List>
                      </Popover>
                    </Badge>
                  </div>
                )}
              </PopupState>
            </IconButton>

            {/* User Profile */}

            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{display: 'grid'}}>
                <label>{userProfile?.username}</label>
                <label style={{fontSize: 13, marginTop: 2}}>ID: {userProfile?.staffId}</label>
              </div>
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <div>
                    <IconButton
                      size="large"
                      edge="end"
                      aria-label="account of current user"
                      aria-haspopup="true"
                      color="inherit"
                      {...bindTrigger(popupState)}
                      sx={{
                        width: 50,
                        height: 50,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                        marginLeft: 1,
                      }}
                    >
                      <Avatar sx={{ width: 48, height: 48 }} alt="Remy Sharp" src={profile_avater} />
                    </IconButton>
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <List
                        sx={{
                          width: "100%",
                          maxWidth: 360,
                          bgcolor: "background.paper",
                        }}
                      >
                        <ListItem
                          alignItems="flex-start"
                          className="tableHover"
                        >
                          <ListItemAvatar>
                            <AccountCircle />
                          </ListItemAvatar>
                          <ListItemText primary="My Profile" />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem
                          alignItems="flex-start"
                          className="tableHover"
                          onClick={handleLogout}
                        >
                          <ListItemAvatar>
                            <OutputIcon />
                          </ListItemAvatar>
                          <ListItemText>Logout</ListItemText>
                        </ListItem>
                      </List>
                    </Popover>
                  </div>
                )}
              </PopupState>
            </div>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              {/* <MoreIcon /> */}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavbarComponent;
