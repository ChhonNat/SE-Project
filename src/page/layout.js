//===============sideBar=======================================================================================================
import "../App.css";
import * as React from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import GroupIcon from "@mui/icons-material/Group";
import GroupsIcon from "@mui/icons-material/Groups";
import MailIcon from "@mui/icons-material/Mail";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import logo from "./logo.png";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import OutputIcon from "@mui/icons-material/Output";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BrightnessLowIcon from "@mui/icons-material/BrightnessLow";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

//appBar==============================

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Dashboard
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
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
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
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
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <div>
                        <AccountCircle
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
                                <AccountCircle />
                              </ListItemAvatar>
                              <ListItemText primary="My Profile" />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem
                              alignItems="flex-start"
                              className="tableHover"
                            >
                              <ListItemAvatar>
                                <OutputIcon />
                              </ListItemAvatar>
                              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                                <Link href="logout">Logout</Link>
                              </ListItemText>
                            </ListItem>
                          </List>
                        </Popover>
                      </div>
                    )}
                  </PopupState>
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          style={{
            background: "#1976d2",
            boxShadow:
              "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
            borderColor: "#e5e7eb",
          }}
        >
          <img src={logo} alt="logo" style={{ width: "75%" }} />
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* leftSidebar======================================================================== */}
        <List>
          {/* {['Dashboard', 'New Mentor Reques.', 'Mentors', 'Posts'].map((text, index) => ( */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                <Link href="/">Dashboard</Link>
              </ListItemText>
            </ListItemButton>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                <Link href="candidateform">Candidate Form</Link>
              </ListItemText>
            </ListItemButton>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                <Link href="candidateInfo">Candidate Info</Link>
              </ListItemText>
            </ListItemButton>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <GroupIcon />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                <Link href="interviewRecord">Interview Record</Link>
              </ListItemText>
            </ListItemButton>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                <Link href="interviewform">Interview Form</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {["Replies", "Reports", "Settings"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <BrightnessLowIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
