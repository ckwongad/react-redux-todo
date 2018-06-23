import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as todoActions from '../actions/todos';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import isDate from 'lodash/isDate';

import TodoTextField from '../components/TodoTextField';

class TodoRow extends Component {
  state = {
    showEditDialog: false
  }

  showDialog = () => {
    this.setState({...this.state, showEditDialog: true})
  }

  handleRequestClose = () => {
    this.setState({...this.state, showEditDialog: false})
  }

  onSubmitClick = todo => {
    this.props.actions.editTodo(todo)
    this.setState({...this.state, showEditDialog: false})
  }

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
            <IconButton onTouchTap={this.showDialog}>
              <FontIcon
                className="material-icons"
                color="gray"
              >
                edit
              </FontIcon>
            </IconButton>
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
            <Dialog
              open={this.state.showEditDialog}
              onRequestClose={this.handleRequestClose}
            >
              <TodoTextField todo={todo} onSubmit={this.onSubmitClick} />
            </Dialog>
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(todoActions, dispatch)
});

export default connect(
  null,
  mapDispatchToProps,
)(TodoRow);