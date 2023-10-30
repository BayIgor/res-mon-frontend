import React from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../themes/Theme";

const bgImage = require("../assets/bg.png");

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
                    {children}
                </div>
            </ThemeProvider>
        </div>
    );
}

export default MainLayout;
