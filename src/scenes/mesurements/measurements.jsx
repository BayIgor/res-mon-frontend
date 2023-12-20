import {Box} from "@mui/material";
import {
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes, GridToolbarColumnsButton,
    GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton,
    ruRU
} from "@mui/x-data-grid";
import {tokens} from "../../themes/mainTheme";
import Header from "../../components/Header";
import {useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import * as React from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ArchiveIcon from '@mui/icons-material/Archive';
import SummarizeIcon from '@mui/icons-material/Summarize';
import {randomId} from "@mui/x-data-grid-generator";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MeasurementsService from "../../services/measurementsService";
import {useNavigate} from "react-router-dom";
import ArchiveService from "../../services/archiveService";
import {toastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function EditToolbar(props) {
    const {setRows, setRowModesModel} = props.someProps;
    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, {
            id,
            meterId: '',
            measDateTime: '',
            hour: '',
            heatConsumptionQ1: '',
            heatConsumptionQ2: '',
            coolantFlowV1: '',
            coolantFlowV2: '',
            instantConsumptionG1: '',
            instantConsumptionG2: '',
            coolantTemperatureT1: '',
            coolantTemperatureT2: '',
            timerWorkHour: '',
            consumption: ''
        }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: {mode: GridRowModes.Edit, fieldToFocus: 'meterId'},
        }));
    };

    return (
        <GridToolbarContainer>
            <Button className="customButtonStyles" color="primary" startIcon={<AddIcon/>} onClick={handleClick}>
                Добавить запись
            </Button>
        </GridToolbarContainer>
    );
}

const Measurements = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [selectedRows, setSelectedRows] = useState([]);
    const navigate = useNavigate();

    function CreateReport(){
        const handleClick = async () => {
            const reportName = prompt('Введите название отчёта:', ''); // Отображение всплывающего окна с полем ввода

            if (reportName !== null) { // Если пользователь ввел название архива и нажал "ОК"
                if(selectedRows.length===0){
                    alert("Выберите данные для отчёта")
                }
                else{
                    await MeasurementsService.createReport(selectedRows, navigate, reportName);
                }
            }
        };

        return (
            <GridToolbarContainer>
                <Button className="customButtonStyles" color="primary" startIcon={<SummarizeIcon/>} onClick={handleClick}>
                    Создать отчёт
                </Button>
            </GridToolbarContainer>
        );
    }

    const handleImportClick = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        MeasurementsService.sendFile(formData, navigate)
    };

    function CustomToolbar(props) {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton style={{color: '#3f51b5'}}/>
                <GridToolbarFilterButton style={{color: '#3f51b5'}}/>
                <GridToolbarDensitySelector style={{color: '#3f51b5'}}/>
                <GridToolbarExport style={{color: '#3f51b5'}}
                                   printOptions={{
                                       hideFooter: true,
                                       hideToolbar: true,
                                   }}
                />
                <EditToolbar someProps={props}/>
                <CreateArchive/>
                <CreateReport/>
                <div>
                    <input
                        accept=".xlsx"
                        id="contained-button-file"
                        type="file"
                        onChange={handleImportClick}
                        style={{display: 'none'}}
                    />
                    <label htmlFor="contained-button-file">
                        <Button
                            className="customButtonStyles"
                            style={{background: 'green'}}
                            variant="contained"
                            component="span"
                        >
                            Импортировать Excel
                        </Button>
                    </label>
                </div>
            </GridToolbarContainer>
        )
    }

    function CreateArchive(){
        const handleClick = async () => {
            const archiveName = prompt('Введите название архива:', ''); // Отображение всплывающего окна с полем ввода

            if (archiveName !== null) { // Если пользователь ввел название архива и нажал "ОК"
                if(selectedRows.length===0){
                    alert("Выберите данные для отчёта")
                }
                else {
                    await ArchiveService.createArchive(selectedRows, navigate, archiveName);
                }
            }
        };

        return (
            <GridToolbarContainer>
                <Button className="customButtonStyles" color="primary" startIcon={<ArchiveIcon/>} onClick={handleClick}>
                    Создать архив
                </Button>
            </GridToolbarContainer>
        );
    }
    const getMeasurements = async () => {
        try {
            const response = await MeasurementsService.getAll(navigate);
            if (response.data) {
                const rows = response.data.body.map((row) => {
                    return {
                        ...row,
                        measDateTime: new Date(row.measDateTime),
                    };
                });
                setRows(rows)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
    };

    const handleSaveClick = (id) => async () => {
        await setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
    };

    const handleDeleteClick = (id) => () => {
        MeasurementsService.deleteById(id, navigate)
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow) => {
        let isNew;
        if (newRow.id.length === 36) {
            isNew = true
        } else {
            isNew = false
        }
        const meterData = await MeasurementsService.saveMeasurement(newRow, isNew, navigate)
        const updatedRow = {...newRow, isNew: false};
        if (isNew) {
            updatedRow.id = meterData.data.id
        }
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    useEffect(() => {
        getMeasurements();
    }, []);

    const columns = [
        {
            field: "meterId",
            headerName: "ИН Счётчика",
            align: "left",
            flex: 0.1,
            editable: true
        },
        {
            field: "measDateTime",
            headerName: "Дата измерения",
            type: 'date',
            align: "left",
            flex: 0.3,
            editable: true
        },
        {
            field: "hour",
            headerName: "Час",
            align: "left",
            flex: 0.1,
            editable: true
        },
        {
            field: "heatConsumptionQ1",
            headerName: "Q1",
            align: "left",
            flex: 0.1,
            editable: true
        },
        {
            field: "heatConsumptionQ2",
            headerName: "Q2",
            align: "left",
            flex: 0.1,
            editable: true
        },
        {
            field: "coolantFlowV1",
            headerName: "V1",
            align: "left",
            flex: 0.1,
            editable: true
        },
        {
            field: "coolantFlowV2",
            headerName: "V2",
            align: "left",
            flex: 0.1,
            editable: true
        },
        {
            field: "instantConsumptionG1",
            headerName: "G1",
            align: "left",
            flex: 0.1,
            editable: true
        },
        {
            field: "instantConsumptionG2",
            headerName: "G2",
            align: "left",
            flex: 0.1,
            editable: true
        },
        {
            field: "coolantTemperatureT1",
            headerName: "T1",
            align: "left",
            flex: 0.1,
            editable: true
        },
        {
            field: "coolantTemperatureT2",
            headerName: "T2",
            align: "left",
            flex: 0.1,
            editable: true
        },
        {
            field: "timerWorkHour",
            headerName: "Таймер работа, час",
            align: "left",
            flex: 0.3,
            editable: true
        },
        {
            field: "consumption",
            headerName: "Потребление",
            align: "left",
            flex: 0.2,
            editable: true
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Действия',
            width: 100,
            cellClassName: 'actions',
            getActions: ({id}) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon/>}
                            label="Save"
                            color="inherit"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon/>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
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
                title="Измерения"
                subtitle="Таблица показаний счётчиков"
            />
            <Box
                m="40px 0 0 0"
                height="70vh"
                width='160vh'
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
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{
                        toolbar: CustomToolbar
                    }}
                    slotProps={{
                        toolbar: {setRows, setRowModesModel}
                    }}
                    autoPageSize{...rows}
                    checkboxSelection
                    onRowSelectionModelChange={(newSelection) => {
                        const selectedData = newSelection.map((selectedId) =>
                            rows.find((row) => row.id === selectedId)
                        );
                        setSelectedRows(selectedData);
                    }}
                />
            </Box>
        </Box>
    );
};

export default Measurements;
