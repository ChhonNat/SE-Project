import React from "react";

import { styled, alpha } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import MuiAppBar from "@mui/material/AppBar";
import InputBase from "@mui/material/InputBase";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import OutputIcon from "@mui/icons-material/Output";
import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from '@mui/icons-material/Menu';

import AccountCircle from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import { useDispatch } from "react-redux";
import { isLogout } from "../../store/authentication/authenticationService";
import { Navigate, useLocation, useNavigate } from "react-router-dom";


const NavbarComponent = ({ open, handleSetMinSidebar }) => {

    const location = useLocation();
    const { pathname } = location;
    const pageTitle = pathname !== '/' ? pathname.slice(1).replaceAll('/', ' > ') : 'dashboard';
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(isLogout());
        navigate('/login');
    };

    return (
        <AppBar position="fixed" open={open} >
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: '#283C55' }}>
                    <Toolbar>

                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleSetMinSidebar}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                // ...(open && { display: "none" }),
                            }}
                        >
                            {
                                open ? <ChevronLeftIcon /> : <ChevronRightIcon />
                            }
                        </IconButton>

                        <Typography variant="h6" noWrap component="div">
                            Recruitment Management System
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

                            {/* User Profile                                    */}
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit"
                                sx={{width: 50, height: 50, display:'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray'}}
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
                                                        onClick={handleLogout}
                                                    >
                                                        <ListItemAvatar>
                                                            <OutputIcon />
                                                        </ListItemAvatar>
                                                        <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                                                            Logout
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
                                {/* <MoreIcon /> */}
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </AppBar>
    )
}

export default NavbarComponent;

const drawerWidth = 240;

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


const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));