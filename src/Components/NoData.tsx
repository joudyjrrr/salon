import { Grid, Typography } from "@mui/material";
import NODataIMG from "../assets/noData.jpg";
import BlockIcon from '@mui/icons-material/Block';

//edited for the dark mode

function NoData() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }}>
      {/* <img src={NODataIMG} alt="NO Data Found" /> */}
      <Grid container justifyContent={'center'} alignContent={'space-around'}>

        <Grid item xs={12} container justifyContent={'center'} alignContent={'center'}>
          <BlockIcon sx={{ width: 0.3, height: 0.3 }} />
        </Grid>
        <Typography variant="h3">
          No Data
        </Typography>
      </Grid>
    </div>

  )
}

export default NoData