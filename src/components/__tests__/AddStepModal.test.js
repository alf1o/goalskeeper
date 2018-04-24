import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import { UnwrappedAddStepModal } from '../AddStepModal';
import Modal from 'material-ui/Modal';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

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
  });

});
