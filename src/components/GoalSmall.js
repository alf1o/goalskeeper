import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import LinearProgress from 'material-ui/LinearProgress';
import FlatButton from 'material-ui/FlatButton';
import Add from 'material-ui/svg-icons/content/add';

class GoalSmall extends Component {
  static propTypes = {
    goal: PropTypes.object.isRequired
  };

  state = {
    progress: 0
  }

  componentDidMount() {
    const { steps } = this.props.goal;
    if (steps.length) {
      const progress = steps.filter(step => step.completed).length / steps.length * 100;
      this.setState({ progress });
    }
  }

  render() {
    const { goal } = this.props;
    const { progress } = this.state;
    return (
      <div>
        <ListItem
          leftIcon={<ArrowDropDown />}
          onClick={() => alert('Expand me')}
          primaryText={goal.label}
        />
        <LinearProgress mode='determinate' value={progress} />
        <FlatButton
          label='add a step'
          icon={<Add />}
          onClick={() => alert('Add a step')}
          fullWidth={true}
        />
      </div>
    );
  }
}

export default GoalSmall;
