import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import GoalsList from '../GoalsList';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

describe('GoalsList', () => {
  let props;
  let mountedGoalsList;

  function goalsList() {
    if (!mountedGoalsList) mountedGoalsList = shallow(<GoalsList {...props} />);
    return mountedGoalsList;
  }

  beforeEach(() => {
    props = {
      goalsById: {}
    };
    mountedGoalsList = undefined;
  });

  it('should always render a `Paper`', () => {
    expect(goalsList().find(Paper).length).toBeGreaterThan(0);
  });
  describe('the rendered `Paper`', () => {
    it('should contain everything else', () => {
      expect(goalsList().find(Paper).children()).toEqual(goalsList().children());
    });
  });

  it('should always render a `List`', () => {
    expect(goalsList().find(List).length).toBe(1);
  });
  describe('the rendered `List`', () => {
    describe('should display a `ListItem` for each element of `goalsById`', () => {
      it('should display 0 elements for an empty object', () => {
        const listItems = goalsList().find(List).find(ListItem);
        expect(listItems.length).toBe(0);
      });
      it('should display 1 element1 for an object of 1 element', () => {
        props = {
          goalsById: {
            'goal_0': {
              id: 'goal_0'
            }
          }
        };
        const listItems = goalsList().find(List).find(ListItem);
        expect(listItems.length).toBe(1);
      });
      it('should display 2 elements for an object of 2 elements', () => {
        props = {
          goalsById: {
            'goal_0': {
              id: 'goal_0'
            },
            'goal_1': {
              id: 'goal_1'
            }
          }
        };
        const listItems = goalsList().find(List).find(ListItem);
        expect(listItems.length).toBe(2);
      });

      describe('the rendered `ListItem`', () => {
        let listItem;
        beforeEach(() => {
          props = {
            goalsById: {
              'goal_0': {
                id: 'goal_0',
                label: 'Test goal 0'
              },
              'goal_1': {
                id: 'goal_1',
                label: 'Test goal 1'
              }
            }
          };
          listItem = goalsList().find(List).find(ListItem).first();
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
    });
  });

  it('should always render a `FlatButton`', () => {
    expect(goalsList().find(FlatButton).length).toBe(1);
  });
  describe('the rendered `FlatButton`', () => {
    let flatBtn;
    beforeEach(() => {
      flatBtn = goalsList().find(FlatButton);
    });
    it('should receive a `label` prop', () => {
      expect(flatBtn.props().label).toBeDefined();
    });
    it('should receive a `icon` prop', () => {
      expect(flatBtn.props().icon).toBeDefined();
    });
    it('should receive a `onClick` prop', () => {
      expect(flatBtn.props().onClick).toBeDefined();
    });
    it('should receive a `fullWidth` prop', () => {
      expect(flatBtn.props().fullWidth).toBeDefined();
    });
  });

});
