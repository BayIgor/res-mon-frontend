import {
    Box,
    Button,
    colors,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import CustomInput from "../auth/CustomInput";
import AuthService from "../../services/AuthService";

const PasswordRecoveryPage = () => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignUp, setSignUp] = useState(false);
    const navigate = useNavigate();


    const handleLoginChange = (e) => {
        const value = e.target.value;
        setLogin(value);

        if (value.trim() === '') {
            setError('Field cannot be empty');
        } else {
            setError('');
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (value.trim() === '') {
            setError('Field cannot be empty');
        } else if (!value.includes("@")) {
            setError("Wrong email")
        } else {
            setError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (value.trim() === '') {
            setError('Field cannot be empty');
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
            console.log(email, password)
            const response = await AuthService.login({email, password});

            if (response.data.jwt) {
                localStorage.setItem('jwt', response.data.jwt);
                navigate('/dashboard');
            }
        } catch (error) {
            setError('Invalid email or password');
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
                    {isSignUp ? <CustomInput
                        label="Name"
                        placeholder="Enter your login..."
                        isIconActive={false}
                        value={login}
                        onChange={handleLoginChange}
                    /> : ""}
                    <CustomInput
                        label="Email"
                        placeholder="Enter your email..."
                        isIconActive={false}
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <CustomInput
                        label="Password"
                        placeholder="Enter your password..."
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
                    </Box>
                    {isSignUp ?<Button
                            onClick={signup}
                            variant="contained"
                            fullWidth
                            sx={{mt: 4, boxShadow: `0 0 20px ${colors.green[500]}`}}
                        >
                            Register
                        </Button>:
                        <Button
                            onClick={signin}
                            variant="contained"
                            fullWidth
                            sx={{mt: 4, boxShadow: `0 0 20px ${colors.green[500]}`}}
                        >
                            Login
                        </Button>}
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
                                href="#yoyo"
                                style={{
                                    color: colors.green[500],
                                    textDecoration: "none",
                                }}
                            >
                                Forgot password?
                            </a>
                        </Box>:""}
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

export default PasswordRecoveryPage;
