import { IconButton, Tooltip } from "@mui/material";
import { ReactNode } from "react";

export const ButtonsDetail = ({
  title,
  handleFunction,
  show,
  icon,
  row
}: {
  title:string
  handleFunction: Function;
  show: boolean;
  icon: ReactNode;
  row:any;
}) => {
  return (
    <>
      {show ? (
             <Tooltip title={title}>
             <IconButton  color="inherit" onClick={() => handleFunction(row)}>
              {icon}
             </IconButton>
            </Tooltip>
      ) : (
        ""
      )}
    </>
  );
};