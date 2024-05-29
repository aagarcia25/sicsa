import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Pagination,
  Slide,
  Tooltip,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useState } from "react";
import { servicesAvisosPAUA } from "../ServicesAvisos";
import { IAviso } from "../IAvisos";
import RenderHTML from "../RenderHTML";
import SliderProgress from "./SliderProgress";
import "../Avisos.css";
import CloseIcon from "@mui/icons-material/Close";
import { alertaError, alertaInfo } from "./Alertas";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogAvisos = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [page, setPage] = useState(1);
  const [avisos, setAvisos] = useState<IAviso[]>([]);
  const [progress, setProgress] = useState(true);

  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        const { data } = await servicesAvisosPAUA.getAvisos();
        setAvisos(data);
        if(data.length==0){alertaInfo('No se encontraron Avisos')}
      } catch (error) {
        alertaError("Fallo la consulta de avisos"); 
      } finally {
        setProgress(false);
      }
    };

    fetchAvisos();
  }, []);

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  return (
    <>
      <SliderProgress open={progress} texto="" />
      {!progress && avisos.length > 0 ? (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
          maxWidth="md" // Establece el ancho máximo del Dialog
          fullWidth // Permite que el Dialog ocupe todo el ancho disponible
          sx={{
            "& .MuiDialog-container": {
              alignItems: "center",
              justifyContent: "center",
            },
            "& .MuiPaper-root": {
              width: {
                xs: "90%", // 0-600px
                sm: "90%", // 600-960px
                md: "70%", // 960-1280px
                lg: "70%", // 1280-1920px
                xl: "70%", // 1920px+
              },
              height: {
                xs: "90%", // 0-600px
                sm: "90%", // 600-960px
                md: "70%", // 960-1280px
                lg: "70%", // 1280-1920px
                xl: "70%", // 1920px+
              },
            },
          }}
        >
          <DialogTitle>
            <Grid
              container
              sx={{ width: "100%", justifyContent: "flex-end", mt: "1vh" }}
            >
              <Grid
                item
                xl={10}
                xs={10}
                lg={10}
                md={10}
                sm={10}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontFamily={"'Montserrat', sans-serif"}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textAlign: "center",
                    fontSize: [25, 25, 25, 30, 30], // Tamaños de fuente para diferentes breakpoints
                    color: "#AF8C55",
                  }}
                >
                  {avisos[page - 1]?.Titulo}
                </Typography>
              </Grid>
              <Grid
                item
                xl={1}
                xs={1}
                lg={1}
                md={1}
                sm={1}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {page === avisos.length ? (
                  <Tooltip title={"Salir"}>
                    <IconButton
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <CloseIcon
                        sx={{
                          fontSize: [20, 20, 20, 30, 30],
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                ) : null}
              </Grid>
            </Grid>
          </DialogTitle>
          <Divider />
          <DialogContent id="content" sx={{ overflow: "auto" }}>
            <RenderHTML html={avisos[page - 1]?.TextoInc} />
          </DialogContent>
          <Divider />
          <DialogActions>
            {avisos.length>1?
            <Pagination
              hidePrevButton={page === 1}
              hideNextButton={page === avisos.length}
              count={avisos.length}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  fontFamily: "'Montserrat', sans-serif !important",
                  backgroundColor: "#15212f !important",
                  color: "#fff !important",
                  textTransform: "none !important",
                  fontSize: "14px !important",
                  "&:hover": {
                    backgroundColor: "rgba(47, 47, 47, 0.2) !important",
                    color: "#000 !important",
                  },
                },
                "& .Mui-selected": {
                  backgroundColor: "rgb(175, 140, 85) !important",
                  "&:hover": {
                    backgroundColor: "rgba(175, 140, 85, 0.6) !important",
                    color: "#000 !important",
                  },
                },
              }}
            />:null}
          </DialogActions>
        </Dialog>
      ) :null};
    </>
  );
};
