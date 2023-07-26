import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { IconButton, Tooltip } from '@mui/material';


const ButtonsEdit = ({
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
           {/* EDITAR */}
           {show ? 
             <Tooltip title={"Editar Registro"}>
            <IconButton color="inherit" onClick={() => handleAccion({data:row,tipo:1})}>
              <ModeEditOutlineIcon />
            </IconButton>
            </Tooltip>
            :""}
                     
    </div>
  )
}

export default ButtonsEdit
