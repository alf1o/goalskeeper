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

describe('`AddStepModal`', () => {
  let props;
  let mountedAddStepModal;

  function addStepModal() {
    if (!mountedAddStepModal) mountedAddStepModal = shallow(<UnwrappedAddStepModal {...props} />);
    return mountedAddStepModal;
  }

  beforeEach(() => {
    props = {
      open: false,
      onClose: jest.fn()
    };
    mountedAddStepModal = undefined;
  });

  it('should always render a `Modal`', () => {
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
  // handleClick

});
