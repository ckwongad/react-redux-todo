import types from '../actions/actionTypes';
import { arrayMove } from 'react-sortable-hoc';
import uniqueId from 'lodash/uniqueId';

const initialState = [
  {
    id: 0,
    text: 'This is a todo',
    date: new Date().toISOString(),
    completed: false,
    selected: false
  },
];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.ADD_TODO:
      return [
        ...state,
        {
          id: uniqueId(`${Date.now()}_`),
          completed: false,
          text: action.text,
          date: action.date || new Date().toISOString()
        },
      ];
    case types.REMOVE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      );
    case types.REORDER_TODO:
      return arrayMove(state, action.oldIndex, action.newIndex);
    case types.TOGGLE_SELECT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          {
            ...todo,
            selected: !todo.selected,
          } :
          todo
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
    case types.COMPLETE_SELECTED:
      const alreadyCompleted = state.every(({ completed }) => completed);
      return state.map(todo =>
        todo.selected?
          {
            ...todo,
            completed: !alreadyCompleted
          } :
          todo
      );
    case types.REMOVE_COMPLETED:
      return state.filter(todo => todo.completed === false);
    default:
      return state;
  }
}
