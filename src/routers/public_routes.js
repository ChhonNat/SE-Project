import React from "react";

/**
 * Components
 */
const Login = React.lazy(() => import('../pages/authentication/login'));
const ScreenDisplay = React.lazy( () => import('../qms/q-components/screen-display/home'))


export const PUBLIC_ROUTES = [
    {
        name: "ScreenDisplay",
        path: "/display" ,
        component: <ScreenDisplay />,
    },
    {
        name: "Login",
        path: "/*",
        component: <Login />,
        children: [

        ]
    },
];