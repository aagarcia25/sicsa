import React from 'react';
import { Typography } from '@mui/material';

const RenderHTML = ({html}:{html:string}) => (
  <Typography
    variant="body1"
    component="div"
    sx={{ '& p': { margin: 0 } }} // Elimina los márgenes por defecto de los párrafos
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

export default RenderHTML;