import React, { Component } from 'react';
import Welcome from './Welcome';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HelloWorld } from './components/HelloWorld';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <HelloWorld></HelloWorld>
          <div className="notification">
              Notification...
          </div>
        </header>
        <div className="container">
          <Router>
            <div>
              <Route exact path="/welcome" component={Welcome} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
