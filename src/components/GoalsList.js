import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List';
import Goal from './Goal';
// import DateRange from 'material-ui/icons/DateRange';

class GoalsList extends Component {
  static propTypes = {
    goalsById: PropTypes.object.isRequired
  };

  render() {
    const { goalsById } = this.props;
    return (
      <Paper>
        <List component="ul" style={{ marginTop: 56 }}>
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
