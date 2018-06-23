import types from '../actions/actionTypes';

const initialState = [
  {
    id: 0,
    text: 'This is a todo',
    date: new Date().toISOString(),
    completed: false,
  },
];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.ADD_TODO:
      return [
        ...state,
        {
          id: state.length,
          completed: false,
          text: action.text,
          date: action.date || new Date().toISOString()
        },
      ];
    case types.REMOVE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      );
    case types.COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          {
            ...todo,
            completed: !todo.completed,
          } :
          todo
      );
    case types.COMPLETE_ALL:
      const alreadyCompleted = state.every(({ completed }) => completed);
      return state.map(todo => ({
        ...todo,
        completed: !alreadyCompleted
      }));
    case types.REMOVE_COMPLETED:
      return state.filter(todo => todo.completed === false);
    default:
      return state;
  }
}
