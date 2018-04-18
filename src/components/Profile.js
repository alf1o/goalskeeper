import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Typography from 'material-ui/Typography';

class Profile extends Component {
  static propTypes = {
    /* will receive a user */
  };

  render() {
    return (
      <Card>
        <CardHeader
          action={
            <IconButton>
              <ArrowBack />
            </IconButton>
          }
        />
        <CardContent>
          <Typography>Name: </Typography>
          <Typography>Joined: </Typography>
          <Typography>Goals Completed: </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default Profile;
