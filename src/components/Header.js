import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class Header extends Component {
  static propTypes = {};

  render() {
    return (
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={() => alert('Open menu')}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Goals Keeper
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
