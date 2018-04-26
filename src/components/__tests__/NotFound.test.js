import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../NotFound';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

describe('`NotFound`', () => {
  let props;
  let mountedNotFound;

  function notFound() {
    if (!mountedNotFound) mountedNotFound = shallow(<NotFound {...props} />);
    return mountedNotFound;
  }

  beforeEach(() => {
    props = {};
    mountedNotFound = undefined;
  });

  it('should always render a `Paper`', () => {
    expect(notFound().find(Paper).length).toBeGreaterThan(0);
  });
  describe('the rendered `Paper`', () => {
    it('should contain everything else', () => {
      const paper = notFound().find(Paper);
      expect(paper.children()).toEqual(notFound().children());
    });
  });

  it('should always render 2 `Typography`', () => {
    expect(notFound().find(Typography).length).toBe(2);
  });

  it('should always render a `Button`', () => {
    expect(notFound().find(Button).length).toBe(1);
  });

});
