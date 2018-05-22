import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';
import completeStepThunk from '../actions/completeStep';

const Step = ({ step, completeStep }) => (
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
  </ListItem>
);

Step.propTypes = {
  step: PropTypes.object.isRequired,
  completeStep: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  completeStep: completeStepThunk
};

export { Step as UnwrappedStep };
export default connect(null, mapDispatchToProps)(Step);
