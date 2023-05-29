import React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/Layout/navbar";
import Sidebar from "../components/Layout/sidebar";

/**
 * Global layout
 * Import Narbar and Sidebar from  custom component
 */

export default function ScreenLayout() {


  return (
    <Box sx={{ display: "flex" }}>

      <CssBaseline />
      <Navbar/>
      <Sidebar/>

    </Box>
  );
};
