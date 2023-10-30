import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const PasswordTitleBox = () => {
    return (
        <Grid xs={0} sm={0} md={6} lg={6} xl={6} minHeight={550}>
            <Box
                sx={{
                    background: 'linear-gradient(135deg, rgba(0, 255, 60, 0.3) , rgba(0, 157, 255, 0.3))',
                    padding: "20px",
                    display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'flex',
                        lg: 'flex',
                        xl: 'flex'
                    },
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    borderRadius: "0px 30px 30px 0",
                }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="flex-start"
                >
                    <Typography variant="h6" fontWeight="bold" color="whitesmoke" mb={3}>
                        Для сброса пароля <br /> введите вашу почту <br/>
                        На неё будет отправлено письмо с ссылкой для изменения пароля
                    </Typography>
                </Box>
            </Box>
        </Grid>
    );
};

export default PasswordTitleBox;
