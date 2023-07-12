import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  title: string;
  handleClose: Function;
}

const ModalForm = ({ children, title, handleClose }: Props) => {
  return (
    <div>
      <Dialog    
       open={true} fullScreen >
        <Grid container className="HeaderModal" justifyContent="flex-end" alignItems="center" paddingTop={.5} paddingBottom={.5} >
          <Grid item xs={10} sm={10} md={10} lg={10} >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h4" >
                {title}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1.5} paddingBottom={0} >
            <Grid container alignItems="flex-end" direction="row" justifyContent="flex-end" paddingRight={1} >
              <Tooltip title="Salir">
                <IconButton size="large" className="cerrar" aria-label="close" onClick={() => handleClose()}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <DialogContent>
          <Box>{children}</Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalForm;
