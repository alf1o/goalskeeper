import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import GoalsList from '../GoalsList';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import LinearProgress from 'material-ui/LinearProgress';
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
    describe('should display a `div` for each element of `goalsById`', () => {
      it('should display 0 elements for an empty object', () => {
        const divs = goalsList().find(List).find('div');
        expect(divs.length).toBe(0);
      });
      it('should display 1 element for an object of 1 element', () => {
        props = {
          goalsById: {
            'goal_0': {
              id: 'goal_0',
              steps: []
            }
          }
        };
        const divs = goalsList().find(List).find('div');
        expect(divs.length).toBe(1);
      });
      it('should display 2 elements for an object of 2 elements', () => {
        props = {
          goalsById: {
            'goal_0': {
              id: 'goal_0',
              steps: [{ completed: false }]
            },
            'goal_1': {
              id: 'goal_1',
              steps: [{ completed: true }, { completed: false }]
            }
          }
        };
        const divs = goalsList().find(List).find('div');
        expect(divs.length).toBe(2);
      });

      describe('the rendered `div`', () => {
        let div;
        beforeEach(() => {
          props = {
            goalsById: {
              'goal_0': {
                id: 'goal_0',
                label: 'Test goal 0',
                steps: [{ completed: true }, { completed: true }]
              },
              'goal_1': {
                id: 'goal_1',
                label: 'Test goal 1',
                steps: [{ completed: true }, { completed: false }]
              }
            }
          };
          div = goalsList().find(List).find('div').first();
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
