import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import ResponsiveAppBar from '@/Components/appbar';
import ScoringTable1 from '@/Components/ScoringS1';
import DataSetup from '@/Components/dataSetup';
import SideMenu from '@/Components/testdealscoringSB';
import HorizontalNonLinearStepper from '@/Components/stepper.js';
import VerticalLinearStepper from '@/Components/stepper.js';
import TwoColumnScreen from '@/Components/ModelScreen';
import DeployScreen from '@/Components/DeployScreen';

export default function TestDS() {
  const [activeStep, setActiveStep] = useState(0);
  const [showScoringTable, setShowScoringTable] = useState(false);

  const handleHubspotClick = () => {
    setShowScoringTable(true);
  };

  const handleStep = (step) => {
    setActiveStep(step);
    setShowScoringTable(false); // Reset showScoringTable to false for step transitions
  };

  const steps = [
    {
      label: 'Data',
      description: '',
    },
    {
      label: 'Model',
      description: '',
    },
    {
      label: 'Deploy',
      description: '',
    },
  ];

  return (
    <div style={{ display: 'flex', position: 'sticky', top: 0, flexDirection: 'column', height: '100vh' }}>
      <ResponsiveAppBar />

      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ flex: '1.5', backgroundColor: '#1c1c1c', boxShadow: '2px 0 4px rgba(0, 0, 0, 0.2)', position: 'sticky', top: 0 }}>
          <VerticalLinearStepper activeStep={activeStep} handleStep={handleStep} steps={steps} />
        </div>

        <div style={{ flex: 11, maxWidth: '100%', boxShadow: '-2px 0 4px rgba(0, 0, 0, 0.2)', display: 'flex', boxSizing: 'border-box' }}>
          {activeStep === 1 ? (
            <TwoColumnScreen />
          ) : activeStep === 2 ? (
            <DeployScreen />
          ) : (
            <>
              {showScoringTable ? (
                <ScoringTable1 />
              ) : (
                <DataSetup onHubspotClick={handleHubspotClick} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}



