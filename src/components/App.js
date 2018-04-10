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
          <AppBar
            onLeftIconButtonClick={() => alert('Open drawer')}
            title='Goal Keeper'
            onTitleClick={() => alert('Route home')}
          />
          <Paper />
          <FloatingActionButton
            style={{
              position: 'absolute',
              bottom: 15,
              right: 15
            }}
            onClick={() => alert('Add a new goal')}
          >
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
