import React from "react";

/**
 * Components
 */
const Login = React.lazy(() => import('../pages/authentication/login'));


export const PUBLIC_ROUTES = [
    {
        name: "Login",
        path: "/*" ,
        component: <Login />,
        children: [

        ]
    },
    {
        name: "Login",
        path: "/login",
        component: <Login />,
        children: [

        ]
    }
];