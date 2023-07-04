import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

export default function BasicButton(props) {
    return (
        <ThemeProvider theme={darkTheme}>
        <Stack spacing={2} direction="row">
            <Button size="small" variant="contained" startIcon={<AutoFixHighIcon />}>{props.text}</Button>
        </Stack>
        </ThemeProvider>
    );
}
