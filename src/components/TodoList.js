import React, { Component } from 'react';
import { List } from 'material-ui/List';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import TodoRow from './TodoRow';
import Footer from '../components/Footer';


const SortableTodoRow = SortableElement(({todo, handleCompleteTodo, handleRemoveTodo, handleSelectTodo}) =>
  <TodoRow
    todo={todo}
    handleCompleteTodo={handleCompleteTodo}
    handleRemoveTodo={handleRemoveTodo}
    handleSelectTodo={handleSelectTodo}
  />
);

const SortableTodoList = SortableContainer(({todos, handleCompleteTodo, handleRemoveTodo, handleSelectTodo}) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <SortableTodoRow
          key={`item-${index}`}
          index={index}
          todo={todo}
          handleCompleteTodo={handleCompleteTodo}
          handleRemoveTodo={handleRemoveTodo}
          handleSelectTodo={handleSelectTodo}
        />
      ))}
    </ul>
  );
});

class TodoList extends Component {
  state = {
    currentFilter: 'all',
  };

  handleCompleteTodo = id => {
    return () => this.props.actions.completeTodo(id);
  };

  handleRemoveTodo = id => {
    return () => this.props.actions.removeTodo(id);
  };

  handleFilter = filter => {
    this.setState({
      currentFilter: filter,
    });
  };

  handleRemoveCompleted = () => {
    this.props.actions.removeCompleted();
  };

  handleSortEnd = ({oldIndex, newIndex}) => {
    this.props.actions.reorderTodo(oldIndex, newIndex);
  };

  handleSelectTodo = (id) => {
    return () => this.props.actions.toggleSelectTodo(id);
  };

  render() {
    const { todos } = this.props;
    const { currentFilter } = this.state;

    const filteredTodos = todos.filter(({ completed }) => {
      switch (currentFilter) {
        case 'completed':
          return completed;
        case 'active':
          return !completed;
        default:
          return true;
      }
    });

    return (
      <div>
        <List>
          <SortableTodoList
            todos={filteredTodos}
            handleCompleteTodo={this.handleCompleteTodo}
            handleRemoveTodo={this.handleRemoveTodo}
            onSortEnd={this.handleSortEnd}
            handleSelectTodo={this.handleSelectTodo}
            lockAxis='y'
            distance={10}
          />
        </List>
        <Footer
          todos={todos}
          handleFilter={this.handleFilter}
          currentFilter={currentFilter}
          handleRemoveCompleted={this.handleRemoveCompleted}
        />
      </div>
    );
  }
}

export default TodoList;