import { ThemeProvider, createTheme } from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";
import {
  DataGrid,
  GridColumnVisibilityModel,
  GridToolbar,
  esES as gridEsES,
} from "@mui/x-data-grid";
import React from "react";

const theme = createTheme(coreEsES, gridEsES);

export default function MUIXDataGrid(props: any) {
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
    });

  return (
    <div style={{ height: 600, width: "100%" }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          {...props.rows}
          columns={props.columns}
          rows={props.rows}
          density="compact"
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
          rowsPerPageOptions={[10, 25, 50, 100]}
          disableSelectionOnClick
          // disableColumnFilter
          // disableColumnSelector
          disableDensitySelector
          getRowId={(row) => (row.Id ? row.Id : row.id)}
          rowHeight={255}
          getRowHeight={() => "auto"}
          sx={{
            fontFamily: "Poppins,sans-serif",
            fontWeight: "600",
            fontSize: "12px",
            // '& .super-app-theme--cell': {
            //   backgroundColor: 'rgba(224, 183, 60, 0.55)',
            //   color: '#1a3e72',
            // },
            // '& .super-app.negative': {
            //   color: "rgb(84, 3, 3)",
            //   backgroundColor: "rgb(196, 40, 40, 0.384)",

            // },
            "& .super-app.positive": {
              color: "#000000",
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
            columnMenuFilter: "Filtro",
            columnMenuHideColumn: "Ocultar",
            columnMenuUnsort: "Desordenar",
            columnMenuSortAsc: "Ordenar ASC",
            columnMenuSortDesc: "Ordenar DESC",
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
