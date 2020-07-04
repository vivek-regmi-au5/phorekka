import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../actions";

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import { Button, InputBase, Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import { blue } from '@material-ui/core/colors';

const appBarTheme = createMuiTheme({
  palette:{
    // type:'dark'
    primary: {
      light: '#fff', 
      main: '#fff',
      dark: '#fff',
    },
    secondary: {
      light: '#000', 
      main: '#000',
      dark: '#000',
    }
  }
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
      color: '#000',
      '&:hover': {
        color: '#000'
      },
    },
    grow: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
}));


const Header = (props) => {
  const classes = useStyles();
  const auth = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={appBarTheme}>
        <AppBar elevation={0} position='fixed'>
          <Toolbar >
            <IconButton 
            edge='start' 
            className={classes.menuButton} 
            color='inherit' 
            aria-label='menu'
            disableFocusRipple={true}
            disableRipple={true} >
              {/* <HomeIcon /> */}
              Phorekka
            </IconButton>
            {/* <Typography variant='h6' className={classes.title}>
              Phorekka
            </Typography> */}
            {/* <Paper elevation={0} className={classes.title}> */}
            <Button
              color='inherit' 
              className={classes.link} 
              component={Link} to='/dashboard' 
              disableFocusRipple={true}
              disableRipple={true}
              disableElevation={true} >
              Dashboard
            </Button>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
            {/* </Paper> */}
            <Button
              color='inherit' 
              className={classes.link} 
              component={Link} to='/people' 
              disableFocusRipple={true}
              // disableRipple={true}
              disableElevation={true} >
              People
            </Button>
            <Box mx={8}>
              <Button
                color='inherit' 
                className={classes.link} 
                component={Link} to='/product' 
                disableFocusRipple={true}
                // disableRipple={true}
                disableElevation={true} >
                Product
              </Button>
            </Box>
            
            {auth?
              <Button
                onClick={()=> dispatch(signOut())}
                color='inherit' 
                className={classes.link} 
                component={Link} to='/' 
                disableFocusRipple={true}
                // disableRipple={true}
                disableElevation={true} >
                Sign out
              </Button>
              :<Button
                mx={2}
                color='inherit' 
                className={classes.link} 
                component={Link} to='/signin' 
                disableFocusRipple={true}
                // disableRipple={true}
                disableElevation={true} >
                Sign in
              </Button>}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  )
}

export default Header;