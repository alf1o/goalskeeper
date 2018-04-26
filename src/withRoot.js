import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5efc82',
      main: green['A700'],
      dark: '#009624'
    },
    secondary: {
      light: '#df78ef',
      main: purple['400'],
      dark: '#790e8b'
    },
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
