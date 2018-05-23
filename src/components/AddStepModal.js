import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'material-ui/Modal';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import addStepThunk from '../actions/addStep';
import uniqid from 'uniqid';

const styles = theme => ({
  paper: {
    width: '70vw',
    height: '50vh',
    transform: 'translate(15vw, 25vh)',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    display: 'flex',
    'flex-direction': 'column'
  }
});

class AddStepModal extends Component {
  static propTypes = {
    goalId: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    addStep: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      content: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(evt) {
    this.setState({ content: evt.target.value });
  }

  handleClick() {
    const { goalId, addStep, onClose } = this.props;
    const { content } = this.state;
    addStep(goalId, uniqid('step-'), content);
    onClose();
    this.setState({ content: '' });
  }

  render() {
    const { content } = this.state;
    const { open, onClose, classes } = this.props;
    return (
      <Modal
        aria-labelledby="add-step-modal"
        aria-describedby="add a new step for a specific goal"
        open={open}
        onClose={onClose}
      >
        <Paper className={classes.paper}>
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
            multiline={true}
            rows={3}
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
  addStep: addStepThunk
};

export { AddStepModal as UnwrappedAddStepModal };
export default withStyles(styles)(connect(null, mapDispatchToProps)(AddStepModal));
