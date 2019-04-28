import * as actions from '../actions';

jest.mock('uuid', () => ({
  v4: () => '<id>',
}));

jest.mock('moment', () => () => '<datetime>');

describe('posts actions', () => {
  it('exports constants', () => {
    expect(actions.CREATE_POST).toBeDefined;
  });

  it('creates post', () => {
    const post = actions.createPost({
      text: 'Test post',
    });

    expect(post).toMatchSnapshot();
  });
});
