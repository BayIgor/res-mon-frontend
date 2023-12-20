import {Box} from "@mui/material";
import {
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes,
    GridToolbarColumnsButton,
    GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton,
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
import {randomId} from "@mui/x-data-grid-generator";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";

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
        </GridToolbarContainer>
    )
}

function EditToolbar(props) {
    const {setRows, setRowModesModel} = props.someProps;
    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, {id, meterId: '', installationDate: '', accuracy: true}]);
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

const Meters = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const navigate = useNavigate();

    const getMeterData = async () => {
        try {
            const response = await MeterDataService.getAll(navigate);
            if (response.data) {
                const rows = response.data.body.map((row) => {
                    return {
                        ...row,
                        installationDate: new Date(row.installationDate),
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
        MeterDataService.deleteById(id, navigate)
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
        const meterData = await MeterDataService.saveMeter(newRow, isNew, navigate)
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
        getMeterData();
    }, []);

    const columns = [
        {field: "meterId", headerName: "ИН Счётчика", flex: 0.3, align: "left", editable: true},
        {
            field: "installationDate",
            headerName: "Дата установки",
            type: 'date',
            flex: 0.7,
            align: "left",
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

    const getRowClassName = (params) => {
        if (params.row.isContentEditable) {
            return 'editing-row';
        } else {
            return params.row.accuracy ? "" : "red-row";
        }
    };

    return (
        <Box m="0px 20px 0px 20px">
            <Header
                title="Счётчики"
                subtitle="Список всех счётчиков"
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
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{
                        toolbar: CustomToolbar
                    }}
                    getRowClassName={getRowClassName}
                    slotProps={{
                        toolbar: {setRows, setRowModesModel}
                    }}
                    autoPageSize{...rows}
                />
            </Box>
        </Box>
    );
};

export default Meters;
