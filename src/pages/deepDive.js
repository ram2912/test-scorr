import React from 'react';
import { Grid, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import BarChartExample from 'src/Components/FactorChart.js';
import AlignHorizontalLeftSharpIcon from '@mui/icons-material/AlignHorizontalLeft';
import ResponsiveAppBar from 'src/Components/appbar.js';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ControlledAccordions from '../Components/FactorSelector';
import DiscreteSliderMarks from '../Components/slider';
import DenseTable from '../Components/scoretable';
import SpeedIcon from '@mui/icons-material/Speed';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import LineChartExample from '@/Components/ScoreProgression';
import FactorDeepDive from '@/Components/FactorDeepDive';
import SliderDeepDive from '@/Components/sliderDeepDive';
import DealsDeepDive from '@/Components/dealsDeepDive';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default function DeepDive() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Grid
        container
        spacing={2}
        sx={{ maxWidth: '100vw', margin: 0, justifyContent: 'center', marginBottom: '20px', marginRight: '20px' }}
      >
        <ResponsiveAppBar />
      
      <Grid container spacing={2} sx={{ maxWidth: '100vw', margin: 0, justifyContent: 'center', marginBottom: '20px', marginRight: '20px' }}>
        <Grid item xs={6}>
          <Paper sx={{ height: '100%', p: 2 }}>
            <Typography variant="h5" component="h2">
              Project: Pipeline Management
            </Typography>
            
            <br />
            <Grid container spacing={2}>
            <Grid item xs={6}>
      <Paper sx={{ height: '100%', backgroundColor: '#1C1C1C', p: 2, display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '16px' }}>
          <Typography variant="h6" component="h2" color="text.secondary">
            Overall Accuracy
          </Typography>
          <Typography variant="h4" sx={{ marginBottom: '8px' }}>
            88.7%
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center' }}>
          <ArrowUpwardIcon sx={{ color: 'green', }} />
          <Typography variant="subtitle1"sx={{ color: 'green'}} >
            20% 
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'green'}}>
            since last week
          </Typography>
        </div>
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
                      Deal Score Progression
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="subtitle1" color="text.secondary">
                  How the average deal score has changed over time.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ height: '100%', backgroundColor: '#1C1C1C'}}>
                  <LineChartExample />
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column',}}>
            <Typography variant="h6" component="h2">
              Key insights from model
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Main reasons for deal score changes.
            </Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ alignSelf: 'center' }}>
                <FactorDeepDive />
              </Grid>
              <Grid item xs={12} sx={{ alignSelf: 'center' }}>
                <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <SpeedIcon color="action" />
                </Grid>
                <Grid item>
                <Typography variant="h6" component="h2">
                  Best and worst deals
                </Typography>
                </Grid>
                </Grid>
                <Typography variant="subtitle1" color="text.secondary">
                  Trends for the best and worst deals.
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ alignSelf: 'center' }}>
                <SliderDeepDive />
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ height: '100%' }}>
                  <DealsDeepDive/>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      </Grid>
    </ThemeProvider>
  );
}