import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Routes from '../Routes';
import GoalsList from '../GoalsList';
import CreateGoal from '../CreateGoal';
import Profile from '../Profile';
import NotFound from '../NotFound';
import { Provider } from 'react-redux';
import store from '../../store';

describe('Routes', () => {
  it('should render a `GoalsList` at the default path', () => {
    const routes = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Routes />
        </MemoryRouter>
      </Provider>
    );
    expect(routes.find(GoalsList).length).toBe(1);
    expect(routes.find(CreateGoal).length).toBe(0);
    expect(routes.find(Profile).length).toBe(0);
    expect(routes.find(NotFound).length).toBe(0);
  });

  it('should render a `CreateGoal` at the `/creategoal` path', () => {
    const routes = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/creategoal']}>
          <Routes />
        </MemoryRouter>
      </Provider>
    );
    expect(routes.find(GoalsList).length).toBe(0);
    expect(routes.find(CreateGoal).length).toBe(1);
    expect(routes.find(Profile).length).toBe(0);
    expect(routes.find(NotFound).length).toBe(0);
  });

  it('should render a `Profile` at the `/profile` path', () => {
    const routes = mount(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes />
      </MemoryRouter>
    );
    expect(routes.find(GoalsList).length).toBe(0);
    expect(routes.find(CreateGoal).length).toBe(0);
    expect(routes.find(Profile).length).toBe(1); // TODO
    expect(routes.find(NotFound).length).toBe(0);
  });

  it('should render a `NotFound` at any unknow path', () => {
    const routes = mount(
      <MemoryRouter initialEntries={['/unknown']}>
        <Routes />
      </MemoryRouter>
    );
    expect(routes.find(GoalsList).length).toBe(0);
    expect(routes.find(CreateGoal).length).toBe(0);
    expect(routes.find(Profile).length).toBe(0);
    expect(routes.find(NotFound).length).toBe(1);
  });

});
