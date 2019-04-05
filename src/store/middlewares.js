import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import history from '../utils/history';

export const loggerMiddleware = createLogger({ collapsed: true });
export const routerMiddleware = createRouterMiddleware(history);

const middlewares = [thunk, routerMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(loggerMiddleware);
}

export default middlewares;
