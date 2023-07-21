import React, { useContext } from "react";
import { styled } from '@mui/material/styles';
import { LayoutContext } from "../../context/layout-context";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const drawerWidth = 280;

const MainPage = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: drawerWidth,
        }),
        ...(!open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 85,
        }),
    }),
);
/**
 * Layout for all page
 */

const MainPageComponent = ({ outlet }) => {

    const { toggleNavbar, setToggleNavbar } = useContext(LayoutContext);

    return (
        <MainPage
            open={toggleNavbar}
        >
            <DrawerHeader />
            {outlet}
        </MainPage>
    )
}

export default MainPageComponent;