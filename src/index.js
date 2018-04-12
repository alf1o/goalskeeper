import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const mockState = {
  goalsById: {
    'goal_0': {
      label: 'Finish React static app',
      id: 'goal_0',
      dueDate: '15/04/2018',
      steps: [
        {
          id: 'step_0_0',
          content: 'Read React docs',
          completed: true,
          dateCompleted: '09/04/2018'
        },
        {
          id: 'step_0_1',
          content: 'Learn about Component testing',
          completed: false,
          dateCompleted: null
        }
      ],
      completed: false,
      dateCreated: '09/04/2018',
      description: 'Would like to build my own goal keeper'
    },
    'goal_1': {
      label: 'Add Redux to the app',
      id: 'goal_1',
      dueDate: '22/04/2018',
      steps: [
        {
          id: 'step_1_0',
          content: 'Read Redux docs',
          completed: false,
          dateCompleted: null
        },
        {
          id: 'step_1_1',
          content: 'Learn about reducers testing',
          completed: false,
          dateCompleted: null
        }
      ],
      completed: false,
      dateCreated: '09/04/2018',
      description: 'Would like to build my own goal keeper'
    }
  },
  goals: ['goal_0', 'goal_1'],
  sortedBy: 'LAST_CREATED',
  goalsCompleted: [],
  quoteOfTheDay: 'The limit is not in the art, but in the man that practices it.'
};

ReactDOM.render(
  <App mockState={mockState} />,
  document.getElementById('root')
);

registerServiceWorker();
