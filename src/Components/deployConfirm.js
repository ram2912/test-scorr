import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Link from 'next/link';


export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" startIcon={<RocketLaunchIcon />}onClick={handleClickOpen}>
        Deploy
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deploy Successful"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your project has been deployed successfully. You can now view your project on the dashboard.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Link href="/dashboard" passHref>
          <Button onClick={handleClose}>View</Button>
          </Link>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}