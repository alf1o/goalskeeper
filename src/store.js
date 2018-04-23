import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import goalsById from './reducers/goalsById';
import stepsById from './reducers/stepsById';
import goals from './reducers/goals';

// If Redux DevTools extension is available, use it.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
  collapsed: true
});

const reducer = combineReducers({
  goalsById,
  stepsById,
  goals
});

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(logger))
);

export default store;

/**
  state shape:
{
  goalsById: {
    'goal_0': {
      label: 'Finish React static app',
      id: 'goal_0',
      dueDate: '15/04/2018',
      steps: ['step_0_1', 'step_0_2'],
      completed: false,
      dateCreated: '09/04/2018',
      description: 'Would like to build my own goal keeper'
    },
    'goal_1': {
      label: 'Add Redux to the app',
      id: 'goal_1',
      dueDate: '22/04/2018',
      steps: [],
      completed: true,
      dateCreated: '09/04/2018',
      description: 'Would like to build my own goal keeper'
    }
  },
  goals: ['goal_0', 'goal_1'],
  sortedBy: 'LAST_CREATED',
  goalsCompleted: [],
  quoteOfTheDay: 'The limit is not in the art, but in the man that practices it.',
  stepsByid: {
    step_0_0: {
      id: 'step_0_0',
      content: 'Read React docs',
      completed: true,
      dateCompleted: '09/04/2018',
      goalId: 'id_0'
    },
    step_0_1: {
      id: 'step_0_1',
      content: 'Learn about Component testing',
      completed: false,
      dateCompleted: null,
      goalId: 'id_0'
    }
  }
}
*/
