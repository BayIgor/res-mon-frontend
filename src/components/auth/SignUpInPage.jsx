import {
    Box,
    Button,
    colors, ToggleButton, ToggleButtonGroup,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import CustomInput from "./CustomInput";
import AuthService from "../../services/AuthService";

const SignUpInPage = () => {

    useEffect(() => {
        document.title = 'Аккаунт'; // Установите новый заголовок
    }, []);

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignUp, setSignUp] = useState(false);
    const navigate = useNavigate();

    const handleAlignment = (event, newAlignment) => {
        setSignUp(newAlignment);
    };


    const handleLoginChange = (e) => {
        const value = e.target.value;
        setLogin(value);

        if (value.trim() === '') {
            setError('Поле не может быть пустым');
        } else {
            setError('');
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (value.trim() === '') {
            setError('Поле не может быть пустым');
        } else if (!value.includes("@") || !value.includes(".")) {
            setError("Неверная почта")
        } else {
            setError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (value.trim() === '') {
            setError('Поле не может быть пустым');
        } else {
            setError('');
        }
    };

    const signup = async () => {
        const response = await AuthService.signup({name: login, email, password});

        if (response.data.jwt) {
            localStorage.setItem('jwt', response.data.jwt);
            navigate('/dashboard');
        }
    }

    const signin = async () => {
        try {
            const response = await AuthService.login({email, password});

            if (response.data.jwt) {
                localStorage.setItem('jwt', response.data.jwt);
                navigate('/dashboard');
            }
        } catch (error) {
            setError('Неверная почта или пароль');
        }
    };

    return (
        <Grid
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            minHeight={550}
            sx={{
                boxShadow: {
                    xs: "",
                    sm: "",
                    md: "15px 2px 5px -5px",
                    lg: "15px 2px 5px -5px",
                    xl: "15px 2px 5px -5px",
                },
            }}
        >
            <Box
                sx={{
                    backgroundColor: "rgba(0, 24, 57, 0.2)",
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
                <Box width="50%">
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Box
                            sx={{
                                mt: "60px",
                                width: "200px",
                                height: "50px",
                                bgcolor: "primary.main",
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: `0 0 20px ${colors.green[500]}`,
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold" color="white">
                                Монитор Ресурсов
                            </Typography>
                        </Box>
                        <Typography
                            color="white"
                            fontWeight="bold"
                            sx={{textAlign: "center", marginTop: 4, marginBottom: 0}}
                            mt={7}
                            mb={1}
                        >
                            Управляй своими счётчиками, с удобством
                        </Typography>
                        <Typography color="white" fontWeight="bold" sx={{textAlign: 'center', margin: 0}} mt={7} mb={3}>
                        </Typography>
                        <ToggleButtonGroup
                            value={isSignUp}
                            exclusive
                            onChange={handleAlignment}
                            aria-label="text alignment"
                            sx={{
                                height: "30px",
                                margin: "10px"
                            }}>
                            <ToggleButton value={false} aria-label="left aligned"
                                          disabled={!isSignUp}
                                          sx={{
                                              bgcolor: "primary.main",
                                              borderRadius: "12px",
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center"
                                          }}>
                                <Typography
                                    color="white"
                                    fontWeight="bold"
                                    sx={{textAlign: "center"}}
                                >
                                    Войти
                                </Typography>
                            </ToggleButton>
                            <ToggleButton value={true} aria-label="right aligned"
                                          disabled={isSignUp}
                                          sx={{
                                              bgcolor: "primary.main",
                                              borderRadius: "12px",
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center"
                                          }}>
                                <Typography
                                    color="white"
                                    fontWeight="bold"
                                    sx={{textAlign: "center"}}
                                >
                                    Регистрация
                                </Typography>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    {isSignUp ? <CustomInput
                        label="Имя"
                        placeholder="Введите ваш логин..."
                        isIconActive={false}
                        value={login}
                        onChange={handleLoginChange}
                    /> : ""}
                    <CustomInput
                        label="Почта"
                        placeholder="Введите вашу почту..."
                        isIconActive={false}
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <CustomInput
                        label="Пароль"
                        placeholder="Введите ваш пароль..."
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
                        {isSignUp ? <Button
                                onClick={signup}
                                variant="contained"
                                fullWidth
                                sx={{mt: 4, boxShadow: `0 0 20px ${colors.green[500]}`}}
                            >
                                Зарегистрироваться
                            </Button> :
                            <Button
                                onClick={signin}
                                variant="contained"
                                fullWidth
                                sx={{mt: 4, boxShadow: `0 0 20px ${colors.green[500]}`}}
                            >
                                Войти
                            </Button>}
                    </Box>
                    {!isSignUp ?
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                            mt={2}
                            width="100%"
                            color="white"
                        >
                            <a
                                href="http://localhost:3000/forgot_password"
                                style={{
                                    color: colors.green[500],
                                    textDecoration: "none",
                                }}
                            >
                                Забыли пароль?
                            </a>
                        </Box> : ""}
                    {error && (
                        <Typography variant="caption" color="error">
                            {error}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Grid>
    );
};

export default SignUpInPage;
