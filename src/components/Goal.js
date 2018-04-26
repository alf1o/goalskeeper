import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import GoalInfo from './GoalInfo';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

const styles = {
  listItem: {
    display: 'flex',
    'flex-direction': 'column'
  },
  linearProgress: {
    width: '100%'
  }
};

class Goal extends Component {
  static propTypes = {
    goal: PropTypes.object.isRequired,
    steps: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
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
    return steps.filter(step => step.completed).length / steps.length * 100 || 0;
  }

  render() {
    const { goal, steps, classes } = this.props;
    const { expanded } = this.state;
    const progress = this.calculateProgress(steps);
    return (
      <ListItem className={classes.listItem} divider={true}>
        <ExpansionPanel expanded={expanded} onChange={this.handleClick}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div>
              <Typography variant="title">{goal.name}</Typography>
              <Typography variant="subheading">{'Due: ' + goal.dueDate}</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <GoalInfo steps={steps} goalId={goal.id} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <LinearProgress
          variant="determinate"
          color="secondary"
          className={classes.linearProgress}
          value={progress}
        />
      </ListItem>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    steps: ownProps.goal.steps.map(stepId => state.stepsById[stepId])
  };
}

export { Goal as UnwrappedGoal };
export default withStyles(styles)(connect(mapStateToProps)(Goal));
