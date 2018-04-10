import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import Goal from '../Goal';
import { ListItem } from 'material-ui/List';
import LinearProgress from 'material-ui/LinearProgress';

describe('Goal', () => {
  let props;
  let mountedGoal;

  function goal() {
    if (!mountedGoal) mountedGoal = shallow(<Goal {...props} />);
    return mountedGoal;
  }

  beforeEach(() => {
    props = {
      goal: {}
    };
    mountedGoal = undefined;
  });

  it('it should always render a `div`', () => {
    expect(goal().find('div').length).toBeGreaterThan(0);
  });
  describe('the rendered `div`', () => {
    let div;
    beforeEach(() => {
      props = {
        goal: {
          id: 'goal_0',
          label: 'Test goal 0',
          steps: [{ completed: true }, { completed: true }]
        }
      };
      div = goal().find('div').first();
    });

    it('should render a `ListItem`', () => {
      expect(div.find(ListItem).length).toBe(1);
    });
    describe('the rendered `ListItem`', () => {
      let listItem;
      beforeEach(() => {
        listItem = div.find(ListItem);
      });
      it('should receive a `leftIcon` prop', () => {
        expect(listItem.props().leftIcon).toBeDefined();
      });
      it('should receive a `onClick` prop', () => {
        expect(listItem.props().onClick).toBeDefined();
      });
      it('should receive a `primaryText` prop', () => {
        expect(listItem.props().primaryText).toBeDefined();
      });
    });

    it('should render a `LinearProgress`', () => {
      expect(div.find(LinearProgress).length).toBe(1);
    });
    describe('the rendered `LinearProgress`', () => {
      let linearProgress;
      beforeEach(() => {
        linearProgress = div.find(LinearProgress);
      });
      it('should receive a `mode` prop', () => {
        expect(linearProgress.props().mode).toBeDefined();
      });
      it('should receive a `value` prop', () => {
        expect(linearProgress.props().value).toBeDefined();
      });
    });
  });

});
