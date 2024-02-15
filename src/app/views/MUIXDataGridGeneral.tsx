import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";
import {
  DataGrid,
  GridColumnVisibilityModel,
  GridToolbar,
  esES as gridEsES,
} from "@mui/x-data-grid";

const theme = createTheme(coreEsES, gridEsES);

export default function MUIXDataGridGeneral(props: any) {
  const [pageSize, setPageSize] = useState(10);
  const [selectionModel, setSelectionModel] = useState<any[]>([]);

  const handleSelectionModelChange = (newSelectionModel: any) => {
    setSelectionModel(newSelectionModel);
    props.setRowSelected(newSelectionModel);
    console.log("Filas seleccionadas:", newSelectionModel);
  };

  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      id: false,
      Route: false,
      ciid: false,
      ctaid: false,
      cefid: false,
      cgfid: false,
      csid: false,
      iduaa: false,
      idAuditoria: false,
      ctid: false,
      coaid: false,
      cuaaid: false,
      caaid: false,
      crid: false,
      idtipo: false,
      Tema: false,
      Observaciones: false,
      magneticos: false,
      FechaRecibido: false,
      FechaEntrega: false,
      FechaCreacion: false,
      UltimaActualizacion: false,
      creado: false,
      modi: false,
    });

  const hasData = props.rows.length < 8;

  const Data = props.rows.length === 0;

  return (
    <div style={{ height: "55vh", overflow: "auto" }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          {...props.rows}
          columns={props.columns}
          rows={props.rows}
          density="compact"
          autoHeight={false}
          stickyHeader
          checkboxSelection
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={handleSelectionModelChange}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
          rowsPerPageOptions={[10, 25, 50, 100]}
          disableRowSelectionOnClick
          getRowId={(row) => (row.Id ? row.Id : row.id)}
          rowHeight={255}
          pageSize={pageSize}
          getRowHeight={() => "auto"}
          sx={{
            
            fontFamily: "Poppins, sans-serif",
            fontWeight: "600",
            fontSize: "12px",
            overflow: "auto",
            "& .super-app.positive": {
              color: "#000000",
            },
            "& .MuiDataGrid-root .MuiDataGrid-columnsContainer": {
              backgroundColor: "#f8f9fa", // Color de fondo del encabezado
            },
          }}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              label: "Buscar",
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              csvOptions: {
                fileName: props.modulo,
                utf8WithBom: true,
              },
            },
          }}
          localeText={{
            columnsPanelHideAllButton: "Ocultar todo",
            columnsPanelShowAllButton: "Mostrar todo",
            columnsPanelTextFieldPlaceholder: "",
            columnsPanelTextFieldLabel: "Buscar",
            noRowsLabel: "No se ha encontrado datos.",
            noResultsOverlayLabel: "No se ha encontrado ningún resultado",
            toolbarColumns: "Columnas",
            toolbarExport: "Exportar",
            toolbarColumnsLabel: "Seleccionar columnas",
            toolbarFilters: "Filtros",
            toolbarFiltersLabel: "Ver filtros",
            toolbarFiltersTooltipHide: "Quitar filtros",
            toolbarFiltersTooltipShow: "Ver filtros",
            toolbarQuickFilterPlaceholder: "Buscar",
            toolbarExportCSV: "Descargar como CSV",
            toolbarExportPrint: "Imprimir",
            checkboxSelectionSelectRow: "Filas seleccionadas",
            checkboxSelectionSelectAllRows: "Seleccionar todas las filas",
            errorOverlayDefaultLabel: "Ha ocurrido un error.",
            footerRowSelected: (count) =>
              count > 1
                ? `${count.toLocaleString()} filas seleccionadas`
                : `${count.toLocaleString()} fila seleccionada`,
            footerTotalRows: "Filas Totales:",
            columnMenuLabel: "Menú",
            columnMenuShowColumns: "Mostrar columnas",
            //columnMenuFilter: "Filtro",
            //columnMenuHideColumn: "Ocultar",
            columnMenuUnsort: "Desordenar",
            //columnMenuSortAsc: "Ordenar ASC",
            //columnMenuSortDesc: "Ordenar DESC",
            columnHeaderFiltersTooltipActive: (count) =>
              count > 1 ? `${count} filtros activos` : `${count} filtro activo`,
            columnHeaderFiltersLabel: "Mostrar filtros",
            columnHeaderSortIconLabel: "Ordenar",
            filterPanelColumns: "Columnas",
            filterOperatorContains: "Contiene",
            filterOperatorEquals: "Igual",
            filterOperatorStartsWith: "Comienza Con",
            filterOperatorEndsWith: "Termina Con",
            filterOperatorIsEmpty: "Es Vacio",
            filterOperatorIsNotEmpty: "No Vacio",
            filterOperatorIsAnyOf: "Es Cualquiera de",
            filterPanelInputLabel: "Valor",
            filterPanelInputPlaceholder: "Valor Filtrado",
          }}
        />
      </ThemeProvider>
    </div>
  );
}
