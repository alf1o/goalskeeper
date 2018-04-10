import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';

describe('App', () => {
  let props;
  let mountedApp;

  function app() {
    if (!mountedApp) mountedApp = shallow(<App {...props} />);
    return mountedApp;
  }

  beforeEach(() => {
    props = {};
    mountedApp = undefined;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should always render a `MuiThemeProvider`', () => {
    const muiThemeProvider = app().find(MuiThemeProvider);
    expect(muiThemeProvider.length).toBe(1);
  });
  describe('the rendered `MuiThemeProvider`', () => {
    it('should contain everything else', () => {
      const muiThemeProvider = app().find(MuiThemeProvider);
      expect(muiThemeProvider.children()).toEqual(app().children());
    });
  });

  it('should always render an `AppBar`', () => {
    expect(app().find(AppBar).length).toBe(1);
  });
  describe('the rendered `AppBar`', () => {
    let appBar;
    beforeEach(() => {
      appBar = app().find(AppBar);
    });
    it('should receive an `onLeftIconButtonClick` prop', () => {
      expect(appBar.props().onLeftIconButtonClick).toBeDefined();
    });
    it('should receive a `title` prop', () => {
      expect(appBar.props().title).toBeDefined();
    });
    it('should receive an `onTitleClick` prop', () => {
      expect(appBar.props().onTitleClick).toBeDefined();
    });
  });

  it('should always render a `Paper`', () => {
    expect(app().find(Paper).length).toBe(1);
  });

  it('should always render a `FloatingActionButton`', () => {
    expect(app().find(FloatingActionButton).length).toBe(1);
  });
  describe('the rendered `FloatingActionButton`', () => {
    let floatActBtn;
    beforeEach(() => {
      floatActBtn = app().find(FloatingActionButton);
    });
    it('should receive an `onClick` prop', () => {
      expect(floatActBtn.props().onClick).toBeDefined();
    });
  });

});
