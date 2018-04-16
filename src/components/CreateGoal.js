import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';

class CreateGoal extends Component {
  static propTypes = {};

  constructor() {
    super();
    this.state = {
      'goal-name': '',
      'due-date': '',
      'first-step': '',
      'description': ''
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
    console.log('create the goal');
    console.log('give feedback');
    console.log('route home');
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{display: 'flex', flexDirection: 'column'}}
      >
        <FormLabel component="legend">Required Fields</FormLabel>
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
          error={false}
          id="due-date"
          label="Complete date: "
          margin="normal"
          name="due-date"
          onChange={evt => this.handleChange(evt, 'due-date')}
          placeholder="Set a completion date"
          required={true}
          value={this.state['due-date']}
        />
        <Divider />
        <FormLabel component="legend">Optional</FormLabel>
        <TextField
          error={false}
          id="first-step"
          label="First step: "
          margin="normal"
          name="first-step"
          onChange={evt => this.handleChange(evt, 'first-step')}
          placeholder="Add the first step for this goal"
          value={this.state['first-step']}
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
          style={{margin: 'auto'}}
          onClick={this.handleClick}
        >
          Create
        </Button>
      </form>
    );
  }
}

export default CreateGoal;
