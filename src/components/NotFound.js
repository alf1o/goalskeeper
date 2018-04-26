import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Paper>
    <div>
      <Typography
        variant="display3"
      >
        404
      </Typography>
    </div>
    <Typography
      variant="subheading"
    >
      Sorry there is no such page.
      You might want to
    </Typography>
    <Button
      component={Link}
      to="/"
      color="primary"
    >
      go back home
    </Button>
  </Paper>
);

export default NotFound;
