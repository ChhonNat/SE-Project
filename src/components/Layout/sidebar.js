import React, { useState } from "react";
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
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { PRIVATE_ROUTES } from "../../routers/private_routes";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LOCAL_STORAGE_KEYS } from "../../constants/local_storage";

const drawerWidth = 280;

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );

  
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 25px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 25px)`,
    },
});


/**
 * Style customer drawer header
 */
const drawerHeader = {
    styles: {
        background: "#283C55",
        boxShadow:
            "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
        borderColor: "#e5e7eb",
        justifyContent: "center"
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

const SidebarComponent = (props) => {

    const { open } = props;

    /**
     * To remember active menu or collape we get record from storage
     */
    const menuStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.sidebar.getActiveSidebar));

    const theme = useTheme();
    // const [open, setOpen] = React.useState(true);
    const [menuIndex, setMenuIndex] = useState(menuStorage?.activeIndex || 0);
    const [openMenuCollape, setOpenMenuCollape] = useState(menuStorage?.isOpenCollape || false);

    const location = useLocation();
    const { pathname } = location;
    const parentRoute = '/' + location?.pathname?.split('/')[1] || '/';

    /**
     * Handle minimize sidebar
     */
    const handleMinSidebar = () => {
        // setOpen(!open);
        props.handleMinSidebar(!open)
    }

    /**
     * Method click on sidebar 
     * if menu has submenu open collape to show submenu
     */
    const handleClickMenu = (index) => {
        setMenuIndex(index);
        menuIndex === index ? setOpenMenuCollape(!openMenuCollape) : setOpenMenuCollape(true);

        /**
         * Store active menu and collape in storage to help remember when user reload
         */
        localStorage.setItem(LOCAL_STORAGE_KEYS.sidebar.setActiveSidebar, JSON.stringify({ activeIndex: index, isOpenCollape: menuIndex === index ? !openMenuCollape : true }));
    };

    /**
     * Method to check active or inactive menu
     */
    const checkIsActive = (fullPath) => {

        /**
         * CASE match pathname mean active 
         * CASE no match pathname mean inactive
         */
        if (pathname === fullPath || pathname === fullPath + '/create') return true;
        else return false;
    };

    return (

        <Drawer
            variant="permanent"
            open={open}
        >

            {/* Sidebar Header */}
            <DrawerHeader style={drawerHeader.styles}>
                <img src={logo} alt="logo" style={drawerHeader.img.styles} />
                {/* <IconButton>
                    {theme.direction === "rtl" ? (
                        <ChevronRightIcon onClick={handleMinSidebar} />
                    ) : (
                        <ChevronLeftIcon onClick={handleMinSidebar} />
                    )}
                </IconButton> */}
            </DrawerHeader>

            {
                PRIVATE_ROUTES && PRIVATE_ROUTES.length ?
                    <List>
                        {
                            PRIVATE_ROUTES.map((menu, parentKey) => (
                                <React.Fragment key={parentKey}>

                                    {/* parent menu */}
                                    <Link
                                        to={!menu?.children?.length ? menu?.path : menu?.path + '/' + menu?.children[0].path}
                                        style={sidebar.link}
                                        onClick={() => handleClickMenu(parentKey)}
                                    >
                                        <ListItemButton
                                            sx={open ? sidebar.listItemButton.initialSx : sidebar.listItemButton.centerSx}
                                            style={pathname === menu?.path ? sidebar.menu.activeLink : {}}
                                        >

                                            {/*Left parent menu icon */}
                                            <ListItemIcon sx={open ? sidebar.listItemIcon.fixSx : sidebar.listItemIcon.autoSx} >
                                                {menu?.icon}
                                            </ListItemIcon>

                                            {/* parent menu name */}
                                            <ListItemText primary={menu?.name} sx={{ opacity: open ? 1 : 0 }} />

                                            {/* right parent menu icon */}
                                            {menu?.children?.length ? (parentRoute === menu?.path && menuIndex === parentKey && openMenuCollape ? <ExpandLess /> : <ExpandMore />) : <></>}
                                        </ListItemButton>
                                    </Link>

                                    {/* child menu */}
                                    {
                                        menu && menu.children && menu.children.length ?
                                            <Collapse
                                                in={parentRoute === menu?.path && menuIndex === parentKey && openMenuCollape ? true : false}
                                                timeout="auto"
                                                unmountOnExit
                                                key={parentKey}
                                            >
                                                <List component="div" disablePadding>
                                                    {
                                                        menu.children.map((childMenu, childKey) => (
                                                            <Link to={menu?.path + '/' + childMenu?.path} style={sidebar.link} key={childKey}>
                                                                <ListItemButton sx={{ pl: 5 }}
                                                                    style={checkIsActive(menu?.path + '/' + childMenu?.path) ? sidebar?.menu?.child?.activeLink : {}}
                                                                    key={childKey}
                                                                >
                                                                    <ListItemIcon>
                                                                        {childMenu?.icon}
                                                                    </ListItemIcon>

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

        </Drawer >
    );
};

export default SidebarComponent;


