import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import GoalsList from './GoalsList';
import CreateGoal from './CreateGoal';
import Profile from './Profile';

const Routes = ({ goalsById }) => (
  <Switch>
    <Route exact={true} path="/" render={() => <GoalsList goalsById={goalsById} />} />
    <Route path="/creategoal" component={CreateGoal} />
    <Route path="/profile" component={Profile} />
  </Switch>
);

Routes.propTypes = {
  goalsById: PropTypes.object.isRequired
};

export default Routes;
