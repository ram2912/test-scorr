import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: 'Least likely',
  },
  {
    value: 100,
    label: 'Most likely',
  },
];

export default function DiscreteSliderMarks() {
  const calculateGradient = (value) => {
    if (value <= 33) {
      return 'red';
    } else if (value <= 66) {
      return 'yellow';
    } else {
      return 'green';
    }
  };

  return (
    <Box sx={{ width: 400, marginLeft: 'auto', marginRight: 'auto' }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={20}
        getAriaValueText={(value) => `${value}°C`}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        sx={{
          '& .MuiSlider-track': (props) => ({
            background: calculateGradient(props['aria-valuenow']),
          }),
        }}
      />
    </Box>
  );
}




