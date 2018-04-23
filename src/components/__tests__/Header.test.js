import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

describe('Header', () => {
  let props;
  let mountedHeader;

  function header() {
    if (!mountedHeader) mountedHeader = shallow(<Header {...props} />);
    return mountedHeader;
  }

  beforeEach(() => {
    props = {
      openDrawer: jest.fn()
    };
    mountedHeader = undefined;
  });

  it('should always render an `AppBar`', () => {
    expect(header().find(AppBar).length).toBe(1);
  });

  it('should render an `IconButton`', () => {
    expect(header().find(IconButton).length).toBe(1);
  });
  describe('the rendered `IconButton`', () => {
    it('should receive an `onClick` prop', () => {
      const iconBtn = header().find(IconButton);
      expect(iconBtn.props().onClick).toBeDefined();
    });
  });

  it('should call the `openDrawer` prop when `IconButton` is clicked', () => {
    const iconBtn = header().find(IconButton);
    iconBtn.simulate('click');
    expect(iconBtn.props().onClick.mock.calls.length).toBe(1);
  });

});
