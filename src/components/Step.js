import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import Clear from '@material-ui/icons/Clear';
import { connect } from 'react-redux';
import completeStepThunk from '../actions/completeStep';
import removeStepThunk from '../actions/removeStep';

class Step extends Component {
  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(evt) {
    const { step, removeStep } = this.props;
    evt.stopPropagation();
    removeStep(step.id, step.goalId);
  }

  render() {
    const { step, completeStep } = this.props;
    return (
      <ListItem
        divider={true}
        onClick={() => completeStep(step.id, !step.completed)}
      >
        <Checkbox
          checked={step.completed}
          disableRipple
          color='secondary'
        />
        <ListItemText inset primary={step.content} />
        <Button
          variant="fab"
          aria-label="delete-step"
          onClick={this.handleRemove}
          mini={true}
          color="secondary"
        >
          <Clear />
        </Button>
      </ListItem>
    );
  }
}

Step.propTypes = {
  step: PropTypes.object.isRequired,
  completeStep: PropTypes.func.isRequired,
  removeStep: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  completeStep: completeStepThunk,
  removeStep: removeStepThunk
};

export { Step as UnwrappedStep };
export default connect(null, mapDispatchToProps)(Step);
