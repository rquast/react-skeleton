import { Todo } from './models';

interface Data {
  todos: Todo[];
}

export const getTodos = () => {
  const todoData = new Promise<Data>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        todos: [
          { id: '1', name: 'Lobby government for billions of dollars' },
          { id: '2', name: 'Launch Rocket' }
        ]
      });
    }, 250);
  });

  return todoData;
};
