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
import AddStepModal from '../AddStepModal';

describe('GoalInfo', () => {
  let props = {};
  let mountedGoalInfo;

  function goalInfo() {
    if (!mountedGoalInfo) mountedGoalInfo = shallow(<GoalInfo {...props} />);
    return mountedGoalInfo;
  }

  beforeEach(() => {
    props = {
      steps: [{ completed: true, id: '0' }, { completed: false, id: '1' }],
      goalId: 'id_0'
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

  it('should have an `state.modalOpen` property', () => {
    expect(goalInfo().state().modalOpen).toBeDefined();
  });

  it('should have an `handleModalOpen` method', () => {
    expect(GoalInfo.prototype.handleModalOpen).toBeDefined();
  });
  describe('the `handleModalOpen` method', () => {
    const handleModalOpenSpy = jest.spyOn(GoalInfo.prototype, 'handleModalOpen');
    afterEach(() => {
      handleModalOpenSpy.mockClear();
    });

    it('should be called on `Button` click', () => {
      expect(handleModalOpenSpy.mock.calls.length).toBe(0);

      const btn = goalInfo().find(Button);
      btn.simulate('click');
      expect(handleModalOpenSpy.mock.calls.length).toBe(1);
    });

    it('should set `state.modalOpen` to `true`', () => {
      expect(goalInfo().state().modalOpen).toBe(false);

      const btn = goalInfo().find(Button);
      btn.simulate('click');
      expect(goalInfo().state().modalOpen).toBe(true);
    });
  });

  it('should have an `handleModalClose` method', () => {
    expect(GoalInfo.prototype.handleModalClose).toBeDefined();
  });
  describe('the `handleModalClose` method', () => {
    const handleModalCloseSpy = jest.spyOn(GoalInfo.prototype, 'handleModalClose');
    afterEach(() => {
      handleModalCloseSpy.mockClear();
    });

    it('should set `state.modalOpen` to `false`', () => {
      goalInfo().setState({ modalOpen: true });
      goalInfo().instance().handleModalClose();
      expect(goalInfo().state().modalOpen).toBe(false);
    });
  });

});
