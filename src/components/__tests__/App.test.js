import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { UnwrappedApp } from '../App';
import Header from '../Header';
import GoalsList from '../GoalsList';
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

  it('should always render an `Header`', () => {
    expect(app().find(Header).length).toBe(1);
  });

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
