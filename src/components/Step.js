import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';
import completeStep from '../actions/completeStep';

const Step = ({ step, completeStep }) => (
  <ListItem
    component="button"
    onClick={() => completeStep(step.id, !step.completed)}
  >
    <Checkbox
      checked={step.completed}
      disableRipple
      color='primary'
    />
    <ListItemText inset primary={step.content} />
  </ListItem>
);

Step.propTypes = {
  step: PropTypes.object.isRequired,
  completeStep: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  completeStep
};

export { Step as UnwrappedStep };
export default connect(null, mapDispatchToProps)(Step);
