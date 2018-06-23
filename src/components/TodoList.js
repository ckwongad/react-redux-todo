import React, { Component } from 'react';
import { List } from 'material-ui/List';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import TodoRow from './TodoRow';
import Footer from '../components/Footer';


const SortableTodoRow = SortableElement(({todo, handleCompleteTodo, handleRemoveTodo}) =>
  <TodoRow
    todo={todo}
    handleCompleteTodo={handleCompleteTodo}
    handleRemoveTodo={handleRemoveTodo}
  />
);

const SortableTodoList = SortableContainer(({todos, handleCompleteTodo, handleRemoveTodo}) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <SortableTodoRow
          key={`item-${index}`}
          index={index}
          todo={todo}
          handleCompleteTodo={handleCompleteTodo}
          handleRemoveTodo={handleRemoveTodo}
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

  handleCompleteAll = () => {
    this.props.actions.completeAll();
  };

  handleSortEnd = ({oldIndex, newIndex}) => {
    this.props.actions.reorderTodo(oldIndex, newIndex);
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
            lockAxis='y'
            distance={10}
          />
        </List>
        <Footer
          todos={todos}
          handleFilter={this.handleFilter}
          currentFilter={currentFilter}
          handleRemoveCompleted={this.handleRemoveCompleted}
          handleCompleteAll={this.handleCompleteAll}
        />
      </div>
    );
  }
}

export default TodoList;