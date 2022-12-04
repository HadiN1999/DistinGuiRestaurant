import * as React from 'react';
import {Stack, Snackbar, Alert  } from '@mui/material';

const Snack = ({open, severity, message, close}) => {

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar onClose={close} anchorOrigin={{vertical:'bottom', horizontal:'center'}} open={open} autoHideDuration={2000}>
        <Alert onClose={close} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default Snack