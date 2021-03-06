import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Goal from './Goal';
// import DateRange from '@material-ui/icons/DateRange';
import { connect } from 'react-redux';

const GoalsList = ({ goals }) => (
  <Paper style={{marginTop: '56px'}}>
    {goals.length
      ? (
        <List component="ul" style={{ marginTop: 56 }}>
          {goals.map(goal => (
            <Goal
              key={goal.id}
              goal={goal}
            />
          ))}
        </List>
      )
      : <ListSubheader>No goals yet? <br /> Click the button at the bottom to add one!</ListSubheader>
    }
  </Paper>
);

GoalsList.propTypes = {
  goals: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    goals: state.goals.map(goalId => state.goalsById[goalId])
  };
}

export { GoalsList as UnwrappedGoalsList };
export default connect(mapStateToProps)(GoalsList);
