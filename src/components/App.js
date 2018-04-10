import React, { Component } from 'react';
// import logo from '../logo.svg';
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar />
          <Paper />
          <FloatingActionButton style={{
            position: 'absolute',
            bottom: 15,
            right: 15
          }}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
