import AddIcon from "@mui/icons-material/Add";
import { Tooltip, ToggleButton, IconButton, makeStyles } from "@mui/material";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";

export const ButtonsImport = ({
  handleOpen,
  agregar,
}: {
  handleOpen: Function;
  agregar: boolean;
}) => {

  
  
  return (
    <>
      {agregar ? (
        <Tooltip title={"Importar Plantilla"}>
          <ToggleButton value="check" className="guardar" size="small" >
            <IconButton
              style={{ color: 'white' }}
              aria-label="upload documento"
              component="label"
              
              
            
            >
              <input
                hidden
                accept=".xlsx, .XLSX, .xls, .XLS"
                type="file"
                value=""
                onChange={(v) => handleOpen(v)}
              />
              <DriveFileMoveIcon />
            </IconButton>
          </ToggleButton>
        </Tooltip>
      ) : (
        ""
      )}
    </>
  );
};
