import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import GoalsList from './GoalsList';
import CreateGoal from './CreateGoal';
import Profile from './Profile';
import NotFound from './NotFound';

const Routes = () => (
  <Switch>
    <Route exact={true} path="/" component={GoalsList} />
    <Route path="/creategoal" component={CreateGoal} />
    <Route path="/profile" component={Profile} />
    <Route component={NotFound} />
  </Switch>
);

Routes.propTypes = {};

export default Routes;
