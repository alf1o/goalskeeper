import React from 'react';
// import { MuiThemeProvider } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <div>
        <CssBaseline />
        <Component {...props} />
      </div>
    );
  }

  return WithRoot;
}

export default withRoot;
