import {Box} from "@mui/material";
import {
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes,
    GridToolbarColumnsButton,
    GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton,
    ruRU
} from "@mui/x-data-grid";
import {tokens} from "../../themes/mainTheme";
import Header from "../../components/Header";
import {useTheme} from "@mui/material";
import MeterDataService from "../../services/meterDataService";
import {useEffect, useState} from "react";
import * as React from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import ArchiveService from "../../services/archiveService";

const Archive = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [selectedRow, setSelectedRow] = useState([]);
    const navigate = useNavigate();

    function CustomToolbar(props) {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton style={{color: '#3f51b5'}}/>
                <GridToolbarFilterButton style={{color: '#3f51b5'}}/>
                <GridToolbarDensitySelector style={{color: '#3f51b5'}}/>
            </GridToolbarContainer>
        )
    }

    const handleDownloadClick = (id) => () => {
        ArchiveService.downloadArchive(rows.find((row) => row.id === id), navigate)
    };

    const getArchive = async () => {
        try {
            const response = await ArchiveService.getAll(navigate);
            console.log(response)
            if (response.data) {
                const rows = response.data.map((row) => {
                    return {
                        ...row,
                        createdAt: new Date(row.createdAt),
                    };
                });
                setRows(rows)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteClick = (id) => () => {
        ArchiveService.deleteById(id, navigate)
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleRowSelection = (selectionModel) => {
        if (selectionModel.length > 0) {
            const selectedRowIndex = selectionModel[0]; // Берем только первую выбранную строку
            const selectedRow = rows[selectedRowIndex]; // rows - массив данных для DataGrid
            setSelectedRow(selectedRow);
        } else {
            setSelectedRow(null); // Если ничего не выбрано
        }
    };

    useEffect(() => {
        getArchive();
    }, []);

    const columns = [
        {field: "archiveName", headerName: "Название архива", flex: 0.3, align: "left", editable: false},
        {
            field: "createdAt",
            headerName: "Дата создания",
            type: 'date',
            flex: 0.7,
            align: "left",
            editable: false
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Действия',
            width: 100,
            cellClassName: 'actions',
            getActions: ({id}) => {
                return [
                    <GridActionsCellItem
                        icon={<FileDownloadIcon/>}
                        label="Download"
                        color="inherit"
                        onClick={handleDownloadClick(id)}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box m="0px 20px 0px 20px">
            <Header
                title="Архивы"
                subtitle="Список всех архивов"
            />
            <Box
                m="40px 0 0 0"
                height="70vh"
                width="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    slots={{
                        toolbar: CustomToolbar
                    }}
                    slotProps={{
                        toolbar: {setRows, setRowModesModel}
                    }}
                    autoPageSize{...rows}
                    onSelectionModelChange={handleRowSelection}
                />
            </Box>
        </Box>
    );
};

export default Archive;
