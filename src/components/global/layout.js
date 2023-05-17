import React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

/**
 * Global layout
 * Import Narbar and Sidebar from  custom component
 */

export default function MiniDrawer() {


  return (
    <Box sx={{ display: "flex" }}>

      <CssBaseline />
      <Navbar/>
      <Sidebar/>

    </Box>
  );
};
