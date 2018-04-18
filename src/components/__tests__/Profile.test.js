import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react'
import { shallow } from 'enzyme';
import Profile from '../Profile';
import Card, { CardContent } from 'material-ui/Card';
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

});
