import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import GoalsList from '../GoalsList';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import Goal from '../Goal';
import FlatButton from 'material-ui/FlatButton';

describe('GoalsList', () => {
  let props;
  let mountedGoalsList;

  function goalsList() {
    if (!mountedGoalsList) mountedGoalsList = shallow(<GoalsList {...props} />);
    return mountedGoalsList;
  }

  beforeEach(() => {
    props = {
      goalsById: {}
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

  it('should always render a `List`', () => {
    expect(goalsList().find(List).length).toBe(1);
  });
  describe('the rendered `List`', () => {
    describe('should display a `Goal` for each element in `goalsById`', () => {
      it('should display 0 elements for an empty object', () => {
        const goals = goalsList().find(List).find(Goal);
        expect(goals.length).toBe(0);
      });
      it('should display 1 element for an object of 1 element', () => {
        props = {
          goalsById: {
            'goal_0': {
              id: 'goal_0',
              steps: []
            }
          }
        };
        const goals = goalsList().find(List).find(Goal);
        expect(goals.length).toBe(1);
      });
      it('should display 2 elements for an object of 2 elements', () => {
        props = {
          goalsById: {
            'goal_0': {
              id: 'goal_0',
              steps: [{ completed: false }]
            },
            'goal_1': {
              id: 'goal_1',
              steps: [{ completed: true }, { completed: false }]
            }
          }
        };
        const goals = goalsList().find(List).find(Goal);
        expect(goals.length).toBe(2);
      });
    });
  });

  it('should always render a `FlatButton`', () => {
    expect(goalsList().find(FlatButton).length).toBe(1);
  });
  describe('the rendered `FlatButton`', () => {
    let flatBtn;
    beforeEach(() => {
      flatBtn = goalsList().find(FlatButton);
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

});
