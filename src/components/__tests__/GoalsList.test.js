import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import { UnwrappedGoalsList } from '../GoalsList';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Goal from '../Goal';

describe('GoalsList', () => {
  let props;
  let mountedGoalsList;

  function goalsList() {
    if (!mountedGoalsList) mountedGoalsList = shallow(<UnwrappedGoalsList {...props} />);
    return mountedGoalsList;
  }

  beforeEach(() => {
    props = {
      goals: []
    };
    mountedGoalsList = undefined;
  });

  it('should always render a `Paper`', () => {
    expect(goalsList().find(Paper).length).toBeGreaterThan(0);
  });
  describe('the rendered `Paper`', () => {
    it('should contain everything else', () => {
      expect(goalsList().find(Paper).children()).toEqual(goalsList().children());
    });
  });

  it('should render a `ListSubheader` when `goals.length` is `0`', () => {
    expect(goalsList().find(ListSubheader).length).toBe(1);
  });

  it('should render a `List` when `goals.length` is greater than `0`', () => {
    goalsList().setProps({ goals: [{ id: 'id_0' }] })
    expect(goalsList().find(List).length).toBe(1);
  });
  describe('the rendered `List`', () => {
    describe('should display a `Goal` for each element in `goals`', () => {
      it('should display 1 element for an object of 1 element', () => {
        props = {
          goals: [{
            id: 'goal_0',
            steps: []
          }]
        };
        const goals = goalsList().find(List).find(Goal);
        expect(goals.length).toBe(1);
      });
      it('should display 2 elements for an object of 2 elements', () => {
        props = {
          goals: [{
            id: 'goal_0',
            steps: ['step_1']
          },
          {
            id: 'goal_1',
            steps: ['step_1', 'step_2']
          }]
        };
        const goals = goalsList().find(List).find(Goal);
        expect(goals.length).toBe(2);
      });
    });
  });

});
