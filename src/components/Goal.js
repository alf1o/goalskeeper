import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import GoalInfo from './GoalInfo';
import { LinearProgress } from 'material-ui/Progress';

class Goal extends Component {
  static propTypes = {
    goal: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      expanded: false,
      progress: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(oldState => ({ expanded: !oldState.expanded }));
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
    const { expanded, progress } = this.state;
    return (
      <div>
        <ListItem component="button"
          onClick={this.handleClick}
        >
          <ListItemIcon>
            <ArrowDropDown />
          </ListItemIcon>
          <ListItemText inset primary={goal.label} secondary={'Due at: ' + goal.dueDate} />
        </ListItem>
        {expanded && <GoalInfo steps={goal.steps} />}
        <LinearProgress variant='determinate' value={progress} />
      </div>
    );
  }
}

export default Goal;
