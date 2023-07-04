import React from 'react';
import { Grid, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import BarChartExample from './FactorChart';
import AlignHorizontalLeftSharpIcon from '@mui/icons-material/AlignHorizontalLeft';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ControlledAccordions from './FactorSelector';
import DiscreteSliderMarks from './slider';
import DenseTable from './scoretable';
import SpeedIcon from '@mui/icons-material/Speed';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default function TwoColumnScreen() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container spacing={2} sx={{ maxWidth: '100vw', margin: 0, justifyContent: 'center', marginBottom: '20px', marginRight: '20px' }}>
        <Grid item xs={6}>
          <Paper sx={{ height: '100%', p: 2 }}>
            <Typography variant="h5" component="h2">
              Classification Summary
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Summary of insights from the Predictive Model
            </Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper sx={{ height: '100%',backgroundColor: '#1C1C1C',p: 2  }}>
                  <Typography variant="h6" component="h2" color="text.secondary">
                    Overall Accuracy
                  </Typography>
                  <Typography variant="h4">
                    95.7 %
                  </Typography>
                </Paper>
              </Grid>
              <br />
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <AlignHorizontalLeftSharpIcon color="action" />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" component="h2" color="text.primary">
                      Top Factors
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="subtitle1" color="text.secondary">
                  Fields ranked by the contribution to the outcome
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ height: '100%', backgroundColor: '#1C1C1C'}}>
                  <BarChartExample />
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column',}}>
            <Typography variant="h5" component="h2">
              Scoring Configuration
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Framework derived from the Predictive Model
            </Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ alignSelf: 'center' }}>
                <ControlledAccordions />
              </Grid>
              <Grid item xs={12} sx={{ alignSelf: 'center' }}>
                <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <SpeedIcon color="action" />
                </Grid>
                <Grid item>
                <Typography variant="h6" component="h2">
                  Test objects
                </Typography>
                </Grid>
                </Grid>
                <Typography variant="subtitle1" color="text.secondary">
                  Sample of your data sorted by likeliness to outcome. Drag slider to see the segments.
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ alignSelf: 'center' }}>
                <DiscreteSliderMarks />
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ height: '100%' }}>
                  <DenseTable />
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}



