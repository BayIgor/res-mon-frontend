import {CssBaseline, ThemeProvider} from "@mui/material";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import React, {useState} from "react";
import {ColorModeContext, useMode} from "../../themes/mainTheme";

const MainBar = ({ contentComponent }) => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="app" style={{ height: "100vh" }}>
                    <Sidebar isSidebar={isSidebar}/>
                    <main className="content">
                        <Topbar setIsSidebar={setIsSidebar}/>
                        { contentComponent }
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default MainBar;