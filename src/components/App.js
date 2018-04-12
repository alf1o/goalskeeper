import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import logo from '../logo.svg';
import withRoot from '../withRoot';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GoalsList from './GoalsList';
import ContentAdd from '@material-ui/icons/Add';

class App extends Component {
  static propTypes = {
    mockState: PropTypes.object.isRequired
  };

  render() {
    const { mockState } = this.props;
    return (
      <div>
        <AppBar>
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Goals Keeper
            </Typography>
          </Toolbar>
        </AppBar>
        <GoalsList goalsById={mockState.goalsById} />
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          style={{
            position: 'absolute',
            bottom: 15,
            right: 15
          }}
          onClick={() => alert('Add a new goal')}
        >
          <ContentAdd />
        </Button>
      </div>
    );
  }
}

export default withRoot(withStyles()(App));
