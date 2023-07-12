import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import imgGobEst from "../assets/img/logo1.svg";

const Validacion = () => {

  const navigate = useNavigate();

  const onClickLogin =()=>{
    localStorage.clear();
    var ventana = window.self;
    ventana.opener = window.self;
    ventana.close();
  }


  return (
    
    <Box
      sx={{
        //Panatlla
        width: "100%",
        height: "100vh",
    // backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: "100%",
         // backgroundColor: "pink",
          display: "flex",
          flexDirection: "column",
          //Padre del contenido de cajas acomodados por column y flex
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "10%",
           // backgroundColor: "yellowgreen",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            //Titulo del error
          }}
        >
          <Typography
            sx={{
              fontSize: "3vw",
              fontWeight: "bold",
              //Texto del titulo
            }}
          >
            Error 401: Autorización Requerida
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "5%",
           // backgroundColor: "chocolate",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            //Descripción del error
          }}
        >
          <Typography
            sx={{
              fontSize: "1.6vw",
              // Texto de descripción del error
            }}
          >
            Favor de Validar sus Accesos con el Personal correspondiente
          </Typography>
        </Box>
        <Box
          sx={{
            //Espacio de la Imagen de la secretaría de gobierno "el dorado"
            width: "100%",
            height: "75%",
           // backgroundColor: "green",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              //Imagen de la secretaría de gobierno "el dorado"
              width: "100%",
              height: "100%",
             // backgroundColor: "blue",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img style={{ width: "30vw", height: "90vh" }} src={imgGobEst} />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "10%",
           // backgroundColor: "yellow",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
            //Espacio para Botón de regresar al Login
          }}
        >
          <Box sx={{
            width:"15vw",
            height:"5vh",
           // backgroundColor:"gray"
            // Alineación para el botón de salida
          }}>
            <Button
            onClick={()=>onClickLogin()}
           
              sx={
                {
                  
                  width: "100%",
                  height: "100%",
                  backgroundColor: "white",
                  borderColor: "#5048E5",
                  borderRadius: 1,
                  color: "#5048E5",
                  "&:hover": {
                    color: "#5048E5",
                 backgroundColor: "#eeebf5",
                  //Botón para regresar al Login
                }
              }}
            >
              
              Volver al inicio de sesión
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Validacion;
