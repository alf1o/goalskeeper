import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoalSmall from './GoalSmall';

class Goal extends Component {
  static propTypes = {
    goal: PropTypes.object.isRequired
  };

  state = {
    expanded: false
  };

  render() {
    const { goal } = this.props;
    const { expanded } = this.state;
    return (
      !expanded && <GoalSmall goal={goal} />
    );
  }
}

export default Goal;
