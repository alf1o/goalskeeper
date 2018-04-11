import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import Goal from '../Goal';
import GoalSmall from '../GoalSmall';

describe('Goal', () => {
  let props;
  let mountedGoal;

  function mountGoal() {
    if (!mountedGoal) mountedGoal = shallow(<Goal {...props} />);
    return mountedGoal;
  }

  beforeEach(() => {
    props = {
      goal: {
        id: 'goal_0',
        label: 'Test goal 0',
        steps: [{ completed: true }, { completed: true }]
      }
    };
    mountedGoal = undefined;
  });

  it('should have a `state.expanded` property', () => {
    expect(mountGoal().state().expanded).toBeDefined();
  });

  describe('when `state.expanded` is `false`', () => {
    it('should rended a `GoalSmall`', () => {
      expect(mountGoal().find(GoalSmall).length).toBe(1);
    });

    it('should pass `goal` as prop to the rendered `GoalSmall`', () => {
      const goalSmall = mountGoal().find(GoalSmall);
      expect(goalSmall.props().goal).toMatchObject(mountGoal().props().goal);
    });
  });

});
