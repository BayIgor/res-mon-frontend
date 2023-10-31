import React from "react";
import {Box} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import SignUpInPage from "./components/auth/SignUpInPage";
import AuthTitleBox from "./components/auth/AuthTitleBox";
import MainLayout from "./layouts/MainLayout";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import EmailEnterPage from "./components/passwordRecovery/EmailEnterPage";
import PasswordTitleBox from "./components/passwordRecovery/PasswordTitleBox";
import PasswordResetPage from "./components/passwordRecovery/PasswordResetPage";
import ResetTitleBox from "./components/passwordRecovery/ResetTitleBox";

const App = () => {
    return (
        <Router>
            <MainLayout>
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
                        <Routes>
                            <Route path="/account" element={<><SignUpInPage/><AuthTitleBox/></>}/>
                            <Route path="/forgot_password" element={<><EmailEnterPage/><PasswordTitleBox/></>}/>
                            <Route path="/reset_password" element={<><PasswordResetPage/><ResetTitleBox/></>}/>
                        </Routes>
                    </Grid>
                </Box>
            </MainLayout>
        </Router>
    );
};

export default App;