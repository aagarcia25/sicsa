import AddIcon from "@mui/icons-material/Add";
import { Tooltip, ToggleButton, IconButton } from "@mui/material";
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
          <ToggleButton value="check">
            <IconButton
              color="secondary"
              aria-label="upload documento"
              component="label"
              size="large"
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
