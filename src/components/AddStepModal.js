import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'material-ui/Modal';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import addStep from '../actions/addStep';
import uniqid from 'uniqid';

class AddStepModal extends Component {
  static propTypes = {
    goalId: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    addStep: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      content: '',
      toHome: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(evt) {
    this.setState({ content: evt.target.value });
  }

  handleClick() {
    const { goalId, addStep } = this.props;
    const { content } = this.state;
    addStep(goalId, uniqid('step-'), content);
    // close the modal
    this.setState({ toHome: true });
  }

  render() {
    const { content, toHome } = this.state;
    const { open, onClose } = this.props;
    return toHome
    ? <Redirect to="/" />
    : (
      <Modal
        aria-labelledby="add-step-modal"
        aria-describedby="add a new step for a specific goal"
        open={open}
        onClose={onClose}
      >
        <Paper>
          <Typography variant="title">Add a new step</Typography>
          <TextField
            autoFocus={true}
            error={false}
            id="add-step"
            label="Content: "
            margin="normal"
            name="add-step"
            onChange={this.handleChange}
            placeholder="A journey of a thousand miles starts with the first step"
            required={true}
            value={content}
          />
          <Button
            variant="raised"
            color="primary"
            style={{margin: 'auto'}}
            onClick={this.handleClick}
            disabled={!content}
          >
            Add
          </Button>
        </Paper>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  addStep
};

export { AddStepModal as UnwrappedAddStepModal };
export default connect(null, mapDispatchToProps)(AddStepModal);
