import React from "react";
import {Box, ThemeProvider} from "@mui/material";
import { theme } from "../themes/Theme";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const bgImage = require("../assets/img_1.png");

function MainLayout(props) {
    const { children } = props;

    return (
        <div>
            <ThemeProvider theme={theme}>
                <div
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        overflow: "hidden",
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: {
                                sm: "90vw",
                                xs: "90vw",
                                md: "60vw",
                                lg: "60vw",
                                xl: "60vw",
                            },
                        }}
                    >
                        <Grid container height="90vh">
                            {children}
                        </Grid>
                    </Box>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default MainLayout;
