import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';

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
            <ListItem component="button"
              onClick={() => alert('navigate to /profile')}
            >
              <ListItemText inset primary="Profile" />
            </ListItem>
            <ListItem component="button"
              onClick={() => alert('navigate to /managegoals')}
            >
              <ListItemText inset primary="Manage Goals" />
            </ListItem>
            <ListItem component="button"
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
