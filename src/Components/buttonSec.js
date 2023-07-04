import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

export default function TextButtons(props) {
  return (
    <ThemeProvider theme={darkTheme}>
    <Stack direction="row" spacing={2}>
      <Button >{props.text}</Button>
    </Stack>
    </ThemeProvider>
  );
}