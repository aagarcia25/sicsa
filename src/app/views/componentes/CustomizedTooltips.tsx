import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';


export const TooltipPersonalizado = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip  
  
  {...props} classes={{ popper: className}}  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#ffffff',
    color:'#15212f',
    maxWidth: 1000,
    with:400,
    fontSize: theme.typography.pxToRem(15),
  },
}));

