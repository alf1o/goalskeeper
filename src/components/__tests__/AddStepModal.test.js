import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import { UnwrappedAddStepModal } from '../AddStepModal';
import Modal from 'material-ui/Modal';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Card from 'material-ui/Card';
import { Redirect } from 'react-router-dom';
import uniqid from 'uniqid';

describe('`AddStepModal`', () => {
  let props;
  let mountedAddStepModal;

  function addStepModal() {
    if (!mountedAddStepModal) mountedAddStepModal = shallow(<UnwrappedAddStepModal {...props} />);
    return mountedAddStepModal;
  }

  beforeEach(() => {
    props = {
      goalId: 'id_0',
      open: false,
      onClose: jest.fn(),
      addStep: jest.fn()
    };
    mountedAddStepModal = undefined;
  });

  it('should render a `Modal`', () => {
    expect(addStepModal().find(Modal).length).toBe(1);
  });
  describe('the rendered `Modal`', () => {
    it('should contain everything else', () => {
      const modal = addStepModal().find(Modal);
      expect(addStepModal().children()).toEqual(modal.children());
    });

    it('should receive an `open` prop', () => {
      const modal = addStepModal().find(Modal);
      expect(modal.props().open).toBeDefined();
    });

    it('should receive an `onClose` prop', () => {
      const modal = addStepModal().find(Modal);
      expect(modal.props().onClose).toBeDefined();
    });
  });

  it('should contain a `Paper`', () => {
    expect(addStepModal().find(Paper).length).toBe(1);
  });

  it('should contain a `Typography`', () => {
    expect(addStepModal().find(Typography).length).toBe(1);
  });

  it('should contain a `TextField`', () => {
    expect(addStepModal().find(TextField).length).toBe(1);
  });
  describe('the rendered `TextField`', () => {
    it('should receive an `onChange` prop', () => {
      const textField = addStepModal().find(TextField);
      expect(textField.props().onChange).toBeDefined();
    });

    it('should receive a `value` prop', () => {
      const textField = addStepModal().find(TextField);
      expect(textField.props().value).toBeDefined();
    });
  });

  it('should contain a `Button`', () => {
    expect(addStepModal().find(Button).length).toBe(1);
  });
  describe('the rendered `Button`', () => {
    it('should receive an `onClick` prop', () => {
      const btn = addStepModal().find(Button);
      expect(btn.props().onClick).toBeDefined();
    });
  });

  it('should have a `state.content` property', () => {
    expect(addStepModal().state().content).toBeDefined();
  });
  describe('when `state.content` is empty', () => {
    it('should disable the `Button`', () => {
      const btn = addStepModal().find(Button);
      expect(btn.props().disabled).toBe(true);
    });
  });
  describe('when `state.content` is not empty', () => {
    beforeEach(() => {
      addStepModal().setState({ content: 'test' });
    });

    it('should enable the `Button`', () => {
      const btn = addStepModal().find(Button);
      expect(btn.props().disabled).toBe(false);
    });
  });

  it('should have a `state.toHome` property', () => {
    expect(addStepModal().state().toHome).toBeDefined();
  });
  describe('when `state.toHome` is `true`', () => {
    beforeEach(() => {
      addStepModal().setState({ toHome: true });
    });

    it('should render a `Redirect` to `'/'`', () => {
      const content = <Redirect to="/" />;
      expect(addStepModal().contains(content)).toBe(true);
    });
  });

  it('should have an `handleChange` method', () => {
    expect(UnwrappedAddStepModal.prototype.handleChange).toBeDefined();
  });
  describe('the `handleChange` method', () => {
    const handleChangeSpy = jest.spyOn(UnwrappedAddStepModal.prototype, 'handleChange');
    afterEach(() => {
      handleChangeSpy.mockClear();
    });

    it('should be called on `TextField` change', () => {
      const textField = addStepModal().find(TextField);
      textField.simulate('change', { target: {value: ''} });
      expect(handleChangeSpy.mock.calls.length).toBe(1);
    });

    it('should change `state.content`', () => {
      expect(addStepModal().state().content).toBe('');

      const textField = addStepModal().find(TextField);
      textField.simulate('change', { target: {value: 'test'} });
      expect(addStepModal().state().content).toBe('test');
    });
  });

  it('should have an `handleClick` method', () => {
    expect(UnwrappedAddStepModal.prototype.handleClick).toBeDefined();
  });
  describe('the `handleClick` method', () => {
    const handleClickSpy = jest.spyOn(UnwrappedAddStepModal.prototype, 'handleClick');
    afterEach(() => {
      handleClickSpy.mockClear();
    });

    it('should be called on `Button` click', () => {
      const btn = addStepModal().find(Button);
      btn.simulate('click');
      expect(handleClickSpy.mock.calls.length).toBe(1);
    });

    it('should dispatch an `ADD_STEP` action', () => {
      const btn = addStepModal().find(Button);
      btn.simulate('click');
      const addStepSpy = addStepModal().instance().props.addStep;
      expect(addStepSpy.mock.calls.length).toBe(1);

      const goalId = addStepModal().instance().props.goalId;
      const content = addStepModal().state().content;
      expect(addStepSpy.mock.calls[0][0]).toEqual(goalId);
      expect(addStepSpy.mock.calls[0][2]).toEqual(content);
    });

    it('should set `state.toHome` to `true`', () => {
      const btn = addStepModal().find(Button);
      btn.simulate('click');
      expect(addStepModal().state().toHome).toBe(true);
    });
  });

});
