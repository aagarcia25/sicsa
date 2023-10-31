import { CircularProgress, Dialog, Grid, Typography } from "@mui/material";
import * as React from "react";

const Progress = ({ open, mensaje }: { open: boolean; mensaje?: string }) => {
  const timer = React.useRef<number>();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <Dialog
      fullScreen
      className="ContainerSliderProgress"
      sx={{ zIndex: 2000 }}
      open={open}
    >
      <Grid
        className="containerCenter"
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          container
          justifyContent="center"
          direction="column"
          alignItems="center"
        >
          <CircularProgress
            size={200}
            sx={{
              color: "#15212f",
            }}
          />
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          direction="column"
          alignItems="center"
          paddingTop={2}
        >
          <Typography variant="h4" className="Cargando">
            {mensaje ? mensaje : "Cargando .."}
          </Typography>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default Progress;
