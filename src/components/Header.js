import React, { Component } from 'react';

import TodoTextField from './TodoTextField';

class Header extends Component {
  render() {
    const { addTodo } = this.props.actions;

    return (
      <div>
        <TodoTextField onSubmit={todo => addTodo(todo)} />
      </div>
    );
  }
}

export default Header;