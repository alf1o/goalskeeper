import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import Step from './Step';
import FlatButton from 'material-ui/FlatButton';
import Add from 'material-ui/svg-icons/content/add';

class GoalInfo extends Component {
  static propTypes = {
    steps: PropTypes.array.isRequired
  };

  render() {
    const { steps } = this.props;
    return (
      <Paper>
        <List>
          {steps.map(step => <Step key={step.id} step={step} />)}
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
