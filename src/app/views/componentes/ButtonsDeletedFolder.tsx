import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton, Tooltip } from "@mui/material";

const ButtonsDeletedFolder = ({
  handleAccion,
  row,
  show,
}: {
  handleAccion: Function;
  row: any;
  show: boolean;
}) => {
  return (
    <div>
      {/* ELIMINAR */}
      {show ? (
        <Tooltip title={"Eliminar Folder"}>
          <IconButton
            color="inherit"
            onClick={() => handleAccion({ data: row, tipo: 3 })}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
    </div>
  );
};

export default ButtonsDeletedFolder;
