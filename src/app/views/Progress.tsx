import * as React from "react";
import { CircularProgress, Dialog, Grid, Typography } from "@mui/material";
import { green } from "@mui/material/colors";


const Progress = ({
  open,
  mensaje,
}: {
  open: boolean;
  mensaje?: string;
}) => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

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
        <Grid item container justifyContent="center" direction="column"     alignItems="center" >
          <CircularProgress
            size={200}
            sx={{
              color: '#15212f',
            }}
          />
        </Grid>
        <Grid item container justifyContent="center" direction="column"     alignItems="center" paddingTop={2}>
          <Typography variant="h4" className="Cargando">
            {mensaje ? mensaje : "Cargando .."}
          </Typography>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default Progress;
