import { Grid, Typography } from "@mui/material";
import TitleComponent from "./componentes/TitleComponent";

export default function Bienvenido({ user }: { user: any }) {
  return (
    <Grid height="85%" width="100%" sx={{ padding: "16px" }}>
      <TitleComponent
        title={"Sistema de Control y Seguimiento de Auditoía (SICSA)"}
        show={false}
      />
      <Typography
        variant="h5"
        sx={{
          fontFamily: "sans-serif",
          textAlign: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        Auditorías de la Secretaría de Finanzas y Tesorería General del Estado
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
        sx={{ padding: "16px" }}
      >
        <Grid item xs={12} sm={7} md={7} lg={7}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "sans-serif",
              textAlign: "justify",
              justifyContent: "justify",
            }}
          >
            La Secretaría de Finanzas y Tesorería General del Estado a través de
            la Dirección de Atención y Seguimiento a Auditorías, ha puesto a
            disposición el Sistema de Control y Seguimiento de Auditoría (SICSA)
            con el objetivo de proporcionar un conocimiento público útil
            enfocado en las necesidades. El SICSA tiene como objetivo permitir a
            la consulta, utilización, reproducción y almacenamiento de datos
            correspondientes a todas las auditorías practicadas desde el año de
            su implementación (2022).
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
        sx={{ padding: "16px" }}
      >
        <Grid item xs={12} sm={7} md={7} lg={7}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "sans-serif",
              textAlign: "justify",
              justifyContent: "justify",
            }}
          >
            Con la implementación del SICSA, la Secretaría de Finanzas y
            Tesorería General del Estado espera contribuir a generar análisis y
            diagnósticos por parte de los interesados ​​en el tema de la
            fiscalización superior y, sobre todo, a la formulación de
            iniciativas y propuestas ciudadanas para la mejora de las políticas
            públicas.
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
        sx={{ padding: "16px" }}
      >
        <Grid item xs={12} sm={7} md={7} lg={7}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "sans-serif",
              textAlign: "justify",
              justifyContent: "justify",
            }}
          >
            La responsabilidad de los análisis y conclusiones que se realicen
            con la información Sistema de Control y Seguimiento de Auditoría
            (SICSA) recae en los usuarios/as, ya que ellos son los encargados de
            interpretar y utilizar la información proporcionada por el sistema.
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "16px" }}
        spacing={0.5}
      >
        <Grid item xs={12} sm={12} md={4} lg={1}></Grid>
        <Grid item xs={12} sm={12} md={4} lg={2}>
          <iframe
            width="300"
            height="250"
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3595.725675170027!2d-100.31389362460231!3d25.680386877403066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sEdificio%20V%C3%ADctor%20G%C3%B3mez%20Garza%20Gral.%20Mariano%20Escobedo%20333%20Zona%20Centro%20Monterrey%2C%20Nuevo%20Le%C3%B3n%20CP%2064000!5e0!3m2!1ses-419!2smx!4v1697666927641!5m2!1ses-419!2smx"
          ></iframe>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={2} sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "sans-serif",
            }}
          >
            Edificio Víctor Gómez Garza
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "sans-serif",
            }}
          >
            Gral. Mariano Escobedo 333
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "sans-serif",
            }}
          >
            Zona Centro
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "sans-serif",
            }}
          >
            Monterrey, Nuevo León CP 64000
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={2} sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "sans-serif",
            }}
          >
            Llamanos
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "sans-serif",
            }}
          >
            Tel.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "sans-serif",
            }}
          >
            81 2020 1301
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "sans-serif",
            }}
          >
            81 2020 1479
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={2} sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "sans-serif",
            }}
          >
            Visitanos
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "sans-serif",
            }}
          >
            Lunes a Viernes
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "sans-serif",
            }}
          >
            8:00 a.m. - 5:00 p.m.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
