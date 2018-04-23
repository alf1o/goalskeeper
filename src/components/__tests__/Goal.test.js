import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import { UnwrappedGoal } from '../Goal';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import GoalInfo from '../GoalInfo';
import { LinearProgress } from 'material-ui/Progress';

describe('Goal', () => {
  let props;
  let mountedGoal;

  function mountGoal() {
    if (!mountedGoal) mountedGoal = shallow(<UnwrappedGoal {...props} />);
    return mountedGoal;
  }

  beforeEach(() => {
    props = {
      goal: {
        id: 'goal_0',
        name: 'Test goal 0',
        steps: ['step_1', 'step_2']
      },
      steps: [
        {
          id: 'step_1',
          content: 'test step 1',
          completed: false,
          dateCompleted: null,
          goalId: 'goal_0'
        },
        {
          id: 'step_2',
          content: 'test step 2',
          completed: false,
          dateCompleted: null,
          goalId: 'goal_0'
        }
      ]
    };
    mountedGoal = undefined;
  });

  it('it should always render a `div`', () => {
    expect(mountGoal().find('div').length).toBeGreaterThan(0);
  });
  describe('the rendered `div`', () => {
    let div;
    beforeEach(() => {
      div = mountGoal().find('div').first();
    });

    it('should render a `ListItem`', () => {
      expect(div.find(ListItem).length).toBe(1);
    });
    describe('the rendered `ListItem`', () => {
      let listItem;
      beforeEach(() => {
        listItem = div.find(ListItem);
      });
      it('should receive a `onClick` prop', () => {
        expect(listItem.props().onClick).toBeDefined();
      });
      it('should render a `ListItemIcon`', () => {
        expect(listItem.find(ListItemIcon).length).toBe(1);
      });
      it('should render a `ListItemText`', () => {
        expect(listItem.find(ListItemText).length).toBe(1);
      });
      describe('the rendered `ListItemText`', () => {
        it('should receive a `primary` prop with the value of `goal.name`', () => {
          const listText = listItem.find(ListItemText);
          const actual = mountGoal().instance().props.goal.name;
          expect(listText.props().primary).toEqual(actual);
        });
        it('should receive a `scondary` prop with the value of `goal.dueDate`', () => {
          const listText = listItem.find(ListItemText);
          const actual = 'Due: ' + mountGoal().instance().props.goal.dueDate;
          expect(listText.props().secondary).toEqual(actual);
        });
      });
    });

    it('should render a `LinearProgress`', () => {
      expect(div.find(LinearProgress).length).toBe(1);
    });
    describe('the rendered `LinearProgress`', () => {
      let linearProgress;
      beforeEach(() => {
        linearProgress = div.find(LinearProgress);
      });
      it('should receive a `variant` prop', () => {
        expect(linearProgress.props().variant).toBeDefined();
      });
      it('should receive a `value` prop', () => {
        expect(linearProgress.props().value).toBeDefined();
      });
      describe('the `value` prop', () => {
        it('should equal `state.progress`', () => {
          expect(linearProgress.props().value).toEqual(mountGoal().state().progress);
        });
      });
    });
  });

  it('should call `componentDidMount` once', () => {
    const componentDidMountSpy = jest.spyOn(UnwrappedGoal.prototype, 'componentDidMount');
    mountGoal();
    expect(componentDidMountSpy.mock.calls.length).toBe(1);
  });

  it('should update `state` correctly when `steps` is not empty', () => {
    const steps = mountGoal().instance().props.steps;
    const actual = steps.filter(step => step.completed).length / steps.length * 100;
    expect(mountGoal().state().progress).toBeCloseTo(actual);
  });

  it('should have a `state.expanded` property', () => {
    expect(mountGoal().state().expanded).toBeDefined();
  });

  describe('when `state.expanded` is `false`', () => {
    it('should not render a `GoalInfo`', () => {
      expect(mountGoal().find(GoalInfo).length).toBe(0);
    });
    it('should render an `ArrowDropDown`', () => {
      expect(mountGoal().find(ArrowDropDown).length).toBe(1);
    });
  });

  it('should have an `handleClick` method', () => {
    expect(UnwrappedGoal.prototype.handleClick).toBeDefined();
  });
  describe('`handleClick`', () => {
    let handleClickSpy;
    beforeEach(() => {
      handleClickSpy = jest.spyOn(UnwrappedGoal.prototype, 'handleClick');
    });
    afterEach(() => {
      handleClickSpy.mockClear();
    });
    it('should be called on `ListItem` click', () => {
      mountGoal().find(ListItem).simulate('click');
      expect(handleClickSpy.mock.calls.length).toBe(1);
    });
    it('should toggle `state.expanded`', () => {
      expect(mountGoal().state().expanded).toBe(false);
      mountGoal().find(ListItem).simulate('click');
      expect(mountGoal().state().expanded).toBe(true);
      mountGoal().find(ListItem).simulate('click');
      expect(mountGoal().state().expanded).toBe(false);
    });
  });

  describe('when `state.expanded` is `true`', () => {
    beforeEach(() => {
      mountGoal().setState({ expanded: true });
    });
    it('should render a `GoalInfo`', () => {
      expect(mountGoal().find(GoalInfo).length).toBe(1);
    });
    it('should pass `steps` as prop to the rendered `GoalInfo`', () => {
      const goalInfo = mountGoal().find(GoalInfo);
      expect(goalInfo.props().steps).toBeDefined();
    });
    it('should render an `ArrowDropUp`', () => {
      expect(mountGoal().find(ArrowDropUp).length).toBe(1);
    });
  });

});
