import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../utils/history';

import users, * as fromUsers from './users';
import posts, * as fromPosts from './posts';

export const rootReducer = combineReducers({
  users,
  posts,
});

export default connectRouter(history)(rootReducer);

export const getPostMeta = (state, post) => {
  const repliedPost = fromPosts.getPostById(state.posts, post.replyToId);
  const user = fromUsers.getUserById(state.users, post.userId);
  return { ...post, repliedPost, user };
};
