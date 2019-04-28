import moment from 'moment';
import { v4 as uuid } from 'uuid';

const scope = '@@posts';

export const CREATE_POST = `${scope}/CREATE_POST`;

export const createPost = payload => ({
  type: CREATE_POST,
  payload: {
    id: uuid(),
    createdAt: moment(),
    userId: null,
    text: '',
    replyToId: null,
    ...payload,
  },
});
