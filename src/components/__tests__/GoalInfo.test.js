import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import GoalInfo from '../GoalInfo';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

describe('GoalInfo', () => {
  let props = {};
  let mountedGoalInfo;

  function goalInfo() {
    if (!mountedGoalInfo) mountedGoalInfo = shallow(<GoalInfo {...props} />);
    return mountedGoalInfo;
  }

  beforeEach(() => {
    props = {
      steps: [{ completed: true }, { completed: false }]
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

  it('should always render a `FlatButton`', () => {
    expect(goalInfo().find(FlatButton).length).toBe(1);
  });
  describe('the rendered `FlatButton`', () => {
    let flatBtn;
    beforeEach(() => {
      flatBtn = goalInfo().find(FlatButton);
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
