import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Add from 'material-ui/svg-icons/content/add';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import LinearProgress from 'material-ui/LinearProgress';
// import DateRange from 'material-ui/svg-icons/action/date-range';

class GoalsList extends Component {
  static propTypes = {
    goalsById: PropTypes.object.isRequired
  };

  calcPerc = steps => (steps.length
    ? steps.filter(step => step.completed).length / steps.length * 100
    : 0);

  render() {
    const { goalsById } = this.props;
    return (
      <Paper>
        <List>
          {Object.values(goalsById).map(goal => (
            <div key={goal.id}>
              <ListItem
                leftIcon={<ArrowDropDown />}
                onClick={() => alert('Expand me')}
                primaryText={goal.label}
              />
              <LinearProgress mode='determinate' value={this.calcPerc(goal.steps)} />
            </div>
          ))}
        </List>
        <FlatButton
          label='add a step'
          icon={<Add />}
          onClick={() => alert('Add a step')}
          fullWidth={true}
        />
      </Paper>
    );
  }
}

export default GoalsList;
