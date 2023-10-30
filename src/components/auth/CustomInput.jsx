import {Visibility, VisibilityOff} from "@mui/icons-material";
import {
    Box,
    IconButton,
    InputAdornment,
    InputBase,
    Paper,
    Typography,
} from "@mui/material";
import {colors} from "../../themes/Theme";
import React, {useState} from "react";

const CustomInput = ({
                         isIconActive,
                         label,
                         placeholder,
                         value,
                         onChange
                     }) => {

    const initialHidePassword = isIconActive ? 'password' : 'text';

    const [hidePassword, setHide] = useState(initialHidePassword);

    const hidePasswordHandler = () => {
        if(hidePassword === "password"){
            setHide("");
        }
        else{
            setHide("password");
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignContent="center"
            justifyContent="flex-start"
            mb={2}
        >
            <Box display="flex" flexDirection="column" justifyContent="flex-start">
                <Typography color="white" pb={1}>
                    {label}
                </Typography>
                <Paper
                    sx={{
                        background: colors.input[500],
                        width: "100%",
                    }}
                >
                    <InputBase
                        placeholder={placeholder}
                        fullWidth
                        type={hidePassword}
                        sx={{
                            bgcolor: colors.input[500],
                            p: 1,
                            borderRadius: "5px",
                        }}
                        endAdornment={
                            isIconActive && (
                                <InputAdornment position="end" sx={{pr: 1}}>
                                    <IconButton edge="end" onClick={hidePasswordHandler}>
                                        {hidePassword==="password"?<VisibilityOff/>:<Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                        value={value}
                        onChange={onChange}
                    />
                </Paper>
            </Box>
        </Box>
    );
};

export default CustomInput;
