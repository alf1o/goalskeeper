import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Add from 'material-ui/svg-icons/content/add';

class GoalInfo extends Component {
  render() {
    return (
      <Paper>
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
