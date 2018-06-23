import types from './actionTypes';

export const addTodo = ({ text, date }) => ({
  type: types.ADD_TODO,
  text,
  date
});

export const editTodo = ({id, text, date}) => ({
  type: types.EDIT_TODO,
  id,
  text,
  date
});

export const removeTodo = (id, text) => ({
  type: types.REMOVE_TODO,
  id,
});

export const reorderTodo = (oldIndex, newIndex) => ({
  type: types.REORDER_TODO,
  oldIndex,
  newIndex
});

export const toggleSelectTodo = id => ({
  type: types.TOGGLE_SELECT_TODO,
  id,
});

export const completeTodo = id => ({
  type: types.COMPLETE_TODO,
  id,
});

export const completeSelected = () => ({
  type: types.COMPLETE_SELECTED,
});

export const removeCompleted = id => ({
  type: types.REMOVE_COMPLETED,
});