import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Paper } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AlertDialog from './deployConfirm';
import TableChartIcon from '@mui/icons-material/TableChart';


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

export default function DataSetup({ onHubspotClick }) {
    const [csvFile, setCsvFile] = React.useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setCsvFile(file);
      };
    
      const handleUploadCsv = () => {
        // Handle the uploaded CSV file
        if (csvFile) {
          // Perform actions with the CSV file
          console.log('Uploaded CSV file:', csvFile);
        }
        };

  const handleHubspotClick = async() => {
    try{
        if (typeof onHubspotClick === 'function') {
            onHubspotClick();
          }

     
    
   
    } catch (error) {
        console.error('Error fetching deals:', error);
        }

  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container spacing={2} sx={{ maxWidth: '100vw', margin: 0, marginBottom: '20px', marginRight: '20px', }}>
        <Grid item xs={12}>
          <Paper sx={{ height: '100%', p: 3 }}>
            <Typography variant="h5" component="h2">
              Select your data source
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                Select the data source you want to use for the model.
            </Typography>
            <br />
            <Grid container spacing={4}>
              
                <Grid item xs={3} >
                <Button  sx={buttonStyles}  onClick={handleUploadCsv}>
                    <Grid item>
                 
                  <TableChartIcon fontSize='large' />
                  <Typography variant="subtitle1" component="h2" color="text.primary">
                    Upload CSV
                    </Typography>
                  </Grid>
                  <input type="file" accept=".csv" hidden onChange={handleFileChange} />
                </Button>
                </Grid>
                <Grid item xs={3}>
                
                <Button variant="contained" sx={buttonStyles} onClick={handleHubspotClick}>
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
                  
                </Grid>
                            
                            
                           

              </Grid>  
              
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
