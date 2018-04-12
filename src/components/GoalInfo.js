import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List';
import Step from './Step';
import Button from 'material-ui/Button';
import Add from '@material-ui/icons/Add';

class GoalInfo extends Component {
  static propTypes = {
    steps: PropTypes.array.isRequired
  };

  render() {
    const { steps } = this.props;
    return (
      <Paper>
        <List component="ul">
          {steps.map(step => <Step key={step.id} step={step} />)}
        </List>
        <Button
          color="primary"
          onClick={() => alert('Add a step')}
          fullWidth={true}
        >
          <Add />
          add a step
        </Button>
      </Paper>
    );
  }
}

export default GoalInfo;
