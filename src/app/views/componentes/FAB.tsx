import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { Fab, Tooltip, useTheme } from "@mui/material";
const FAB = () => {
  const theme = useTheme(); // Puedes usar el tema para acceder a colores y otras configuraciones de Material-UI

  const handleFabClick = () => {
    window.open(String(process.env.REACT_APP_APPLICATION_HELP), "_blank"); // Abrir una página externa en una nueva pestaña
  };

  return (
    <div>
      <Tooltip title={"Reporte de Incidencia"}>
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: "absolute",
            bottom: 16, // Distancia desde abajo
            right: 16, // Distancia desde la izquierda
            transition: "background-color 0.3s", // Transición suave para el cambio de color
            "&:hover": {
              backgroundColor: "black", // Color de fondo durante el hover
              color: theme.palette.primary.main, // Cambia el color del icono para que sea visible sobre fondo blanco
            },
          }}
          onClick={handleFabClick}
        >
          <LiveHelpIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default FAB;
