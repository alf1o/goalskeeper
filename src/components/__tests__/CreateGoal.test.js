import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import { UnwrappedCreateGoal } from '../CreateGoal';
import { FormLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';

describe('CrateGoal', () => {
  let props;
  let mountedCreateGoal;

  function createGoal() {
    if (!mountedCreateGoal) mountedCreateGoal = shallow(<UnwrappedCreateGoal {...props} />);
    return mountedCreateGoal;
  }

  beforeEach(() => {
    props = {};
    mountedCreateGoal = undefined;
  });

  it('should always render a `form`', () => {
    const form = createGoal().find('form');
    expect(form.length).toBe(1);
  });
  describe('the rendered `form`', () => {
    it('should contain everything else', () => {
      const form = createGoal().find('form');
      expect(form.children()).toEqual(createGoal().children());
    });
    it('should receive an `onSubmit` prop', () => {
      const form = createGoal().find('form');
      expect(form.props().onSubmit).toBeDefined();
    });
  });

  it('should render 2 `FormLabel`s', () => {
    const formLabels = createGoal().find(FormLabel);
    expect(formLabels.length).toBe(2);
  });

  it('should have an `handleSubmit` method', () => {
    expect(UnwrappedCreateGoal.prototype.handleSubmit).toBeDefined();
  });
  describe('the `handleSubmit` method', () => {
    const handleSubmitSpy = jest.spyOn(UnwrappedCreateGoal.prototype, 'handleSubmit');
    afterEach(() => {
      handleSubmitSpy.mockClear();
    });

    it('should be called when the `form` is submitted', () => {
      const form = createGoal().find('form');
      form.simulate('submit', { preventDefault: jest.fn() });
      expect(handleSubmitSpy.mock.calls.length).toBe(1);
    });
  });

  it('should render 3 `TextField`s', () => {
    const textFields = createGoal().find(TextField);
    expect(textFields.length).toBe(3);
  });
  describe('the rendered `TextField`s', () => {
    it('should receive an `error` prop', () => {
      const textFields = createGoal().find(TextField);
      expect(textFields.every('[error=false]')).toBe(true);
    });

    it('should receive an `onChange` prop', () => {
      const textFields = createGoal().find(TextField);
      expect(textFields.every('[onChange]')).toBe(true);
    });

    it('should receive a `value` prop', () => {
      const textFields = createGoal().find(TextField);
      expect(textFields.every('[value]')).toBe(true);
    });
  });

  it('should render a `Divider`', () => {
    const divider = createGoal().find(Divider);
    expect(divider.length).toBe(1);
  });

  it('should render a `Button`', () => {
    const btn = createGoal().find(Button);
    expect(btn.length).toBe(1);
  });
  describe('the rendered `Button`', () => {
    it('should have an `onClick` prop', () => {
      const btn = createGoal().find(Button);
      expect(btn.props().onClick).toBeDefined();
    });
    it('should have a `disabled` prop', () => {
      const btn = createGoal().find(Button);
      expect(btn.props().disabled).toBeDefined();
    });
    describe('the `disabled` prop', () => {
      it('should be set to `true` when one of the required input fields is empty', () => {
        let state = {
          'goal-name': '',
          'due-date': '',
          'description': ''
        };
        createGoal().setState(state);
        let btn = createGoal().find(Button);
        expect(btn.props().disabled).toBe(true);

        state = {
          'goal-name': 'test',
          'due-date': '',
          'description': ''
        };
        createGoal().setState(state);
        btn = createGoal().find(Button);
        expect(btn.props().disabled).toBe(true);

        state = {
          'goal-name': '',
          'due-date': 'test',
          'description': ''
        };
        createGoal().setState(state);
        btn = createGoal().find(Button);
        expect(btn.props().disabled).toBe(true);
      });
      it('should be set to `false` when the required input fields are not empty', () => {
        const state = {
          'goal-name': 'test',
          'due-date': 'test',
          'description': ''
        };
        createGoal().setState(state);
        const btn = createGoal().find(Button);
        expect(btn.props().disabled).toBe(false);
      });
    });
  });

  it(`should have a state['goal-name'] property`, () => {
    const goalName = createGoal().state()['goal-name'];
    expect(goalName).toBeDefined();
  });
  it(`should have a state['due-date'] property`, () => {
    const dueDate = createGoal().state()['due-date'];
    expect(dueDate).toBeDefined();
  });
  it(`should have a state['description'] property`, () => {
    const desc = createGoal().state()['description'];
    expect(desc).toBeDefined();
  });

  it('should have an `handleChange` method', () => {
    expect(UnwrappedCreateGoal.prototype.handleChange).toBeDefined();
    const handleChangeSpy = jest.spyOn(UnwrappedCreateGoal.prototype, 'handleChange');
  });
  describe('the `handleChange` method', () => {
    const handleChangeSpy = jest.spyOn(UnwrappedCreateGoal.prototype, 'handleChange');
    afterEach(() => {
      handleChangeSpy.mockClear();
    });

    it('should be called by each `TextField` passing the input name', () => {
      const textFields = createGoal().find(TextField);
      textFields.forEach(field => field.simulate('change', { target: {value: ''} }, field.props().name));
      expect(handleChangeSpy.mock.calls.length).toBe(3);
    });

    it('should call update the state at the `[name]` property', () => {
      let state = {
        'goal-name': '',
        'due-date': '',
        'description': ''
      };
      expect(createGoal().state()).toMatchObject(state);
      const textFields = createGoal().find(TextField);
      textFields.forEach(field => field.simulate('change', { target: {value: 'test'} }, field.props().name));
      state = {
        'goal-name': 'test',
        'due-date': 'test',
        'description': 'test'
      },
      expect(createGoal().state()).toMatchObject(state);
      state = {
        'goal-name': 'test_2',
        'due-date': 'test',
        'description': 'test'
      };
      const goalNameField = textFields.first();
      goalNameField.simulate('change', { target: {value: 'test_2'} }, goalNameField.props().name);
      expect(createGoal().state()).toMatchObject(state);
    });
  });

  it('should have an `handleClick` method', () => {
    expect(UnwrappedCreateGoal.prototype.handleClick).toBeDefined();
  });
  describe('the `handleClick` method', () => {
    const handleClickSpy = jest.spyOn(UnwrappedCreateGoal.prototype, 'handleClick');
    afterEach(() => {
      handleClickSpy.mockClear();
    });

    it('should be called on `Button` click', () => {
      const btn = createGoal().find(Button);
      btn.simulate('click');
      expect(handleClickSpy.mock.calls.length).toBe(1);
    });
  });

  // TODO: test `error` prop
  // TODO: test `Button` disabled

});
