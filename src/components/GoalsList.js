import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import Goal from './Goal';
// import DateRange from 'material-ui/svg-icons/action/date-range';

class GoalsList extends Component {
  static propTypes = {
    goalsById: PropTypes.object.isRequired
  };

  render() {
    const { goalsById } = this.props;
    return (
      <Paper>
        <List>
          {Object.values(goalsById).map(goal => (
            <Goal
              key={goal.id}
              goal={goal}
            />
          ))}
        </List>
      </Paper>
    );
  }
}

export default GoalsList;
