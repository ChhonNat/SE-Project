import { Box, Container } from "@mui/material";
import React from "react";

/**
 * Layout for all page
 */

const PageContainer = ({layout}) => {
    return (
        
        <Box sx={{ display: "flex", padding: 3 }} style={{  paddingTop: 80, width: "85%", float: "right" }}>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {layout}
            </Box>
        </Box>
    )
}

export default PageContainer;