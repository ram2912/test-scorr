import React from 'react';
import { Grid, Paper, Button, Accordion } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import BarChartExample from './FactorChart';
import AlignHorizontalLeftSharpIcon from '@mui/icons-material/AlignHorizontalLeft';
import TuneIcon from '@mui/icons-material/Tune';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ControlledAccordions from './FactorSelector';
import DiscreteSliderMarks from './slider';
import DenseTable from './scoretable';
import SpeedIcon from '@mui/icons-material/Speed';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import Divider from '@mui/material/Divider';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AlertDialog from './deployConfirm';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const buttonStyles = {
    height: '100%',
    backgroundColor: '#1C1C1C',
    color: '#FFFFFF',
    textTransform: 'none',
    width: '100%',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    p: 3,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderColor: '#0288d1',
    },
};

    


export default function DeployScreen() {
    const [selectedButton, setSelectedButton] = React.useState('neutral');

  const handleButtonClick = (value) => {
    setSelectedButton(value);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container spacing={2} sx={{ maxWidth: '100vw', margin: 0, marginBottom: '20px', marginRight: '20px', }}>
        <Grid item xs={12}>
          <Paper sx={{ height: '100%', p: 3 }}>
            <Typography variant="h5" component="h2">
              Pick Deployment Type
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Select how you want to deploy the model. You can either deploy it as a web app or choose from the suite of connectors.
            </Typography>
            <br />
            <Grid container spacing={4}>
              
                <Grid item xs={3} >
                <Button  sx={buttonStyles}  onClick={() => {}}>
                    <Grid item>
                 
                  <img src="./White logo - no background.png" style={{height: '50px', width: 'auto'}} />
                  <Typography variant="subtitle1" component="h2" color="text.primary">
                    Web App
                    </Typography>
                  </Grid>
                </Button>
                </Grid>
                <Grid item xs={3}>
                
                <Button variant="contained" sx={buttonStyles} onClick={() => {}}>
                    <Grid container spacing={1}>
                    <Grid item xs={12} >
                    <img src="./pngegg (1).png" style={{height: '40px', width: 'auto'}} />
                
                  </Grid>
                  <Grid item xs={12} >
                  <Grid container spacing={0.5} alignItems="center" justifyContent="center">
                  <Grid item>
                    <FiberManualRecordIcon sx={{color:'green'}} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" component="h2" color="text.primary">
                      Connected
                    </Typography>
                  </Grid>
                </Grid>
                    </Grid>
                    </Grid>
                </Button>
                </Grid>
                <Grid item xs={3}>
                <Button variant="contained" sx={buttonStyles} onClick={() => {}}>
                    <Grid item >
                    <img src="./salesforce-logo.png" style={{height: '70px', width: 'auto'}} />
                 
                  </Grid>
                </Button>
                </Grid>
                <Grid item xs={3}>
                <Button variant="contained" sx={buttonStyles} onClick={() => {}}>
                    <Grid item >
                    <img src="./Snowflake_Logo.svg.png" style={{height: '50px', width: 'auto'}} />
                  
                  </Grid>
                </Button>
                </Grid>
                <Grid item xs={3}>
                <Button variant="contained" sx={buttonStyles} onClick={() => {}}>
                    <Grid item >
                    <img src="./Google_Sheets_logo_(2014-2020).svg.png" style={{height: '70px', width: 'auto'}} />
                 
                  </Grid>
                </Button>
                </Grid>
              <br />
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <TuneIcon color="action" />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h2" color="text.primary">
                      Deployment Setup
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ marginBottom:'20px', marginTop:'20px'}} >
                     <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography variant="h6" component="h2" color="text.primary">
                                Hubspot Dataset
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Select the dataset from Hubspot.
                            </Typography>
                            <br />
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select object</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                
                                label="Age"
                                
                            >
                                <MenuItem value={10}>Contacts</MenuItem>
                                <MenuItem value={20}>Leads</MenuItem>
                                <MenuItem value={30}>Deals</MenuItem>
                            </Select>
                            </FormControl>
                            </Grid>
                            </Grid>
                            </Grid>
                            <br />
                            
                            <Grid item xs={4} sx={{ marginBottom:'20px'}}>
                            <Typography variant="h6" component="h2" color="text.primary">
                                Schedule Frequency
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Select the frequency of the model to run.
                            </Typography>
                            <br />
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select frequency</InputLabel>
                            <Select 
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                            >
                                <MenuItem value={10}>Daily</MenuItem>
                                <MenuItem value={20}>Weekly</MenuItem>
                                <MenuItem value={30}>Monthly</MenuItem>
                            </Select>
                            </FormControl>
                            </Grid>
                            <br />
                            <Grid item xs={12} sx={{ marginBottom:'20px'}} >
                            <Grid item xs={4} >
                            <Typography variant="h6" component="h2" color="text.primary">
                                Apply Data Prep
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Prepares data before making predictions.
                            </Typography>
                            <br />
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Data Prep</InputLabel>
                            <Select 
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                            >
                                <MenuItem value={10}>Yes</MenuItem>
                                <MenuItem value={20}>No</MenuItem>
                                
                            </Select>
                            </FormControl>
                            </Grid>
                            </Grid>
                            </Grid>
                            <br />
                            <Grid item xs={12} justifyContent="center" alignContent="center">
                            <AlertDialog />
                            </Grid>
                            
                            
                           

              </Grid>  
              
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}