import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import logo from '../logo.svg';
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import GoalsList from './GoalsList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class App extends Component {
  static propTypes = {
    mockState: PropTypes.object.isRequired
  };

  render() {
    const { mockState } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            onLeftIconButtonClick={() => alert('Open drawer')}
            title='Goals Keeper'
            onTitleClick={() => alert('Route home')}
          />
          <GoalsList goalsById={mockState.goalsById} />
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
