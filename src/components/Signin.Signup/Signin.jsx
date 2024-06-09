//import React from 'react'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link , useNavigate}from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';

import { useAuth } from '../AuthContext';

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

//const defaultTheme = createTheme();

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  

export default function Signin() {
  
  const [showAlert, setShowAlert] = useState(false);
  
  const [singin, setSignin] = useState(false);

  const navigate= useNavigate();
  const {login}= useAuth();

  React.useEffect(()=>{
    const jwtToken =  localStorage.getItem('token');
    if(jwtToken) {
        navigate('/')
    }
} , [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    
      try{
        const response = await fetch('https://academics.newtonschool.co/api/v1/bookingportals/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'projectID': 'f104bi07c490', 
          },
          body: JSON.stringify({
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value,
            appType: 'bookingportals' 
          }),
        });

        if(response.ok){
          const responseData= await response.json();
       //   console.log("response data=>",responseData)
       login(responseData.token);
   //       localStorage.setItem('userToken', responseData.token);
          localStorage.setItem('userdata',JSON.stringify(responseData));
         // alert("logged in sucessfully");
          setSignin(true);
           navigate("/", { state: { userloggedin: true } });
        }

        else{
          //alert('Incorrect username or password');
          setShowAlert(true);

        }
      }
      catch(error){ 
             console.log(error);
      }
   // }
    // else{
    //   alert("invalid username or password");
    // }

  };



  return (
   
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
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
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              Log in
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to={`/signup`} variant="body2" >
                  {"Don't have an account?" } <span className=' text-blue-600'>Sign up</span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />

        {showAlert && (
            <div role="alert" class="fade  bg-slate-100 alert alert-primary alert-dismissible show"  dismissible>
              <button type="button" class="btn-close" aria-label="Close alert" onClick={() => setShowAlert(false)}>X</button>
              <div class="alert-heading h4">Incorrect username or password</div>
              <p>Please enter correct username or password</p></div>
      )}
      
      {singin && (
         <Alert className=' bg-white' onClose={() => setSignin(false)} dismissible>
         Logged in Successfully
       </Alert>

      )}


      </Container>

  )};
