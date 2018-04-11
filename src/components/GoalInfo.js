import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Add from 'material-ui/svg-icons/content/add';

class GoalInfo extends Component {
  static propTypes = {
    steps: PropTypes.array.isRequired
  };

  render() {
    return (
      <Paper>
        <List>

        </List>
        <FlatButton
          label='add a step'
          icon={<Add />}
          onClick={() => alert('Add a step')}
          fullWidth={true}
        />
      </Paper>
    );
  }
}

export default GoalInfo;
