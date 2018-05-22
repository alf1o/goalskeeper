import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import logo from '../logo.svg';
import withRoot from '../withRoot';
// import { withStyles } from 'material-ui/styles';
import SideMenu from './SideMenu';
import Header from './Header';
import Routes from './Routes';
import Button from 'material-ui/Button';
import ContentAdd from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import addExistingGoalThunk from '../actions/addExistingGoal';
import setupDB from '../indexedDButils';

const MyLink = props => <Link to="/creategoal" {...props} />;

class App extends Component {
  static propTypes = {
    addExistingGoal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
    this.handleOpenDrawer = this.handleOpenDrawer.bind(this);
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this);
  }

  componentDidMount() {
    const { addExistingGoal } = this.props;
    setupDB()
    .then(addExistingGoal);
  }

  handleOpenDrawer() {
    this.setState({ drawerOpen: true });
  }

  handleCloseDrawer() {
    this.setState({ drawerOpen: false });
  }

  render() {
    const { drawerOpen } = this.state;
    return (
      <div>
        <SideMenu open={drawerOpen} handleClose={this.handleCloseDrawer} />
        <Header
          openDrawer={this.handleOpenDrawer}
        />

        <Routes />

        <Button
          component={MyLink}
          variant="fab"
          color="secondary"
          aria-label="add"
          style={{
            position: 'absolute',
            bottom: 15,
            right: 15
          }}
        >
          <ContentAdd />
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addExistingGoal: addExistingGoalThunk
};

export { App as UnwrappedApp };
export default withRoot(connect(null, mapDispatchToProps)(App));
