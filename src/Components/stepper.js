import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SimpleBackdrop from './loadingAnimation';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default function VerticalLinearStepper({ activeStep, handleStep, steps }) {
  const handleReset = () => {
    handleStep(0);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Box sx={{ maxWidth: 400 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={index === steps.length - 1 ? <Typography variant="caption">Last step</Typography> : null}
                  onClick={() => handleStep(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <Typography variant="h6">{step.label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body1">{step.description}</Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === 1 || activeStep === 2 ? (
            <SimpleBackdrop />
          ) : activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button variant="contained" onClick={handleReset} sx={{ mt: 2, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
