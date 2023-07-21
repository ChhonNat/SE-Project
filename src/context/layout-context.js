import React, { createContext, useState } from "react";

export const LayoutContext = createContext();


export const LayoutContextProvider = ({children}) => {

    const [toggleNavbar, setToggleNavbar] = useState(true);

    return (
        <LayoutContext.Provider value={{toggleNavbar, setToggleNavbar}}>
            {
                children
            }
        </LayoutContext.Provider>
    )
}