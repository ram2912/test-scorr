import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

const ariaLabel = { 'aria-label': 'description' };

export default function Inputs() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Input defaultValue="My Project" inputProps={ariaLabel} />
    </Box>
  );
}