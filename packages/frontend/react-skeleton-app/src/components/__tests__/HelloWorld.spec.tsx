import React from 'react';
import ReactDOM from 'react-dom';
import { HelloWorld } from '../HelloWorld';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HelloWorld />, div);
  ReactDOM.unmountComponentAtNode(div);
});
