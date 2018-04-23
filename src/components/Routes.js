import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import GoalsList from './GoalsList';
import CreateGoal from './CreateGoal';
import Profile from './Profile';

const Routes = () => (
  <Switch>
    <Route exact={true} path="/" component={GoalsList} />
    <Route path="/creategoal" component={CreateGoal} />
    <Route path="/profile" component={Profile} />
  </Switch>
);

Routes.propTypes = {};

export default Routes;
