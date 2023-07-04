import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function CustomizedInputBase() {
  return (
    <ThemeProvider theme={darkTheme}>
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 570 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <img src="./White logo - no background.png" style={{height: '20px', width: 'auto'}} />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="e.g. Filter out all deals except market DACH and UK "
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
    </ThemeProvider>
  );
}