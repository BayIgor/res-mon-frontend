import {Box, Button, IconButton, Typography, useTheme} from "@mui/material";
import {tokens} from "../../themes/mainTheme";
import TableViewIcon from '@mui/icons-material/TableView';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Header from "../../components/Header";
import StatBox from "../../components/dashboard/StatBox";
import axios from "../../services/axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [measCount, setMeasCount] = useState('');
    const [metersCount, setMetersCount] = useState('');

    const getStatistic = async () => {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            const headers = {
                Authorization: `Bearer ${jwtToken}`,
            };
            const response = await axios.get("/statistics", {headers})
            console.log(response.data)
            setMeasCount(response.data.measCount)
            setMetersCount(response.data.metersCount)
        } else {
            navigate('/account')
        }
    }

    useEffect(() => {
        getStatistic();
    }, []);

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Монитор ресурсов" subtitle="Добро пожаловать в ваш монитор ресурсов"/>
            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={metersCount}
                        subtitle="Счётчиков установлено"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <ElectricMeterIcon
                                sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 4"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="12h45min"
                        subtitle="Времени сэкономленно"
                        progress="0.4"
                        increase="Времени +41%"
                        icon={
                            <AccessTimeIcon
                                sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow='2 / span 2'
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={measCount}
                        subtitle="Измерений произведено"
                        progress="0.80"
                        increase="+43%"
                        icon={
                            <TableViewIcon
                                sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                            />
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;