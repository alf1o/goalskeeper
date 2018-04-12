import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { UnwrappedApp } from '../App';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GoalsList from '../GoalsList';
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

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UnwrappedApp {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
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

  it('should always render an `AppBar`', () => {
    expect(app().find(AppBar).length).toBe(1);
  });
  //  TODO
  // describe('the rendered `AppBar`', () => {
  //   let appBar;
  //   beforeEach(() => {
  //     appBar = app().find(AppBar);
  //   });
  //   it('should receive an `onLeftIconButtonClick` prop', () => {
  //     expect(appBar.props().onLeftIconButtonClick).toBeDefined();
  //   });
  //   it('should receive a `title` prop', () => {
  //     expect(appBar.props().title).toBeDefined();
  //   });
  //   it('should receive an `onTitleClick` prop', () => {
  //     expect(appBar.props().onTitleClick).toBeDefined();
  //   });
  // });

  it('should always render a `GoalsList`', () => {
    expect(app().find(GoalsList).length).toBe(1);
  });
  describe('the rendered `GoalsList`', () => {
    let goalsList;
    beforeEach(() => {
      goalsList = app().find(GoalsList);
    });
    it('should receive a `goalsById` prop', () => {
      expect(goalsList.props().goalsById).toBeDefined();
    });
  });

  it('should always render a `Button`', () => {
    expect(app().find(Button).length).toBe(1);
  });
  describe('the rendered `Button`', () => {
    let btn;
    beforeEach(() => {
      btn = app().find(Button);
    });
    it('should receive an `onClick` prop', () => {
      expect(btn.props().onClick).toBeDefined();
    });
  });

});
