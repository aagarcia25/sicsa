import { Box, Grid, Hidden, } from "@mui/material";
import { Carousel } from 'antd';
import React from "react";
import { Blanco } from "../styles/imagen";

export default function Bienvenido({ user }: { user: any }) {


  const CarouselAp: React.FC = () => (

    <Carousel autoplay >
      {
       
          <Box key={Math.random()} display="flex" justifyContent="center"
            sx={{ height: "85vh", width: "100%" }}>
            <div className='containerCarrucelBienvenido' >
              <img className="imgrCarrucelBienvenido" style={{ objectFit: "scale-down", width: "100%", height: "100%", }}
                src={"data:" +  Blanco.Tipo + ";base64," + Blanco.Data} />
            </div>
          </Box>

      }
    </Carousel >
  );

  // useEffect(() => {
 
  // }, []);

  return (
    <Hidden smDown>
      <Grid height="85%" width="100%" >

        <Grid item alignContent="center">
          <CarouselAp />
        </Grid>
      </Grid>
    </Hidden>
  );
}

