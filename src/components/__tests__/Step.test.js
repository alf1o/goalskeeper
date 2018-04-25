import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import { UnwrappedStep } from '../Step';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Clear from '@material-ui/icons/Clear';
import Done from '@material-ui/icons/Done';

describe('Step', () => {
  let props;
  let mountedStep;

  function mountStep() {
    if (!mountedStep) mountedStep = shallow(<UnwrappedStep {...props} />);
    return mountedStep;
  }

  beforeEach(() => {
    props = {
      step: {
        id: '0',
        content: 'Test step',
        completed: false,
        dateCompleted: null
      },
      completeStep: jest.fn()
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
  });

  it('should render a `Checkbox`', () => {
    expect(mountStep().find(Checkbox).length).toBe(1);
  });
  describe('the rendered `Checkbox`', () => {
    it('should receive a `checked` prop with the value of `step.completed`', () => {
      const checkbox = mountStep().find(Checkbox);
      expect(checkbox.props().checked).toBeDefined();

      expect(checkbox.props().checked).toBe(props.step.completed);
    });
  });

  it('should dispatch a `COMPLETE_STEP` action when the `ListItem` is clicked', () => {
    mountStep().find(ListItem).simulate('click');
    expect(props.completeStep.mock.calls.length).toBe(1);
  });

});
