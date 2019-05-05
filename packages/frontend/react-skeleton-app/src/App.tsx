import React, { Component } from 'react';
import Welcome from './Welcome';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HelloWorld } from './components/HelloWorld';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Products } from './gql/Products';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './rootReducer';

const store = createStore(rootReducer);

// TODO: configure endpoint with real one
const client = new ApolloClient({ uri: 'https://fakerql.com/graphql' });

interface AppState {
  date: Date;
  viewing: string;
}

class App extends Component<{}, AppState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      date: new Date(),
      viewing: ''
    };
  }

  productSelected = (optionValue: string) => {
    this.setState({ viewing: optionValue });
  };

  render() {
    console.log(store);
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <div className="App">
            <header className="App-header">
              <HelloWorld />
              <Products onProductSelected={this.productSelected} />
              <div className="notification">Notification...</div>
            </header>
            <div>
              hello {this.state.date.toISOString()}
              <br />
              Currently viewing: {this.state.viewing}
            </div>
            <div className="container">
              <Router>
                <div>
                  <Route exact path="/welcome" component={Welcome} />
                </div>
              </Router>
            </div>
          </div>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
