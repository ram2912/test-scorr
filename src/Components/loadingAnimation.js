import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress color="inherit" />
        <Typography variant="h6" style={{ marginTop: '10px' }}>Building your AI</Typography>
      </div>
    </Backdrop>
  );
}
