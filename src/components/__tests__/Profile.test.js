import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react'
import { shallow } from 'enzyme';
import { Profile } from '../Profile';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

describe('Profile', () => {
  let props;
  let mountedProfile;

  function profile() {
    if (!mountedProfile) mountedProfile = shallow(<Profile {...props} />);
    return mountedProfile;
  }

  beforeEach(() => {
    props = {
      user: {
        name: 'Test',
        dateJoined: '12/12/2017',
        goalsCompleted: [],
        id: 'id_0'
      },
      changeUserName: jest.fn()
    };
    mountedProfile = undefined;
  });

  it('should always render a `Card`', () => {
    expect(profile().find(Card).length).toBe(1);
  });
  describe('the rendered `Card`', () => {
    it('should contain everything else', () => {
      const card = profile().find(Card);
      expect(card.children()).toEqual(profile().children());
    });
  });

  it('should always render a `CardHeader`', () => {
    expect(profile().find(CardHeader).length).toBe(1);
  });

  it('should pass `user.name` as `title` props to `CardHeader`', () => {
    const cardHeader = profile().find(CardHeader);
    expect(cardHeader.props().title).toBe(props.user.name);
  });

  it('should always a render a `CardContent`', () => {
    expect(profile().find(CardContent).length).toBe(1);
  });

  it('should always render 3 `Typography`', () => {
    expect(profile().find(Typography).length).toBe(3);
  });

  it('should have a `state.userName` property', () => {
    expect(profile().state().userName).toBeDefined();
  });

  it('should have a `state.editing` property', () => {
    expect(profile().state().editing).toBeDefined();
  });

  describe('when `editing` is `false`', () => {
    beforeEach(() => {
      profile().setState({ editing: false });
    });

    it('should not render a `TextField`', () => {
      expect(profile().find(TextField).length).toBe(0);
    });
  });

  describe('when `editing` is `true`', () => {
    beforeEach(() => {
      profile().setState({ editing: true });
    });

    it('should render a `TextField`', () => {
      expect(profile().find(TextField).length).toBe(1);
    });
  });

  describe('when both `editing` and `userName === user.name` are `true`', () => {
    beforeEach(() => {
      profile().setState({
        editing: false,
        userName: props.user.name
      });
    });

    it('should disable the submit `Button`', () => {
      const submit = profile().find(Button).last();
      expect(submit.props().disabled).toBe(true);
    });
  });

  it('should have an `handleChange` method', () => {
    expect(Profile.prototype.handleChange).toBeDefined();
  });
  describe('`handleChange`', () => {
    it('should update `state.userName`', () => {
      expect(profile().state().userName).toBe('');

      const evt = {
        currentTarget: {
          value: 'Test'
        }
      };
      profile().instance().handleChange(evt);
      expect(profile().state().userName).toBe(evt.currentTarget.value);
    });
  });

  it('should have a `toggleEdit` method', () => {
    expect(Profile.prototype.toggleEdit).toBeDefined();
  });
  describe('`toggleEdit`', () => {
    it('should update `editing`', () => {
      expect(profile().state().editing).toBe(false);

      profile().instance().toggleEdit();
      expect(profile().state().editing).toBe(true);
    });
  });

  it('should have an `handleClick` method', () => {
    expect(Profile.prototype.handleClick).toBeDefined();
  });
  describe('`handleClick`', () => {
    it('should dispatch a `CHANGE_NAME` action', () => {
      profile().instance().handleClick();
      expect(props.changeUserName.mock.calls.length).toBe(1);
      expect(props.changeUserName.mock.calls[0]).toEqual([props.user.id, profile().state().userName]);
    });
  });

  it('should pass `toggleEdit` as prop to edit `Button`', () => {
    const edit = profile().find(Button).first();
    expect(edit.props().onClick).toBe(profile().instance().toggleEdit);
  });

  it('should pass `handleClick` as prop to submit `Button`', () => {
    const submit = profile().find(Button).last();
    expect(submit.props().onClick).toBe(profile().instance().handleClick);
  });
});
