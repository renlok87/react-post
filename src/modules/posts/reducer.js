import * as actions from './actions';
import { combineReducers } from 'redux';

export const initialState = {
  allIds: [],
  byId: {},
};

export function allIds(state = initialState.allIds, action) {
  switch (action.type) {
    case actions.CREATE_POST:
      return [...state, action.payload.id];
    default:
      return state;
  }
}

export function byId(state = initialState.byId, action) {
  switch (action.type) {
    case actions.CREATE_POST:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    default:
      return state;
  }
}

export default combineReducers({
  allIds,
  byId,
});

// Selectors
export const getPostById = (state, id) => state.byId[id];
export const getRepliesById = (state, id) =>
  getAllPosts(state).filter(post => post.replyToId === id);
export const getAllPosts = state =>
  state.allIds.map(id => getPostById(state, id));
