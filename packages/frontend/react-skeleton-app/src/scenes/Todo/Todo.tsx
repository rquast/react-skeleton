import React, { Component } from 'react';
import TodoItem from './components/TodoItem';

class Todo extends Component {
  render() {
    return (
      <>
        <p>Todo!</p>
        <TodoItem />
      </>
    );
  }
}

export default Todo;
