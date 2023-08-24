import { ToggleButton, Tooltip } from "@mui/material";
import { ReactNode } from "react";

const ButtonsShare = ({
  title,
  handleFunction,
  show,
  icon,
  row,
}: {
  title: string;
  handleFunction: Function;
  show: boolean;
  icon: ReactNode;
  row: any;
}) => {
  return (
    <>
      {show ? (
        <Tooltip title={title}>
          <ToggleButton
            className="guardar"
            size="large"
            value="check"
            onClick={() => handleFunction(row)}
          >
            {icon}
          </ToggleButton>
        </Tooltip>
      ) : (
        ""
      )}
    </>
  );
};

export default ButtonsShare;
