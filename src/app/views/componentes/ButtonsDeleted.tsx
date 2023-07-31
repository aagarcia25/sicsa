import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { IconButton, Tooltip } from '@mui/material';


const ButtonsDeleted = ({
    handleAccion,
    row,
    show,
  }: {
    handleAccion: Function;
    row:any;
    show:boolean;
   
  }) => {
  return (
    <div>
         
          
            {/* ELIMINAR */}
            {show ?
              <Tooltip title={"Eliminar Registro"}>
            <IconButton  color="inherit" onClick={() => handleAccion({data:row,tipo:2})}>
              <DeleteForeverIcon />
            </IconButton>
            </Tooltip>
            :""
            
            }
                     
    </div>
  )
}

export default ButtonsDeleted
