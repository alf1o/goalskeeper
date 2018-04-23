import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { UnwrappedApp } from '../App';
import SideMenu from '../SideMenu';
import Header from '../Header';
import Routes from '../Routes';
import Button from 'material-ui/Button';
import ContentAdd from '@material-ui/icons/Add';

describe('App', () => {
  let props;
  let mountedApp;

  function app() {
    if (!mountedApp) mountedApp = shallow(<UnwrappedApp {...props} />);
    return mountedApp;
  }

  beforeEach(() => {
    props = {
      mockState: {
        goalsById: {},
        goals: [],
        sortedBy: '',
        goalsCompleted: [],
        quoteOfTheDay: ''
      }
    };
    mountedApp = undefined;
  });

  it('should always render a `div`', () => {
    const divs = app().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
  describe('the rendered `div`', () => {
    it('should contain everything else', () => {
      const div = app().find('div').first();
      expect(div.children()).toEqual(app().children());
    });
  });

  it('should always render a `SideMenu`', () => {
    expect(app().find(SideMenu).length).toBe(1);
  });
  describe('the rendered `SideMenu`', () => {
    it('should receive an `open` prop', () => {
      expect(app().find(SideMenu).props().open).toBeDefined();
    });
    it('should receive an `handleClose` prop', () => {
      expect(app().find(SideMenu).props().handleClose).toBeDefined();
    });
  });

  it('should always render an `Header`', () => {
    expect(app().find(Header).length).toBe(1);
  });
  describe('the rendered `Header`', () => {
    it('should receive an `openDrawer` prop', () => {
      expect(app().find(Header).props().openDrawer).toBeDefined();
    });
  });

  it('should always render a `Routes`', () => {
    expect(app().find(Routes).length).toBe(1);
  });
  describe('the rendered `Routes`', () => {
    it('should receive a `goalsById` prop', () => {
      expect(app().find(Routes).props().goalsById).toBeDefined();
    });
  });

  it('should always render a `Button`', () => {
    expect(app().find(Button).length).toBe(1);
  });

  it('should have a `state.drawerOpen` property', () => {
    expect(app().state().drawerOpen).toBeDefined();
  });
  it('`state.drawerOpen` should be `false` by default', () => {
    expect(app().state().drawerOpen).toBe(false);
  });

  it('should have an `handleOpenDrawer` method', () => {
    expect(UnwrappedApp.prototype.handleOpenDrawer).toBeDefined();
  });
  describe('`handleOpenDrawer` method', () => {
    const handleOpenDrawerSpy = jest.spyOn(UnwrappedApp.prototype, 'handleOpenDrawer');
    afterEach(() => {
      handleOpenDrawerSpy.mockClear();
    });
    it('should set `state.drawerOpen` to `true`', () => {
      app().instance().handleOpenDrawer();
      expect(handleOpenDrawerSpy.mock.calls.length).toBe(1);
      expect(app().state().drawerOpen).toBe(true);
    });
  });

  it('should have an `handleCloseDrawer` method', () => {
    expect(UnwrappedApp.prototype.handleCloseDrawer).toBeDefined();
  });
  describe('`handleCloseDrawer` method', () => {
    const handleCloseDrawerSpy = jest.spyOn(UnwrappedApp.prototype, 'handleCloseDrawer');
    afterEach(() => {
      handleCloseDrawerSpy.mockClear();
    });
    it('should set `state.drawerOpen` to `false`', () => {
      app().instance().handleCloseDrawer();
      expect(handleCloseDrawerSpy.mock.calls.length).toBe(1);
      expect(app().state().drawerOpen).toBe(false);
    });
  });

});
