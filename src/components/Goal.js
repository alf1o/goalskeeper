import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import LinearProgress from 'material-ui/LinearProgress';
import FlatButton from 'material-ui/FlatButton';
import Add from 'material-ui/svg-icons/content/add';

class Goal extends Component {
  static propTypes = {
    goal: PropTypes.object.isRequired
  };

  render() {
    const { goal } = this.props
    return (
      <div>
        <ListItem
          leftIcon={<ArrowDropDown />}
          onClick={() => alert('Expand me')}
          primaryText={goal.label}
        />
        <LinearProgress mode='determinate' />
        <FlatButton
          label='add a step'
          icon={<Add />}
          onClick={() => alert('Add a step')}
          fullWidth={true}
        />
      </div>
    );
  }
}

export default Goal;
/*value={this.calcPerc(goal.steps)}*/
