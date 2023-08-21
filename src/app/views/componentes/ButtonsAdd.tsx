import AddIcon from "@mui/icons-material/Add";
import { Tooltip, ToggleButton } from "@mui/material";

const ButtonsAdd = (
  {
  handleOpen,
  agregar,
}: {
  handleOpen: Function;
  agregar: boolean;
}
) => {
  return (
    <>
      {agregar ? (
          <Tooltip
            title={"Agregar"}>
            <ToggleButton  className="guardar" size="large" value="check" onClick={() => handleOpen(1)}>
              <AddIcon />
            </ToggleButton>
          </Tooltip>

      ) : (
        ""
      )}
    </>
  );
};

export default ButtonsAdd;
