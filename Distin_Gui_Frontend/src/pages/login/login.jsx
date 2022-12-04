import * as React from 'react';
import { Button, TextField, Box, Typography, Container } from '@mui/material';
import logo from '../../assets/distin.jpg'
import { login } from '../../core/authApi';
import Snack from '../../components/snackbar';
import { useState } from 'react';



const Login =({setUser})=>{

    const [snackbarOption, setSnackbarOption] = useState({
        open:false,
        severity:'warning',
        message:'test'
    })

    const close=()=>{
        setSnackbarOption({...snackbarOption,
        open:false,
    })
    }

    const handleSubmit =(event)=>{

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      user_name: data.get('email'),
      password: data.get('password'),
    }).then((res)=>{
        if(!res.success)
        {
            setSnackbarOption({...snackbarOption, open:true, message: res.message, severity:'error'})
            return
        }

        setUser(res.user)
        localStorage.setItem('user', JSON.stringify(res.user))
    })

}

      return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{display:'flex', justifyContent:'center',objectFit:'contain'}}>
                        <img src={logo} style={{maxWidth:'100%'}} />
            </div>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor:'#a61d24',"&.MuiButtonBase-root:hover": {
                bgcolor: "#a61d24"
              } }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Snack close={close} open={snackbarOption.open} severity={snackbarOption.severity} message={snackbarOption.message} />
      </Container>
  );

}

export default Login