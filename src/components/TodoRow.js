import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import isDate from 'lodash/isDate';

class TodoRow extends Component {
  render() {
    const { todo, handleRemoveTodo, handleSelectTodo, handleCompleteTodo } = this.props;

    return (
      <ListItem
        primaryText={`${todo.date? new Date(todo.date).toDateString() : ''}: ${todo.text}`}
        leftCheckbox={
          <Checkbox
            onCheck={handleSelectTodo(todo.id)}
            checked={todo.selected}
          />
        }
        rightIconButton={
          <div>
            <IconButton onTouchTap={handleCompleteTodo(todo.id)}>
              <FontIcon
                className="material-icons"
                color="blue"
              >
                done
              </FontIcon>
            </IconButton>
            <IconButton onTouchTap={handleRemoveTodo(todo.id)}>
              <FontIcon
                className="material-icons"
                color="red"
              >
                clear
              </FontIcon>
            </IconButton>
          </div>
        }
        style={todo.completed ? styles.completed : {}}
      />
    );
  }
}

const styles = {
  completed: {
    color: 'gray',
    textDecoration: 'line-through',
  },
};

export default TodoRow;