import React, { Component } from 'react';

import TodoEditor from './TodoEditor';

class Header extends Component {
  render() {
    const { addTodo } = this.props.actions;

    return (
      <div>
        <TodoEditor onSubmit={todo => addTodo(todo)} />
      </div>
    );
  }
}

export default Header;