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

describe('Routes', () => {
  it('should render a `GoalsList` at the default path', () => {
    const routes = mount(<MemoryRouter><Routes goalsById={{}} /></MemoryRouter>);
    expect(routes.find(GoalsList).length).toBe(1);
    expect(routes.find(CreateGoal).length).toBe(0);
    expect(routes.find(Profile).length).toBe(0);
  });

  it('should render a `CreateGoal` at the `/creategoal` path', () => {
    const routes = mount(
      <MemoryRouter initialEntries={['/creategoal']}>
        <Routes goalsById={{}} />
      </MemoryRouter>
    );
    expect(routes.find(GoalsList).length).toBe(0);
    expect(routes.find(CreateGoal).length).toBe(1);
    expect(routes.find(Profile).length).toBe(0);
  });

  it('should render a `Profile` at the `/profile` path', () => {
    const routes = mount(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes goalsById={{}} />
      </MemoryRouter>
    );
    expect(routes.find(GoalsList).length).toBe(0);
    expect(routes.find(CreateGoal).length).toBe(0);
    expect(routes.find(Profile).length).toBe(1);
  });

});