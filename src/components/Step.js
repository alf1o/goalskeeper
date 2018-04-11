import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Clear from 'material-ui/svg-icons/content/clear';
import Done from 'material-ui/svg-icons/action/done';

class Step extends Component {
  static propTypes = {
    step: PropTypes.object.isRequired
  };

  render() {
    const { step } = this.props;
    return (
      <ListItem
        leftCheckbox={<Checkbox checked={step.completed} />}
        primaryText={step.content}
        rightIcon={step.completed ? <Done /> : <Clear />}
      />
    );
  }
}

export default Step;
