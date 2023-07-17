import { Grid, Typography } from '@mui/material';
import Progress from '../Progress';

const TitleComponent = ({
    title,
    show,
  }: {
    title: string;
    show: boolean;
  }) => {
  return (
      <Grid container justifyContent="space-between">
      <Progress open={show}></Progress>
        <Grid item md={12} textAlign="center" >
          <Typography variant="h3" >
            {title}
          </Typography>
        </Grid>
      </Grid>
  )
}

export default TitleComponent
