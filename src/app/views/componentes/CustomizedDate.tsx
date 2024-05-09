import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const CustomizedDate = ({
  value,
  label,
  onchange,
  disabled,
}: {
  value: any;
  label: string;
  onchange: Function;
  disabled: boolean;
}) => {
  
  return (
    
    <div>        
      <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale="es" >
        <Typography sx={{ fontFamily: "sans-serif" }}>{label}:</Typography>

        <DatePicker
          value={value}
          format="DD/MM/YYYY"
          onChange={(v) => onchange(v)}
          disabled={disabled}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomizedDate;
