import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import Step from '../Step';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Clear from '@material-ui/icons/Clear';
import Done from '@material-ui/icons/Done';

describe('Step', () => {
  let props;
  let mountedStep;

  function mountStep() {
    if (!mountedStep) mountedStep = shallow(<Step {...props} />);
    return mountedStep;
  }

  beforeEach(() => {
    props = {
      step: {
        id: '0',
        content: 'Test step',
        completed: false,
        dateCompleted: null
      }
    };
    mountedStep = undefined;
  });

  it('should always render a `ListItem`', () => {
    expect(mountStep().find(ListItem).length).toBeGreaterThan(0);
  });
  describe('the rendered `ListItem`', () => {
    let listItem;
    beforeEach(() => {
      listItem = mountStep().find(ListItem);
    });
    it('should receive a `onClick` prop', () => {
      expect(listItem.props().onClick).toBeDefined();
    });
    it('should render a `Checkbox`', () => {
      expect(listItem.find(Checkbox).length).toBe(1);
    });
    describe('the rendered `Checkbox`', () => {
      it('should receive a `checked` prop', () => {
        const checkbox = listItem.find(Checkbox);
        expect(checkbox.props().checked).toBeDefined();
      });
    });
  });

  it('should have a `state.completed`', () => {
    expect(mountStep().state().completed).toBeDefined();
  });

  it('should call `componentDidMount` once', () => {
    const componentDidMountSpy = jest.spyOn(Step.prototype, 'componentDidMount');
    mountStep();
    expect(componentDidMountSpy.mock.calls.length).toBe(1);
  });

  it('should update the `state` with the value of `step.completed` prop when mounted', () => {
    mountStep();
    expect(mountStep().state().completed).toEqual(mountStep().instance().props.step.completed);
  });

  describe('when `state.completed` is `false`', () => {
    beforeEach(() => {
      mountStep().setState({ completed: false });
    });
    it('should pass `false` as the `checked` value of the `Checkbox`', () => {
      const checkbox = mountStep().find(Checkbox);
      expect(checkbox.props().checked).toBe(false);
    });
    it('should render a `Clear` icon inside `ListItem`', () => {
      const clear = mountStep().find(ListItem).find(Clear);
      expect(clear.length).toBe(1);
    });
    it('should not render a `Done` icon inside `ListItem`', () => {
      const doneIcon = mountStep().find(ListItem).find(Done);
      expect(doneIcon.length).toBe(0);
    });
  });

  describe('when `state.completed` is `true`', () => {
    beforeEach(() => {
      mountStep().setState({ completed: true });
    });
    it('should pass `true` as the `checked` value of the `Checkbox`', () => {
      const checkbox = mountStep().find(Checkbox);
      expect(checkbox.props().checked).toBe(true);
    });
    it('should render a `Done` icon inside `ListItem`', () => {
      const doneIcon = mountStep().find(ListItem).find(Done);
      expect(doneIcon.length).toBe(1);
    });
    it('should not render a `Clear` icon inside `ListItem`', () => {
      const clear = mountStep().find(ListItem).find(Clear);
      expect(clear.length).toBe(0);
    });
  });

  it('should have an `handleClick` method', () => {
    expect(Step.prototype.handleClick).toBeDefined();
  });
  describe('`handleClick`', () => {
    let handleClickSpy;
    beforeEach(() => {
      handleClickSpy = jest.spyOn(Step.prototype, 'handleClick');
    });
    afterEach(() => {
      handleClickSpy.mockClear();
    });
    it('should be called on `ListItem` click', () => {
      const listItem = mountStep().find(ListItem);
      listItem.simulate('click');
      expect(handleClickSpy.mock.calls.length).toBe(1);
    });
    it('should flip the value of `state.completed`', () => {
      const listItem = mountStep().find(ListItem);
      let completedState = mountStep().state().completed;
      listItem.simulate('click');
      expect(mountStep().state().completed).toBe(!completedState);
      listItem.simulate('click');
      expect(mountStep().state().completed).toBe(completedState);
    });
  });

});
