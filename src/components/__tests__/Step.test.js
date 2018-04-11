import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import Step from '../Step';

describe('Step', () => {
  let props;
  let mountedStep;

  function mountStep() {
    if (!mountedStep) mountedStep = shallow(<Step {...props} />);
    return mountedStep;
  }

  beforeEach(() => {
    props = {};
    mountedStep = undefined;
  });

  it('should always render a `div`', () => {
    expect(mountStep().find('div').length).toBeGreaterThan(0);
  });

});
