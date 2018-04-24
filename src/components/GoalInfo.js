import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List';
import Step from './Step';
import Button from 'material-ui/Button';
import Add from '@material-ui/icons/Add';
import AddStepModal from './AddStepModal';

class GoalInfo extends Component {
  static propTypes = {
    steps: PropTypes.array.isRequired,
    goalId: PropTypes.string.isRequired
  };

  constructor() {
    super();
    this.state = {
      modalOpen: false
    };

    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalOpen() {
    this.setState({ modalOpen: true });
  }

  handleModalClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    const { steps, goalId } = this.props;
    const { modalOpen } = this.state;
    return (
      <Paper>
        <div>
          <List component="ul">
            {steps.map(step => <Step key={step.id} step={step} />)}
          </List>
          <Button
            color="primary"
            onClick={this.handleModalOpen}
            fullWidth={true}
          >
            <Add />
            add a step
          </Button>
        </div>
        <AddStepModal
          goalId={goalId}
          open={modalOpen}
          onClose={this.handleModalClose}
        />
      </Paper>
    );
  }
}

export default GoalInfo;
