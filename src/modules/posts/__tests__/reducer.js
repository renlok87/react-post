import reducer, {
  initialState,
  allIds,
  byId,
  getPostById,
  getAllPosts,
  getRepliesById,
} from '../reducer';
import * as actions from '../actions';

jest.mock('uuid', () => ({
  v4: () => '<id>',
}));

jest.mock('moment', () => () => '<datetime>');

describe('posts reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
    expect(allIds(undefined, {})).toEqual(initialState.allIds);
    expect(byId(undefined, {})).toEqual(initialState.byId);
  });

  it('create new post', () => {
    const payload = { text: 'Test post' };
    const state = reducer(initialState, actions.createPost(payload));
    expect(state).toMatchSnapshot();
  });
});

describe('posts selectors', () => {
  it('gets posts by id', () => {
    const user = { id: 123, username: 'user' };
    const state = {
      byId: {
        [user.id]: user,
      },
    };

    expect(getPostById(state, user.id)).toEqual(user);
    expect(getPostById(state, 321)).toBeUndefined();
  });

  it('gets all posts', () => {
    const tweet1 = { id: 1, text: 'post 1' };
    const tweet2 = { id: 2, text: 'post 2' };
    const state = {
      allIds: [tweet1.id, tweet2.id],
      byId: {
        [tweet1.id]: tweet1,
        [tweet2.id]: tweet2,
      },
    };

    expect(getAllPosts(state)).toEqual([tweet1, tweet2]);
  });

  it('gets replies by id', () => {
    const post = { id: 1, text: 'post 1' };
    const reply = { id: 2, text: 'post 2', replyToId: 1 };
    const state = {
      allIds: [post.id, reply.id],
      byId: {
        [post.id]: post,
        [reply.id]: reply,
      },
    };

    expect(getRepliesById(state, post.id)).toEqual([reply]);
  });
});
