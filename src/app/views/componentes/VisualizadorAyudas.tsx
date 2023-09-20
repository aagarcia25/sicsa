import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "../../services/localStorage";
import { ValidaSesion } from "../../services/UserServices";
import { base64ToArrayBuffer } from "../../helpers/Files";
import Progress from "../Progress";

export const VisualizadorAyudas = ({
  URLVideo,
  modo,
  handleclose,
}: {
  URLVideo: string;
  modo: string;
  handleclose: Function;
}) => {
  const [archivoUrl, setArchivoUrl] = useState<string>("");
  const [modoVisualizacion, setModoVisualizacion] = useState<string>("");
  const [slideropen, setslideropen] = useState(false);

  const handleClickOpen = (URLVideo: string, modo: string) => {
    let data = {
      TOKEN: JSON.parse(String(getToken())),
      RUTA: modo == "video" ? "/VIDEOS/TUTORIALES/" : "/GUIAS/",
      NOMBRE: URLVideo,
    };

    if (URLVideo !== "") {
      ValidaSesion();
      setslideropen(true);
      setModoVisualizacion(modo);

      try {
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: process.env.REACT_APP_APPLICATION_BASE_URL + "obtenerDoc",
          headers: {
            "Content-Type": "application/json",
            responseType: "blob",
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            var bufferArray = base64ToArrayBuffer(
              response.data.RESPONSE.RESPONSE.FILE
            );
            var blobStore = new Blob([bufferArray], {
              type: response.data.RESPONSE.RESPONSE.TIPO,
            });
            var data = window.URL.createObjectURL(blobStore);
            var link = document.createElement("a");
            document.body.appendChild(link);
            link.href = data;
            setArchivoUrl(link.href);
            setslideropen(false);
          })
          .catch((error) => {
            console.log(error);
            setslideropen(false);
          });
      } catch (err: any) {
        setslideropen(false);
        console.log(err);
      }
    }
  };

  useEffect(() => {
    handleClickOpen(URLVideo, modo);
  }, []);

  return (
    <Dialog
      className="containerVizualizar"
      fullScreen
      sx={{ zIndex: 2000 }}
      open={true}
    >
      <div>
        <Progress open={slideropen} />
        <Grid
          container
          className="HeaderModal"
          justifyContent="flex-end"
          alignItems="center"
          paddingTop={1}
          paddingBottom={0.5}
        >
          <Grid item xs={10} sm={10} md={10} lg={10}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h4">Visualizar</Typography>
            </Box>
          </Grid>
          <Grid item xs={1.5} paddingBottom={0}>
            <Grid
              container
              alignItems="flex-end"
              direction="row"
              justifyContent="flex-end"
              paddingRight={1}
            >
              <Tooltip title="Salir">
                <IconButton
                  size="large"
                  className="cerrar"
                  aria-label="close"
                  onClick={() => handleclose()}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>

        <div className="containerCenterVizualizar">
          {modoVisualizacion == "video" ? (
            <Grid item className="contenedorDeReproductorVideo">
              <video
                autoFocus
                loop
                autoPlay
                width={"100%"}
                height={"100%"}
                src={archivoUrl}
                id="video_player"
                controls
              />
            </Grid>
          ) : (
            <object
              className="responsive-iframe"
              data={archivoUrl}
              type="text/html"
            ></object>
          )}
        </div>
      </div>
    </Dialog>
  );
};
