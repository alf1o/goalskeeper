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
import Button from 'material-ui/Button';
import Delete from '@material-ui/icons/Delete';
import { LinearProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import deleteGoalThunk from '../actions/deleteGoal';

const styles = {
  listItem: {
    display: 'flex',
    'flex-direction': 'column',
    width: '100%',
    padding: 0
  },
  expPanel: {
    width: '100%',
    padding: '2%'
  },
  expPanelDetails: {
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
    classes: PropTypes.object.isRequired,
    deleteGoal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.calculateProgress = this.calculateProgress.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  }

  calculateProgress(steps) {
    return steps.filter(step => step.completed).length / steps.length * 100 || 0;
  }

  handleDelete() {
    const { deleteGoal, goal } = this.props;
    deleteGoal(goal);
  }

  render() {
    const { goal, steps, classes } = this.props;
    const { expanded } = this.state;
    const progress = this.calculateProgress(steps);
    return (
      <ListItem className={classes.listItem} divider={true}>
        <ExpansionPanel expanded={expanded} onChange={this.handleClick} className={classes.expPanel}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div>
              <Typography variant="title">{goal.name}</Typography>
              <Typography variant="subheading">{'Due: ' + goal.dueDate}</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expPanelDetails}>
            <GoalInfo steps={steps} goalId={goal.id} />
            <Button
              style={{margin: 'auto'}}
              variant="raised"
              aria-label="delete-goal"
              color="secondary"
              onClick={this.handleDelete}
            >
              Delete
              <Delete />
            </Button>
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

const mapDispatchToProps = {
  deleteGoal: deleteGoalThunk
};

export { Goal as UnwrappedGoal };
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Goal));
