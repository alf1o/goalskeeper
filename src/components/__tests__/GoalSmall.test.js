import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import GoalSmall from '../GoalSmall';
import { ListItem } from 'material-ui/List';
import LinearProgress from 'material-ui/LinearProgress';
import FlatButton from 'material-ui/FlatButton';

describe('GoalSmall', () => {
  let props;
  let mountedGoalSmall;

  function goalSmall() {
    if (!mountedGoalSmall) mountedGoalSmall = shallow(<GoalSmall {...props} />);
    return mountedGoalSmall;
  }

  beforeEach(() => {
    props = {
      goal: {
        id: 'goal_0',
        label: 'Test goal 0',
        steps: [{ completed: true }, { completed: true }]
      }
    };
    mountedGoalSmall = undefined;
  });

  it('it should always render a `div`', () => {
    expect(goalSmall().find('div').length).toBeGreaterThan(0);
  });
  describe('the rendered `div`', () => {
    let div;
    beforeEach(() => {
      props = {
        goal: {
          id: 'goal_0',
          label: 'Test goal 0',
          steps: [{ completed: true }, { completed: true }]
        }
      };
      div = goalSmall().find('div').first();
    });

    it('should render a `ListItem`', () => {
      expect(div.find(ListItem).length).toBe(1);
    });
    describe('the rendered `ListItem`', () => {
      let listItem;
      beforeEach(() => {
        listItem = div.find(ListItem);
      });
      it('should receive a `leftIcon` prop', () => {
        expect(listItem.props().leftIcon).toBeDefined();
      });
      it('should receive a `onClick` prop', () => {
        expect(listItem.props().onClick).toBeDefined();
      });
      it('should receive a `primaryText` prop', () => {
        expect(listItem.props().primaryText).toBeDefined();
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
      it('should receive a `mode` prop', () => {
        expect(linearProgress.props().mode).toBeDefined();
      });
      it('should receive a `value` prop', () => {
        expect(linearProgress.props().value).toBeDefined();
      });
      describe('the `value` prop', () => {
        it('should equal `state.progress`', () => {
          expect(linearProgress.props().value).toEqual(goalSmall().state().progress);
        });
      });
    });
  });

  it('should always render a `FlatButton`', () => {
    expect(goalSmall().find(FlatButton).length).toBe(1);
  });
  describe('the rendered `FlatButton`', () => {
    let flatBtn;
    beforeEach(() => {
      flatBtn = goalSmall().find(FlatButton);
    });
    it('should receive a `label` prop', () => {
      expect(flatBtn.props().label).toBeDefined();
    });
    it('should receive a `icon` prop', () => {
      expect(flatBtn.props().icon).toBeDefined();
    });
    it('should receive a `onClick` prop', () => {
      expect(flatBtn.props().onClick).toBeDefined();
    });
    it('should receive a `fullWidth` prop', () => {
      expect(flatBtn.props().fullWidth).toBeDefined();
    });
  });

  it('should call `componentDidMount` once', () => {
    const componentDidMountSpy = jest.spyOn(GoalSmall.prototype, 'componentDidMount');
    goalSmall();
    expect(componentDidMountSpy.mock.calls.length).toBe(1);
  });

  it('should update `state` correctly when `goal.steps` is not empty', () => {
    props = {
      goal: {
        id: 'goal_0',
        label: 'Test goal 0',
        steps: [{ completed: true }, { completed: true }, { completed: false}]
      }
    };
    const { steps } = props.goal;
    const actual = steps.filter(step => step.completed).length / steps.length * 100;
    expect(goalSmall().state().progress).toBeCloseTo(actual);
  });

});
