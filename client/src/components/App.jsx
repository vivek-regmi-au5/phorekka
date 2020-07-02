import React from "react";
import Header from "./Main/Header";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  offset: {
    ...theme.mixins.toolbar,
    flexGrow: 1
  }
}));

function App(props) {
  return (
    <div>
      <Header />
      {/* <div className={`${useStyles().offset} ${'container'}`} >{props.children}</div> */}
      {/* Adding an offset to push the content down */}
      <div className={useStyles().offset}></div>
      <div className='container'>
        {props.children}
      </div>
    </div>
  );
}

export default App;
