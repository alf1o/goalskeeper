import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List';
// import ListSubheader from 'material-ui/List/ListSubheader';
import Goal from './Goal';
// import DateRange from 'material-ui/icons/DateRange';

class GoalsList extends Component {
  static propTypes = {
    goalsById: PropTypes.object.isRequired
  };

  render() {
    const { goalsById } = this.props;
    const goalsList = Object.values(goalsById);
    return (
      <Paper style={{marginTop: '56px'}}>
        {/*<ListSubheader>{goalsList.length ? 'Your Goals' : `No goals yet? Let's add one!`}</ListSubheader>*/}
        <List component="ul" style={{ marginTop: 56 }}>
          {goalsList.map(goal => (
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
