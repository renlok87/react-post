import React from 'react';
import renderer from 'react-test-renderer';
import PostInput from '../PostInput';

describe('PostInput', () => {
  it('renders correctly', () => {
    const component = renderer.create(<PostInput />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
