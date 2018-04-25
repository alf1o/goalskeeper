import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Clear from '@material-ui/icons/Clear';
import Done from '@material-ui/icons/Done';
import { connect } from 'react-redux';
import completeStep from '../actions/completeStep';

class Step extends Component {
  static propTypes = {
    step: PropTypes.object.isRequired,
    completeStep: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      completed: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { completed } = this.props.step;
    this.setState({ completed });
  }

  handleClick() {
    const { step, completeStep } = this.props;
    this.setState(oldState => ({ completed: !oldState.completed }));
    completeStep(step.id, !this.state.completed);
  }

  render() {
    const { step } = this.props;
    const { completed } = this.state;
    return (
      <ListItem
        component="button"
        onClick={this.handleClick}
      >
        <Checkbox
          checked={completed}
          disableRipple
          color='primary'
        />
        <ListItemText inset primary={step.content} />
        <ListItemIcon>
          {completed ? <Done /> : <Clear />}
        </ListItemIcon>
      </ListItem>
    );
  }
}

const mapDispatchToProps = {
  completeStep
};

export { Step as UnwrappedStep };
export default connect(null, mapDispatchToProps)(Step);
