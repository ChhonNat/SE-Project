import React from "react";

/**
 * Components
 */
const Login = React.lazy(() => import('../pages/authentication/login'));
const ScreenDisplay = React.lazy( () => import('../qms/q-components/screen-display/home'))
const Counter = React.lazy( () => import('../qms/q-components/counters/home'))


export const PUBLIC_ROUTES = [
    {
        name: "ScreenDisplay",
        path: "/*" ,
        component: <Counter />,
        children: [

        ]
    },
    {
        name: "Login",
        path: "/login",
        component: <Login />,
        children: [

        ]
    },
    // {
    //     name: "Test-Screen-Display",
    //     path: "/screendisplay",
    //     component: <ScreenDisplay />,
    //     children: [

    //     ]
    // },
    {
        name: "Test-Screen-counter",
        path: "/counter",
        component: <Counter />,
        children: [

        ]
    },
];