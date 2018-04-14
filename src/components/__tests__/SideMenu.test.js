import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import SideMenu from '../SideMenu';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

describe('SideMenu', () => {
  let props;
  let mountedSideMenu;

  function sideMenu() {
    if (!mountedSideMenu) mountedSideMenu = shallow(<SideMenu {...props} />);
    return mountedSideMenu;
  }

  beforeEach(() => {
    props = {
      open: false,
      handleClose: jest.fn()
    };
    mountedSideMenu = undefined;
  });

  it('should always render a `Drawer`', () => {
    expect(sideMenu().find(Drawer).length).toBe(1);
  });
  describe('the rendered `Drawer`', () => {
    let drawer;
    beforeEach(() => {
      drawer = sideMenu().find(Drawer);
    });
    it('should contain everything else', () => {
      expect(drawer.children()).toEqual(sideMenu().children());
    });
    it('should receive a `open` prop', () => {
      expect(drawer.props().open).toBeDefined();
    });
    it('should receive an `onClose` prop', () => {
      expect(drawer.props().onClose).toBeDefined();
    });
  });

  it('should always render a `List`', () => {
    expect(sideMenu().find(List).length).toBe(1);
  });

  it('should render 3 `ListItem`s', () => {
    expect(sideMenu().find(ListItem).length).toBe(3);
  });

  it('should call `handleClose` prop when the `Drawer` is closed', () => {
    const handleCloseSpy = sideMenu().instance().props.handleClose;
    sideMenu().find(Drawer).simulate('close');
    expect(handleCloseSpy.mock.calls.length).toBe(1);
  });
  it('should call `handleClose` prop when the `div` is clicked', () => {
    const handleCloseSpy = sideMenu().instance().props.handleClose;
    sideMenu().find('div').simulate('click');
    expect(handleCloseSpy.mock.calls.length).toBe(1);
  });
  it('should call `handleClose` prop when a key is pressed', () => {
    const handleCloseSpy = sideMenu().instance().props.handleClose;
    sideMenu().find('div').simulate('keydown');
    expect(handleCloseSpy.mock.calls.length).toBe(1);
  });

  // TODO: `ListItem`s navigation

});
