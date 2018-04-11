import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import Step from '../Step';
import { ListItem } from 'material-ui/List';

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
    it('should receive a `leftCheckbox` prop', () => {
      expect(listItem.props().leftCheckbox).toBeDefined();
    });
    it('should receive a `primaryText` prop', () => {
      expect(listItem.props().primaryText).toBeDefined();
    });
    it('should receive a `rightIcon` prop', () => {
      expect(listItem.props().rightIcon).toBeDefined();
    });
  });

});
