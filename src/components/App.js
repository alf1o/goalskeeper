import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import logo from '../logo.svg';
import withRoot from '../withRoot';
import { withStyles } from 'material-ui/styles';
import SideMenu from './SideMenu';
import Header from './Header';
import Button from 'material-ui/Button';
import GoalsList from './GoalsList';
import ContentAdd from '@material-ui/icons/Add';

class App extends Component {
  static propTypes = {
    mockState: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      drawerOpen: false
    };
    this.handleOpenDrawer = this.handleOpenDrawer.bind(this);
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this);
  }

  handleOpenDrawer() {
    this.setState({ drawerOpen: true });
  }

  handleCloseDrawer() {
    this.setState({ drawerOpen: false });
  }

  render() {
    const { mockState } = this.props;
    const { drawerOpen } = this.state;
    return (
      <div>
        <SideMenu open={drawerOpen} handleClose={this.handleCloseDrawer} />
        <Header
          openDrawer={this.handleOpenDrawer}
        />
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

export { App as UnwrappedApp };

export default withRoot(withStyles()(App));
