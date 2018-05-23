import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import changeNameThunk from '../actions/changeUserName';
import { connect } from 'react-redux';

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    changeUserName: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      editing: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ currentTarget: { value } }) {
    this.setState({ userName: value });
  }

  toggleEdit() {
    this.setState(prevState => ({ editing: !prevState.editing }));
  }

  handleClick() {
    const { user, changeUserName } = this.props;
    const { userName } = this.state;
    changeUserName(user.id, userName);
    this.setState({ userName: '', editing: false });
  }

  render() {
    const { history, user } = this.props;
    const { userName, editing } = this.state;
    return (
      <Card style={{marginTop: '56px'}}>
        <CardHeader
          title={user.name}
          action={
            <IconButton onClick={() => history.goBack()}>
              <ArrowBack />
            </IconButton>
          }
        />
        <CardContent>
          {editing && (
            <TextField
              id="user-name"
              label="Name: "
              margin="normal"
              name="user-name"
              onChange={this.handleChange}
              value={userName}
            />
          )}
          <Typography>Name: {user.name}</Typography>
          <Typography>Joined: {user.dateJoined}</Typography>
          <Typography>Goals Completed: {user.goalsCompleted}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="secondary"
            onClick={this.toggleEdit}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="secondary"
            disabled={!editing || (userName === user.name)}
            onClick={this.handleClick}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const mapDispatchToProps = {
  changeUserName: changeNameThunk
};

export { Profile };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
