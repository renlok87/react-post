import React from 'react';
import renderer from 'react-test-renderer';
import Post from '../Post';

jest.mock('moment', () => time => ({
  fromNow: () => `${time} ago`,
}));

jest.mock('react-router-dom');

describe('Post', () => {
  const post = {
    id: '123',
    text: 'Hello, world!',
    createdAt: '1',
    user: {
      id: '321',
      username: 'user2',
    },
  };

  const reply = {
    id: '456',
    text: 'Hello!',
    createdAt: '2',
    user: {
      id: '654',
      username: 'user2',
    },
  };

  it('renders correctly', () => {
    const component = renderer.create(<Post {...post} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders highlighted post', () => {
    const component = renderer.create(<Post {...post} highlighted />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders reply', () => {
    const component = renderer.create(
      <Post {...reply} replyToId={post.id} repliedPost={post} />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
