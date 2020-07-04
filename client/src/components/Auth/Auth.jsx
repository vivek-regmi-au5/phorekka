import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import { Typography, Paper } from '@material-ui/core';
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { oauthGoogle, oauthFacebook } from '../../actions';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
// import GoogleBtn from './GoogleBtn';

// TODO: Connect with redux forms, Fix the FB close window bug.

const formTheme = createMuiTheme({
  palette:{
    // type:'dark'
    primary: {
     main: '#9e9e9e',
    },
    secondary: {
      main: '#1e88e5',
    },
  }
});

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      alignContent:'stretch',
    },
    container:{
      minHeight:'88vh',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    paper: {
      margin: theme.spacing(6, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      [theme.breakpoints.down('md')]:{
        margin: theme.spacing(3, 4),
      }
    },
    socialGrp: {
      margin: theme.spacing(1, 0, 0),
    },
    socialBtns: {
      display:'inline-block',
      margin: theme.spacing(0, 1, 0),
    },
    muted: {
      color: '#d3d3d3',
      margin: theme.spacing(2, 0, 1),
    }
}));

// FIXME: fix this method and add back
// const responseFacebook = (res, props, dispatch) => {
//   dispatch(oauthFacebook(res.accessToken));
//   if (!props.errorMessage) {
//     props.history.push("/dashboard");
//   }
// }

const handleRoute = (props, path) => {

  props.history.push(path);
}

const Auth = (props) => {
  const signIn = props.page;
  const classes = useStyles();
  const errMsg = useSelector(state => state.auth.errorMessage);
  const dispatch = useDispatch();
  return (
    <div style={{display:'flex', minHeight:'88vh'}}>
    <div className={classes.root}>
      <Grid container className={classes.container}>
        <Grid item container xs={12} sm={7} md={5} lg={4} elevation={6} >
          <Grid item xs={1} sm={false} md={1}/>
          <Grid item xs={10} sm={12} md={10}>
            <div className={classes.paper}>
              <Typography component='h1' variant='h4'>
                { signIn ? 'Sign In' : 'Register' }
              </Typography>
              
              <div>
              <ThemeProvider theme={formTheme}>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
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
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  {signIn? <FormControlLabel
                    control={<Checkbox value="remember" color="secondary" />}
                    label="Remember me"
                  />
                  : <FormControlLabel
                      control={<Checkbox value="agree" color="secondary" />}
                      label="Accept Terms & Conditions"
                    />
                  }
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                  >
                    { signIn ? 'Sign In' : 'Create New Account' }
                  </Button>
                    <Grid item xs>
                      {signIn && 
                      <Link variant="body2" 
                        component={RouterLink} 
                        to='/forgot-password'>
                        Forgot password?
                      </Link>}
                    </Grid>
                    <Grid item>
                      <Link variant="body2" 
                        component={RouterLink} 
                        to={signIn ? '/signup' : '/signin'}>
                        {signIn ? "Don't have an account? Register" : "Already have an account? Sign in"}
                      </Link>
                    </Grid>
                </form>
                </ThemeProvider>
              </div>
              
              <div className={classes.muted}>
                <Typography variant='p' className='decorated'><span>OR</span></Typography>
              </div>
  
              <div className={classes.socialGrp}>
                <div className={classes.socialBtns}>
                  <GoogleLogin
                    clientId="959283301750-cvgdn8sdcf1afcsfdolavtqavf89ubjk.apps.googleusercontent.com" 
                    // render={renderProps => (
                    //   // <button onClick={renderProps.onClick}>This is my custom Google button</button>
                    //   <GoogleBtn />
                    // )}
                    buttonText='Google'
                    fields="name, email, picture"
                    onSuccess={async (res) => {
                      await dispatch(oauthGoogle(res.accessToken));
                      props.history.push("/dashboard");
                    }}
                    onFailure={()=>{}} />
                </div>
  
                <div className={classes.socialBtns}>
                  <FacebookLogin
                    appId="3114357415321475"
                    textButton="Facebook"
                    fields="name, email, picture"
                    cssClass='fb-btn'
                    textButton='Facebook'
                    callback={async (res) => {
                      await dispatch(oauthFacebook(res.accessToken));
                      if(!errMsg) {
                        props.history.push("/dashboard");
                      }}} />
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={1} sm={false} md={1}/>
        </Grid>
        
        {/* <Hidden only={['xs', 'sm']}> */}
        <Hidden xsDown>
          <Grid item sm={5} md={7} lg={8} style={{background:'#eeeeee'}}>
            <h1>Placeholder</h1>
          </Grid>
        </Hidden>
      </Grid>
    </div>
    </div>
  )
}

export default Auth;
