import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Add from 'material-ui/svg-icons/content/add';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
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
            <ListItem
              key={goal.id}
              leftIcon={<ArrowDropDown />}
              onClick={() => alert('Expand me')}
              primaryText={goal.label}
            />
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
