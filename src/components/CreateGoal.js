import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import createGoalThunk from '../actions/createGoal';
import uniqid from 'uniqid';
import { withStyles } from 'material-ui/styles';

const styles = {
  container: {
    marginTop: '56px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '5%'
  },
  btnCreate: {
    margin: 'auto'
  }
};

class CreateGoal extends Component {
  static propTypes = {
    createGoal: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      'goal-name': '',
      'due-date': '',
      'description': '',
      toHome: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
  }

  handleChange(evt, name) {
    this.setState({ [name]: evt.target.value });
  }

  handleClick() {
    const { createGoal } = this.props;
    const [ id, name, desc ] = [
      uniqid('goal-'),
      this.state['goal-name'],
      this.state['description']
    ];
    const date = this.state['due-date'].split('-').reverse().join('/');
    createGoal(id, name, date, desc);
    this.setState({
      'goal-name': '',
      'due-date': '',
      'description': '',
      toHome: true
    });
  }

  render() {
    const { classes } = this.props;
    return this.state.toHome
    ? <Redirect to="/" />
    : (
      <Paper className={classes.container}>
        <form
          onSubmit={this.handleSubmit}
          className={classes.form}
        >
          <TextField
            autoFocus={true}
            error={false}
            id="goal-name"
            label="Name: "
            margin="normal"
            name="goal-name"
            onChange={evt => this.handleChange(evt, 'goal-name')}
            placeholder="Your goal"
            required={true}
            value={this.state['goal-name']}
          />
          <TextField
            type="date"
            error={false}
            id="due-date"
            InputLabelProps={{ shrink: true }}
            label="Complete date: "
            margin="normal"
            name="due-date"
            onChange={evt => this.handleChange(evt, 'due-date')}
            required={true}
            value={this.state['due-date']}
          />
          <TextField
            error={false}
            id="description"
            label="Description: "
            margin="normal"
            multiline={true}
            name="description"
            onChange={evt => this.handleChange(evt, 'description')}
            placeholder="Why do you want to achieve this goal?"
            rowsMax={4}
            value={this.state['description']}
          />
          <Button
            variant="raised"
            color="primary"
            className={classes.btnCreate}
            onClick={this.handleClick}
            disabled={!(this.state['goal-name'] && this.state['due-date'])}
          >
            Create
          </Button>
        </form>
      </Paper>
    );
  }
}

const mapDispatchToProps = {
  createGoal: createGoalThunk
};

export { CreateGoal as UnwrappedCreateGoal };
export default withStyles(styles)(connect(null, mapDispatchToProps)(CreateGoal));
