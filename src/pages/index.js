import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from 'src/Components/appbar.js';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import TableChartIcon from '@mui/icons-material/TableChart';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Link from 'next/link';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default function Home() {
  const [environment, setEnvironment] = React.useState('development');

  const handleEnvironment = (event) => {
    setEnvironment(event.target.value);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const response = await fetch('https://testback.scorr-app.eu/protected' , {
      credentials: 'include'
    });
    

    if (response.status === 401) {
      window.location.href = '/login';
    }
    else if (response.status === 200) {
      console.log('Authorized');
    }
  };



  return (
    <ThemeProvider theme={darkTheme}>
      <Grid
        container
        spacing={2}
        sx={{ maxWidth: '100vw', margin: 0, justifyContent: 'center', marginBottom: '20px', marginRight: '20px' }}
      >
        <ResponsiveAppBar />
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={9} alignItems="center" justifyContent="center">
            <Grid item xs={12} sx={{ p: 2, borderBottom: '1px solid grey' }}>
              
                
                  <Button size="large" sx={{ marginRight: '50px', color: '#FFFFFF' }}  onClick={() => setEnvironment('development')}>
                    Development
                  </Button>
                  <Button size="large" sx={{ color: '#FFFFFF' }} onClick={() => setEnvironment('production')}>
                    Production
                  </Button>
              
            </Grid>
            {environment === 'development' && (
              <Grid item xs={12} sx={{ p: 2 }}>
                <Grid container spacing={4}>
                  <Grid item xs={4}>
                    <Button
                    
                      sx={{
                        height: '100%',
                        backgroundColor: '#1C1C1C',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        width: '100%',
                        border: '2px dashed rgba(255, 255, 255, 0.3)',
                        p: 3,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          borderColor: '#0288d1',
                        },
                      }}
                      onClick={() => {}}
                      color="inherit"
                    >
                      <Grid item>
                      

                        <AddCircleRoundedIcon fontSize="large" />
                        <Typography variant="h6" component="h2" color="inherit">
                          Create New Project
                        </Typography>
                        
                      </Grid>
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      sx={{
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.16)',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        width: '100%',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        p: 5,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        },
                      }}
                      onClick={() => {}}
                      color="inherit"
                    >
                      <Grid item>
                      <Link href="/flow">
                        <TableChartIcon fontSize="large" />
                        <Typography variant="h6" component="h2" color="inherit">
                          Sales Pipeline Management
                        </Typography>
                        </Link>
                      </Grid>
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      sx={{
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.16)',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        width: '100%',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        p: 3,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        },
                      }}
                      onClick={() => {}}
                      color="inherit"
                    >
                      <Grid item>
                        <YoutubeSearchedForIcon fontSize="large" />
                        <Typography variant="h6" component="h2" color="inherit">
                          Customer Churn Prediction
                        </Typography>
                      </Grid>
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      sx={{
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.16)',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        width: '100%',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        p: 3,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        },
                      }}
                      onClick={() => {}}
                      color="inherit"
                    >
                      <Grid item>
                        <YoutubeSearchedForIcon fontSize="large" />
                        <Typography variant="h6" component="h2" color="inherit">
                          Revenue Forecasting
                        </Typography>
                      </Grid>
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      sx={{
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.16)',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        width: '100%',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        p: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        },
                      }}
                      onClick={() => {}}
                      color="inherit"
                    >
                      <Grid item>
                        <YoutubeSearchedForIcon fontSize="large" />
                        <Typography variant="h6" component="h2" color="inherit">
                          Sentiment Analysis
                        </Typography>
                      </Grid>
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      sx={{
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.16)',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        width: '100%',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        p: 3,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        },
                      }}
                      onClick={() => {}}
                      color="inherit"
                    >
                      <Grid item>
                        <YoutubeSearchedForIcon fontSize="large" />
                        <Typography variant="h6" component="h2" color="inherit">
                          Sales Rep Performance Prediction
                        </Typography>
                      </Grid>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {environment === 'production' && (
                <Grid item xs={12} sx={{ p: 2 }}>
                <Grid container spacing={4}>
                <Grid item xs={4}>
                <Button
                      sx={{
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.16)',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        width: '100%',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        p: 5,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        },
                      }}
                      onClick={() => {}}
                      color="inherit"
                    >
                      <Grid item>
                        <TableChartIcon fontSize="large" />
                        <Grid container spacing={1}>
                        <Grid item>
                    <FiberManualRecordIcon sx={{color:'green'}} />
                  </Grid>
                        <Grid item>
                        <Typography variant="h5" component="h2" color="inherit">
                          My Project
                        </Typography>
                        </Grid>
                        
                        </Grid>
                        <Grid container >
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" component="h2" color="inherit" sx={{marginTop:'20px', marginBottom:'-30px'}}>
                            Last Updated: Today
                            </Typography>
                        </Grid>
                        </Grid>
                      </Grid>
                    
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                <Button
                      sx={{
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.16)',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        width: '100%',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        p: 5,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        },
                      }}
                      onClick={() => {}}
                      color="inherit"
                    >
                      <Grid item>
                        <Link href="/deepDive">
                        <TableChartIcon fontSize="large" />
                        <Grid container spacing={1}>
                        <Grid item>
                    <FiberManualRecordIcon sx={{color:'green'}} />
                  </Grid>
                        <Grid item>
                        <Typography variant="h6" component="h2" color="inherit">
                          Pipeline Management 
                        </Typography>
                        </Grid>
                        
                        </Grid>
                        <Grid container >
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" component="h2" color="inherit" sx={{marginTop:'20px', marginBottom:'-30px'}}>
                            Last Updated: 1 day ago
                            </Typography>
                        </Grid>
                        </Grid>
                        </Link>
                      </Grid>
                    
                    </Button>
                  </Grid>
                    </Grid>
                    </Grid>
            )}
                
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}