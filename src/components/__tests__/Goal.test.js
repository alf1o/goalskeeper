import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import { UnwrappedGoal } from '../Goal';
import { ListItem } from 'material-ui/List';
import GoalInfo from '../GoalInfo';
import ExpansionPanel, { ExpansionPanelSummary } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
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
      ],
      classes: { listItem: {}, linearProgress: {} },
      deleteGoal: jest.fn()
    };
    mountedGoal = undefined;
  });

  it('it should always render a `ListItem`', () => {
    expect(mountGoal().find(ListItem).length).toBe(1);
  });
  describe('the rendered `ListItem`', () => {
    it('should receive a `listItem` `className` prop', () => {
      const listItem = mountGoal().find(ListItem);
      const listItemClassName = mountGoal().instance().props.classes.listItem;
      expect(listItem.props().className).toEqual(listItemClassName);
    });
  });

  it('should render an `ExpansionPanel`', () => {
    expect(mountGoal().find(ExpansionPanel).length).toBe(1);
  });
  describe('the rendered `ExpansionPanel`', () => {
    it('should receive a `onChange` prop', () => {
      const expPanel = mountGoal().find(ExpansionPanel);
      expect(expPanel.props().onChange).toBeDefined();
    });

    it('should receive a `expanded` prop', () => {
      const expPanel = mountGoal().find(ExpansionPanel);
      expect(expPanel.props().expanded).toBeDefined();
    });

    it('should receive an `onChange` prop', () => {
      const expPanel = mountGoal().find(ExpansionPanel);
      expect(expPanel.props().onChange).toBeDefined();
    });
  });

  it('should render an `ExpansionPanelSummary`', () => {
    expect(mountGoal().find(ExpansionPanelSummary).length).toBe(1);
  });

  it('should render 2 `Typography`', () => {
    expect(mountGoal().find(Typography).length).toBe(2);
  });

  describe('the first `Typography`', () => {
    it('should render the goal name', () => {
      const typo = mountGoal().find(Typography).first();
      const goalName = mountGoal().instance().props.goal.name;
      expect(typo.contains(goalName)).toBe(true);
    });
  });

  describe('the second `Typography`', () => {
    it('should render the goal date', () => {
      const typo = mountGoal().find(Typography).last();
      const date = mountGoal().instance().props.goal.dueDate;
      expect(typo.contains('Due: ' + date)).toBe(true);
    });
  });

  it('should render a `LinearProgress`', () => {
    expect(mountGoal().find(LinearProgress).length).toBe(1);
  });
  describe('the rendered `LinearProgress`', () => {
    it('should receive a `linearProgress` `className` prop', () => {
      const linearProgress = mountGoal().find(LinearProgress);
      const linearProgressClassName = mountGoal().instance().props.classes.linearProgress;
      expect(linearProgress.props().className).toEqual(linearProgressClassName);
    });

    it('should receive a `value` prop', () => {
      const linearProgress = mountGoal().find(LinearProgress);
      expect(linearProgress.props().value).toBeDefined();
    });
  });

  it('should have a `calculateProgress` method', () => {
    expect(UnwrappedGoal.prototype.calculateProgress).toBeDefined();
  });
  describe('the `calculateProgress` method', () => {
    const calculateProgressSpy = jest.spyOn(UnwrappedGoal.prototype, 'calculateProgress');
    afterEach(() => {
      calculateProgressSpy.mockClear();
    });

    it('should update `progress` when the `steps` prop changes', () => {
      let steps = mountGoal().instance().props.steps;
      const newStep = {
        id: 'step_3',
        content: 'test step 3',
        completed: true,
        dateCompleted: null,
        goalId: 'goal_0'
      };
      steps = [...steps, newStep];
      mountGoal().setProps({ steps });
      const progress = steps.filter(step => step.completed).length / steps.length * 100;
      let linearProgress = mountGoal().find(LinearProgress);
      expect(linearProgress.props().value).toBe(progress);

      steps = [];
      mountGoal().setProps({ steps });
      linearProgress = mountGoal().find(LinearProgress);
      expect(linearProgress.props().value).toBe(0);

      steps = [
        {
          id: 'step_1',
          content: 'test step 1',
          completed: true,
          dateCompleted: null,
          goalId: 'goal_0'
        },
        {
          id: 'step_2',
          content: 'test step 2',
          completed: true,
          dateCompleted: null,
          goalId: 'goal_0'
        }
      ];
      mountGoal().setProps({ steps });
      linearProgress = mountGoal().find(LinearProgress);
      expect(linearProgress.props().value).toBe(100);
    });
  });

  it('should have a `state.expanded` property', () => {
    expect(mountGoal().state().expanded).toBeDefined();
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

    it('should be called on `ExpansionPanel` change', () => {
      mountGoal().find(ExpansionPanel).simulate('change');
      expect(handleClickSpy.mock.calls.length).toBe(1);
    });

    it('should toggle `state.expanded`', () => {
      expect(mountGoal().state().expanded).toBe(false);

      mountGoal().find(ExpansionPanel).simulate('change');
      expect(mountGoal().state().expanded).toBe(true);

      mountGoal().find(ExpansionPanel).simulate('change');
      expect(mountGoal().state().expanded).toBe(false);
    });
  });

  it('should have an `handleDelete` method', () => {
    expect(UnwrappedGoal.prototype.handleDelete).toBeDefined();
  });
  describe('`handleDelete`', () => {
    it('should dispatch a `DELETE_GOAL` action', () => {
      mountGoal().instance().handleDelete();
      expect(props.deleteGoal.mock.calls.length).toBe(1);
      expect(props.deleteGoal.mock.calls[0][0]).toEqual(props.goal);
    });
  });

  describe('when `state.expanded` is `true`', () => {
    beforeEach(() => {
      mountGoal().setState({ expanded: true });
    });

    it('should pass `steps` as prop to the rendered `GoalInfo`', () => {
      const goalInfo = mountGoal().find(GoalInfo);
      expect(goalInfo.props().steps).toBeDefined();
    });

    it('should pass `handleDelete` to the `Button`', () => {
      const btn = mountGoal().find(Button);
      expect(btn.props().onClick).toBe(mountGoal().instance().handleDelete);
    });
  });

});
