import React from 'react';
import { Typography } from '@mui/material';
 
const RenderHTML = ({ html }: { html: string }) => (
<Typography
    variant="body1"
    component="div"
    sx={{
      '& p': { margin: 0 },
      '& img': {
        maxWidth: '100%',
        minWidth: '15%',
        height: 'auto',
        display: 'block',
        margin: 'auto',
      },
      '& video': {
        maxWidth: '100%',
        height: 'auto',
        display: 'block',
        margin: 'auto',
      },
      '& iframe': {
        maxWidth: '80%',
        height: 'auto',
        display: 'block',
        margin: 'auto',
        // Mantén la proporción del video
        width: '100%',
        //height: '100%',
        aspectRatio: '16/9',
      },
      // Envoltorio adicional para mantener la proporción del iframe
      '& .video-container': {
        position: 'relative',
        paddingBottom: '56.25%', // 16:9 ratio
        height: 0,
        overflow: 'hidden',
        maxWidth: '100%',
        background: '#000',
        margin: 'auto',
        '& iframe': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }
      }
    }}
    dangerouslySetInnerHTML={{ __html: html }}
  />
);
 
export default RenderHTML;