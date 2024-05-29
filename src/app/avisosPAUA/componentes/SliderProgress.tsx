import { CircularProgress, Dialog, Grid, Typography } from "@mui/material";
import React from "react";

const SliderProgress = ({ open, texto }: { open: boolean; texto: string }) => {
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
        <Grid item>
          <CircularProgress
            size={200}
            sx={{
              color: "#AF8C55",
            }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h4" className="Cargando">
            {texto ? texto : "Cargando .."}
          </Typography>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default SliderProgress;
