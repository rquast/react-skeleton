import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Welcome from '../Welcome';

it('renders without crashing', (): any => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div>
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    </div>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
