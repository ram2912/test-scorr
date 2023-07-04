import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { styled as styled2 } from '@mui/material/styles';
import Slider from '@mui/material/Slider';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});


const buttonStyles2 = {
    
    backgroundColor: '#121212',
    color: '#FFFFFF',
    textTransform: 'none',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
};

const selectedButtonStyles = {
    ...buttonStyles2,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
};

export default function RecommendationEngine() {
    const [selectedButton, setSelectedButton] = React.useState('neutral');

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

return (

<Paper sx={{  backgroundColor:'#1C1C1C',height: '100%',p: 2  }}>
<Typography variant="h6" component="h2" color="text.primary">
    Recommendation Engine
</Typography>
<Typography variant="subtitle1" color="text.secondary" >
    Adjust recommendations for the factors affecting the outcome.
</Typography>
<br />
<br />
<Grid container spacing={2} sx={{ alignContent:'center', justifyContent:'center'}}>
<ButtonGroup  aria-label="outlined button group">
<Button onClick={() => handleButtonClick('atRisk')}
sx={selectedButton === 'atRisk' ? selectedButtonStyles : buttonStyles2}>At Risk</Button>
<Button onClick={() => handleButtonClick('neutral')}
sx={selectedButton === 'neutral' ? selectedButtonStyles : buttonStyles2}>Neutral</Button>
<Button onClick={() => handleButtonClick('onTrack')}
sx={selectedButton === 'onTrack' ? selectedButtonStyles : buttonStyles2}>On track</Button>
</ButtonGroup>
</Grid>
<br />
<br />
<Grid container spacing={2}>
    <Grid item xs={4}>
        <Paper sx={{ backgroundColor: '#1C1C1C',p: 2,color: '#FFFFFF', textTransform: 'none',
                    width: '100%',
                    cursor: 'pointer',
                    '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },  }}>
            <Typography variant="h6" component="h2" color="text.primary">
                Email Sentiment
            </Typography>
            </Paper>
            <br />
            <Paper sx={{ backgroundColor: '#1C1C1C',p: 2,color: '#FFFFFF', textTransform: 'none',
                    width: '100%',
                    cursor: 'pointer',
                    '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },   }}>
            <Typography variant="h6" component="h2" color="text.primary">
                Close Date Push
            </Typography>
            </Paper>
            <br />
            <Paper sx={{ backgroundColor: '#1C1C1C',p: 2,color: '#FFFFFF', textTransform: 'none',
                    width: '100%',
                    cursor: 'pointer',
                    '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },   }}>
            <Typography variant="h6" component="h2" color="text.primary">
                Property Fill
            </Typography>
            
            </Paper>
            <br />
            <Paper sx={{ backgroundColor: '#1C1C1C',p: 2,color: '#FFFFFF', textTransform: 'none',
                    width: '100%',
                    cursor: 'pointer',
                    '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },   }}>
            <Typography variant="h6" component="h2" color="text.primary">
                Response Time
            </Typography>
            </Paper>
            <br />
            <Paper sx={{ backgroundColor: '#1C1C1C',p: 2,color: '#FFFFFF', textTransform: 'none',
                    width: '100%',
                    cursor: 'pointer',
                    '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },  }}>
            <Typography variant="h6" component="h2" color="text.primary">
                Stakeholder Involved
            </Typography>
            </Paper>

    </Grid>
    
    <Grid item xs={8}>
        <Paper sx={{ height: '100%',p: 2  }}>
            <Typography variant="h6" component="h2" color="text.primary">
                Email Sentiment
            </Typography>
            </Paper>
            <br />
            </Grid>
</Grid>
</Paper>
);
}