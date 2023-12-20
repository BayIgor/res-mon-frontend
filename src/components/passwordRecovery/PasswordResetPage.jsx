import {
    Box,
    Button,
    colors, ThemeProvider,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, {useEffect, useState} from "react";
import CustomInput from "../auth/CustomInput";
import AuthService from "../../services/AuthService";
import ResetTitleBox from "./ResetTitleBox";
import {theme} from "../../themes/Theme";
import bgImage from "../../assets/img_1.png";

const PasswordResetPage = () => {

    useEffect(() => {
        document.title = 'Сброс пароля';
    }, []);

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSuccessReset, setSuccessReset] = useState(false);

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (value.trim() === '') {
            setError('Поле не может быть пустым');
        } else {
            setError('');
        }
    };

    const resetpass = async () => {

        if (password.trim() === '') {
            setError('Поле не может быть пустым');
            return;
        }
        try {
            const url = new URL(window.location.href);
            const searchParams = new URLSearchParams(url.search);

            const jwt = searchParams.get("jwt");

            const response = await AuthService.passwordReset({jwt, password});

            console.log(response.status);

            if (response.status === 200) {
                setSuccessReset(true);
            }
        } catch (error){
            setError(error.response.data);
        }
    }

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
                            <Grid
                                xs={12}
                                sm={12}
                                md={6}
                                lg={6}
                                xl={6}
                                minHeight={550}
                            >
                                {!isSuccessReset ? <Box
                                    sx={{
                                        backgroundColor: "rgba(0, 24, 57, 0.8)",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        height: "100%",
                                        borderRadius: {
                                            xs: "30px 30px 30px 30px",
                                            sm: "30px 30px 30px 30px",
                                            md: "30px 30px 30px 30px",
                                            lg: "30px 30px 30px 30px",
                                            xl: "30px 30px 30px 30px",
                                        },
                                    }}
                                >
                                    <Box width="50%" mt={30}>
                                        <CustomInput
                                            label="Пароль"
                                            placeholder="Введите новый пароль..."
                                            isIconActive={true}
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                        <Box
                                            display="flex"
                                            flexDirection="row"
                                            justifyContent="space-between"
                                            mt={2}
                                            width="100%"
                                            color="white"
                                        >
                                            <Button
                                                onClick={resetpass}
                                                variant="contained"
                                                fullWidth
                                                sx={{mt: 6, boxShadow: `0 0 20px ${colors.purple[500]}`}}
                                            >
                                                Подтвердить
                                            </Button>
                                        </Box>
                                        {error && (
                                            <Typography variant="caption" color="error">
                                                {error}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box> : <Box
                                    sx={{
                                        backgroundColor: "rgba(0, 24, 57, 0.8)",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        height: "100%",
                                        borderRadius: {
                                            xs: "30px",
                                            sm: "30px",
                                            md: "30px 0 0 30px",
                                            lg: "30px 0 0 30px",
                                            xl: "30px 0 0 30px",
                                        },
                                    }}
                                >
                                    <Typography
                                        color="white"
                                        fontWeight="bold"
                                        sx={{textAlign: "center", marginTop: 38, marginBottom: 5, marginLeft: 5, marginRight: 5}}
                                    >
                                        Пароль успешно изменён, теперь можете войти в аккаунт используя новый пароль
                                    </Typography>
                                </Box>}
                            </Grid>
                            <ResetTitleBox/>
                        </Grid>
                    </Box>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default PasswordResetPage;
