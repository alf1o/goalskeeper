import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { NavLink } from 'react-router-dom';

class SideMenu extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
  };

  render() {
    const { open, handleClose } = this.props;
    return (
      <Drawer
        open={open}
        onClose={handleClose}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={handleClose}
          onKeyDown={handleClose}
        >
          <List>
            <ListItem
              component={NavLink}
              to="/profile"
              divider={true}
            >
              <ListItemText inset primary="Profile" />
            </ListItem>
            <ListItem
              divider={true}
              onClick={() => alert('navigate to /managegoals')}
            >
              <ListItemText inset primary="Manage Goals" />
            </ListItem>
            <ListItem
              divider={true}
              onClick={() => alert('navigate to /tips')}
            >
              <ListItemText inset primary="Tips" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    );
  }
}

export default SideMenu;
