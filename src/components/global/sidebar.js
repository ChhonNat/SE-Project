import React, { useState, useReducer } from "react";
import { styled, useTheme } from "@mui/material/styles";

import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import logo from "../../logo/logo.png";
// import Link from "@mui/material/Link";
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { ROUTES } from "../../constants/routes";
import { Link } from "react-router-dom";

const Sidebar = () => {

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [openMenuCollape, setOpenMenuCollape] = useState(false);
    const [parcentIndex, setParentIndex] = useState(0);
    const [childIndex, setChildIndex] = useState(null);

    /**
     * Handle click change parent menu
     * 
     */
    const handleParentMenuClicked = (index) => {

        /**
         * Get current index
         * When menu index change check children if has child menu change icon and list down all child menus
         * Comparing current index with last index if:
         * 1- If same index set collape opposite boolean
         * 2- If different set collape to alway true
         */
        setParentIndex(index);
        setChildIndex(null);
        index === parcentIndex ? setOpenMenuCollape(!openMenuCollape) : setOpenMenuCollape(true);
    }

    /**
     * Handle click change child menu
     * 
     */
    const handleChildMenuClicked = (index) => {
        setChildIndex(index);
    }

    /**
     * Handle minimize sidebar
     */
    const handleMinSidebar = () => {
        setOpen(!open);
    }

    return (

        <Drawer variant="permanent" open={open}>

            {/* Sidebar Header */}
            <DrawerHeader style={drawerHeader.styles}>
                <img src={logo} alt="logo" style={drawerHeader.img.styles} />
                <IconButton>
                    {theme.direction === "rtl" ? (
                        <ChevronRightIcon onClick={handleMinSidebar} />
                    ) : (
                        <ChevronLeftIcon onClick={handleMinSidebar} />
                    )}
                </IconButton>
            </DrawerHeader>

            {
                ROUTES && ROUTES.length ?
                    <List>
                        {
                            ROUTES.map((menu, index) => (
                                <React.Fragment key={index}>

                                    {/* parent menu */}
                                    <Link to={menu?.children?.length ? null : menu?.path} style={sidebar.link}>
                                        <ListItem key={index} disablePadding sx={sidebar.listItem.sx} style={parcentIndex === index ? sidebar.menu.activeLink : {}}>
                                            <ListItemButton sx={open ? sidebar.listItemButton.initialSx : sidebar.listItemButton.centerSx} onClick={() => handleParentMenuClicked(index)}>

                                                {/*Left parent menu icon */}
                                                <ListItemIcon sx={open ? sidebar.listItemIcon.fixSx : sidebar.listItemIcon.autoSx} >
                                                    {menu?.icon}
                                                </ListItemIcon>

                                                {/* parent menu name */}
                                                <ListItemText primary={menu?.name} sx={{ opacity: open ? 1 : 0 }} />

                                                {/* right parent menu icon */}
                                                {menu?.children?.length ? (openMenuCollape && parcentIndex === index ? <ExpandLess /> : <ExpandMore />) : <></>}
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>

                                    {/* child menu */}
                                    {
                                        menu && menu.children && menu.children.length ?
                                            <Collapse in={parcentIndex === index ? openMenuCollape : false} timeout="auto" unmountOnExit key={index}>
                                                <List component="div" disablePadding>
                                                    {
                                                        menu.children.map((childMenu, childIdx) => (
                                                            <Link to={menu?.path +'/'+ childMenu?.path} style={sidebar.link} key={childIdx}>
                                                                <ListItemButton sx={{ pl: 5 }} 
                                                                    onClick={() => handleChildMenuClicked(childIdx)} 
                                                                    style={childIndex === childIdx ? sidebar?.menu?.child?.activeLink : {}}
                                                                    >

                                                                    {/* child menu icon */}
                                                                    <ListItemIcon>
                                                                        {childMenu?.icon}
                                                                    </ListItemIcon>

                                                                    {/* child menu name */}
                                                                    <ListItemText primary={childMenu?.name} />

                                                                </ListItemButton>
                                                            </Link>
                                                        ))
                                                    }
                                                </List>
                                            </Collapse>
                                            :
                                            <></>
                                    }

                                    {/* divider */}
                                    {
                                        menu.isDivider && <Divider />
                                    }
                                </React.Fragment>
                            ))
                        }
                    </List>
                    :
                    <></>
            }

        </Drawer>
    );
};

export default Sidebar;

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({

    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme), "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && { ...closedMixin(theme), "& .MuiDrawer-paper": closedMixin(theme), }),
}));

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

/**
 * Style customer drawer header
 */
const drawerHeader = {
    styles: {
        background: "#1976d2",
        boxShadow:
            "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
        borderColor: "#e5e7eb",
    },
    img: {
        styles: { width: "75%" }
    }
};


/**
 * Style customer sidebar
 */
const sidebar = {
    link: {
        textDecoration: 'none',
        color: 'black',
    },
    menu: {
        activeLink: {
            backgroundColor: '#f2eeee',
        },
        child: {
            activeLink: {
                backgroundColor: '#f7f6f6',
            },
        }
    },
    listItem: {
        sx: { display: "block" }
    },
    listItemButton: {
        initialSx: { minHeight: 48, justifyContent: "initial", px: 2.5, },
        centerSx: { minHeight: 48, justifyContent: "center", px: 2.5, }
    },
    listItemIcon: {
        fixSx: {
            minWidth: 0,
            mr: 3,
            justifyContent: "center",
        },
        autoSx: {
            minWidth: 0,
            mr: "auto",
            justifyContent: "center",
        }
    }
};
