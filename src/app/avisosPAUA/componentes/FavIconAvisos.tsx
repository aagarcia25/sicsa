import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { Fab } from "@mui/material";
import { useEffect, useState } from "react";
import { DialogAvisos } from "./DialogAvisos";

export const FavIconAvisos = () => {
  const [open, setOpen] = useState(true);

  const handleChange = () => {
    setOpen(!open);
  };
  useEffect(()=>{
console.log('open',open);

  },[open])

  return (
    <>
      <Fab
      className=""
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: "#15212f",
          color: "#fff",
          textTransform: "none",
          fontSize: 14,
          fontFamily: "'Montserrat', sans-serif",
          "&:hover": {
            backgroundColor: "rgba(47, 47, 47, 0.2)",
            color: "#000",
          },
          // Ajustar tamaño de fuente responsivamente
          "@media (min-width: 480px)": {
            fontSize: 16, // ajusta según tus necesidades
          },
          "@media (min-width: 768px)": {
            fontSize: 18, // ajusta según tus necesidades
          },
        }}
        variant="extended"
        onClick={handleChange}
      >
        <NotificationImportantIcon sx={{ mr: 1 }} />
        Avisos de plataforma
      </Fab>

      {open && <DialogAvisos open={open} handleClose={handleChange} />}
    </>
  );
};
