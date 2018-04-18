import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react'
import { shallow } from 'enzyme';
import Profile from '../Profile';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

describe('Profile', () => {
  let props;
  let mountedProfile;

  function profile() {
    if (!mountedProfile) mountedProfile = shallow(<Profile {...props} />);
    return mountedProfile;
  }

  beforeEach(() => {
    props = {};
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

  it('should always a render a `CardContent`', () => {
    expect(profile().find(CardContent).length).toBe(1);
  });

  it('should always render 3 `Typography`', () => {
    expect(profile().find(Typography).length).toBe(3);
  });

});
