import {
    Box,
    Button,
    colors,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, {useEffect, useState} from "react";
import CustomInput from "../auth/CustomInput";
import AuthService from "../../services/AuthService";

const EmailEnterPage = () => {

    useEffect(() => {
        document.title = 'Сброс пароля'; // Установите новый заголовок
    }, []);

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (value.trim() === '') {
            setError('Поле не может быть пустым');
        } else if (!value.includes("@")&&!value.includes(".")) {
            setError("Неверная почта")
        } else {
            setError('');
        }
    };

    const recoveryPassword = async () => {
        await AuthService.passwordReset({email});
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
                <Typography
                    color="white"
                    fontWeight="bold"
                    sx={{textAlign: "center", marginTop: 20, marginBottom: 5}}
                >
                    Введите почту своего аккаунта
                </Typography>
                <Box width="50%">
                    <CustomInput
                        label="Почта"
                        placeholder="Введите вашу почту..."
                        isIconActive={false}
                        value={email}
                        onChange={handleEmailChange}
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
                            onClick={recoveryPassword}
                            variant="contained"
                            fullWidth
                            sx={{mt: 4, boxShadow: `0 0 20px ${colors.green[500]}`}}
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
            </Box>
        </Grid>
    );
};

export default EmailEnterPage;
