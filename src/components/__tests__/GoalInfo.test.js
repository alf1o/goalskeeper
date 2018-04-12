import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import GoalInfo from '../GoalInfo';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List';
import Step from '../Step';
import Button from 'material-ui/Button';

describe('GoalInfo', () => {
  let props = {};
  let mountedGoalInfo;

  function goalInfo() {
    if (!mountedGoalInfo) mountedGoalInfo = shallow(<GoalInfo {...props} />);
    return mountedGoalInfo;
  }

  beforeEach(() => {
    props = {
      steps: [{ completed: true, id: '0' }, { completed: false, id: '1' }]
    };
    mountedGoalInfo = undefined;
  });

  it('should always render a `Paper`', () => {
    expect(goalInfo().find(Paper).length).toBe(1);
  });
  describe('the rendered `Paper`', () => {
    it('should contain everything else', () => {
      const paper = goalInfo().find(Paper);
      expect(paper.children()).toEqual(goalInfo().children());
    });
  });

  it('should always render a `List`', () => {
    expect(goalInfo().find(List).length).toBe(1);
  });

  it('should render as many `Step`s as `steps.length`', () => {
    goalInfo().setProps({ steps: [] });
    expect(goalInfo().find(Step).length).toBe(0);
    goalInfo().setProps({ steps: [{completed: true, id: '0'}] });
    expect(goalInfo().find(Step).length).toBe(1);
    goalInfo().setProps({ steps: [{completed: true, id: '0'}, {completed: false, id: '1'}] });
    expect(goalInfo().find(Step).length).toBe(2);
  });

  it('should always render a `Button`', () => {
    expect(goalInfo().find(Button).length).toBe(1);
  });
  describe('the rendered `Button`', () => {
    let flatBtn;
    beforeEach(() => {
      flatBtn = goalInfo().find(Button);
    });
    it('should receive a `onClick` prop', () => {
      expect(flatBtn.props().onClick).toBeDefined();
    });
  });

});
