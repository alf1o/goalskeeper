import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import GoalInfo from './GoalInfo';
import { LinearProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';

class Goal extends Component {
  static propTypes = {
    goal: PropTypes.object.isRequired,
    steps: PropTypes.array.isRequired
  };

  constructor() {
    super();
    this.state = {
      expanded: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.calculateProgress = this.calculateProgress.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  }

  calculateProgress(steps) {
    return steps.filter(step => step.completed).length / steps.length * 100;
  }

  render() {
    const { goal, steps } = this.props;
    const { expanded } = this.state;
    const progress = this.calculateProgress(steps);
    return (
      <div>
        <ListItem component="button"
          onClick={this.handleClick}
        >
          <ListItemIcon>
            {expanded ? <ArrowDropUp /> : <ArrowDropDown />}
          </ListItemIcon>
          <ListItemText inset primary={goal.name} secondary={'Due: ' + goal.dueDate} />
        </ListItem>
        {expanded && <GoalInfo steps={steps} goalId={goal.id} />}
        <LinearProgress variant='determinate' value={progress} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    steps: ownProps.goal.steps.map(stepId => state.stepsById[stepId])
  };
}

export { Goal as UnwrappedGoal };
export default connect(mapStateToProps)(Goal);
