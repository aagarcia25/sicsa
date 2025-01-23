import { Box, Grid, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import React from "react";
import Carouse from "./componentes/Carouse";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import MapIcon from "@mui/icons-material/Map";
import TimerIcon from "@mui/icons-material/Timer";
import { FavIconAvisos } from "../avisosPAUA/componentes/FavIconAvisos";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Bienvenido({ user }: { user: any }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        display="flex"
        justifyContent="center"
        alignItems={"center"}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            icon={<HomeIcon />}
            iconPosition="start"
            sx={{
              fontSize: "xx-large",
              display: "flex",
              alignItems: "center",
              width: "120px",
            }}
            label={"Inicio"}
            {...a11yProps(0)}
          />
          <Tab
            icon={<StarIcon />}
            iconPosition="start"
            sx={{ fontSize: "xx-large" }}
            label="Objetivo"
            {...a11yProps(1)}
          />
          <Tab
            icon={<ContactPhoneIcon />}
            iconPosition="start"
            sx={{ fontSize: "xx-large" }}
            label="Contacto"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Carouse />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Grid height="85%" width="100%" sx={{ padding: "16px" }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "sans-serif",
              textAlign: "center",
              justifyContent: "center",
              padding: "10px",
              color: "black",
            }}
          >
            Sistema de Control y Seguimiento de Auditoría (SICSA)
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "sans-serif",
              textAlign: "center",
              justifyContent: "center",
              padding: "10px",
              color: "black",
            }}
          >
            Auditorías de la Secretaría de Finanzas y Tesorería General del
            Estado
          </Typography>

          <Grid
            container
            item
            spacing={1}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "10px" }}
          >
            <Grid item xs={12} sm={7} md={7} lg={7}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "sans-serif",
                  textAlign: "justify",
                  justifyContent: "justify",
                  color: "black",
                }}
              >
                La Secretaría de Finanzas y Tesorería General del Estado a
                través de la Dirección de Atención y Seguimiento a Auditorías,
                ha puesto a disposición el Sistema de Control y Seguimiento de
                Auditoría (SICSA) con el objetivo de proporcionar un
                conocimiento público útil enfocado en las necesidades. El SICSA
                tiene como objetivo permitir a la consulta, utilización,
                reproducción y almacenamiento de datos correspondientes a todas
                las auditorías practicadas desde el año de su implementación
                (2022).
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            item
            spacing={1}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "10px" }}
          >
            <Grid item xs={12} sm={7} md={7} lg={7}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "sans-serif",
                  textAlign: "justify",
                  justifyContent: "justify",
                  color: "black",
                }}
              >
                Con la implementación del SICSA, la Secretaría de Finanzas y
                Tesorería General del Estado espera contribuir a generar
                análisis y diagnósticos por parte de los interesados ​​en el
                tema de la fiscalización superior y, sobre todo, a la
                formulación de iniciativas y propuestas ciudadanas para la
                mejora de las políticas públicas.
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            item
            spacing={1}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "10px" }}
          >
            <Grid item xs={12} sm={7} md={7} lg={7}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "sans-serif",
                  textAlign: "justify",
                  justifyContent: "justify",
                  color: "black",
                }}
              >
                La responsabilidad de los análisis y conclusiones que se
                realicen con la información Sistema de Control y Seguimiento de
                Auditoría (SICSA) recae en los usuarios/as, ya que ellos son los
                encargados de interpretar y utilizar la información
                proporcionada por el sistema.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <div className="info-box">
                <h2>TELÉFONO</h2>
                <LocalPhoneIcon />
                <p>8120201300</p>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <div className="info-box">
                <h2>CORREO</h2>
                <EmailIcon />
                <p>sfytge.contigo@nuevoleon.gob.mx</p>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Tooltip title="Presiona para abrir la direccion en Google Maps">
                <div
                  className="info-box"
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/place/Mariano+Escobedo+333,+Centro,+64000+Monterrey,+N.L./@25.6736083,-100.3132951,17z/data=!3m1!4b1!4m6!3m5!1s0x8662be298a529e1f:0x8ffaa7c3e366ccc8!8m2!3d25.6736035!4d-100.3107202!16s%2Fg%2F11c2gj7h86?entry=ttu",
                      "_blank"
                    )
                  }
                >
                  <h2>DIRECCIÓN</h2>
                  <MapIcon />
                  <address>
                    Edificio Víctor Gómez Garza
                    <br />
                    Gral. Mariano Escobedo 333
                    <br />
                    Zona Centro
                    <br />
                    Monterrey, Nuevo León
                    <br />
                    CP 64000
                  </address>
                </div>
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <div className="info-box">
                <h2>HORARIO</h2>
                <TimerIcon />
                <p>Lunes a viernes de 8:30 a 14:30 horas.</p>
              </div>
            </Grid>
          </Grid>
        </Box>
      </CustomTabPanel>
      {/* <FavIconAvisos/> */}
    </Box>
  );
}
