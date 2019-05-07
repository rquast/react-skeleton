import React, { Component } from 'react';
import Home from './Home';
import Welcome from './Welcome';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './services/reducer';
import { Navbar, Content, Container, Footer } from 'react-bulma-components';

import './App.scss';

const store = createStore(reducer);

// TODO: configure endpoint with real one
const client = new ApolloClient({ uri: 'https://fakerql.com/graphql' });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <Navbar
              color="primary"
              fixed="top"
              active={false}
              transparent={false}
            >
              <Navbar.Brand>
                <Navbar.Item renderAs="a" href="#">
                  <img
                    src="https://bulma.io/images/bulma-logo.png"
                    alt="Bulma: a modern CSS framework based on Flexbox"
                    width="112"
                    height="28"
                  />
                </Navbar.Item>
                <Navbar.Burger />
              </Navbar.Brand>
              <Navbar.Menu>
                <Navbar.Container>
                  <Navbar.Item dropdown hoverable href="#">
                    <Navbar.Link>First</Navbar.Link>
                    <Navbar.Dropdown>
                      <Link to={`/`}>
                        <Navbar.Item>Home</Navbar.Item>
                      </Link>
                      <Link to={`/welcome`}>
                        <Navbar.Item>Welcome</Navbar.Item>
                      </Link>
                    </Navbar.Dropdown>
                  </Navbar.Item>
                  <Navbar.Item href="#">Second</Navbar.Item>
                </Navbar.Container>
                <Navbar.Container position="end">
                  <Navbar.Item href="#">At the end</Navbar.Item>
                </Navbar.Container>
              </Navbar.Menu>
            </Navbar>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/welcome" component={Welcome} />
            </Switch>
            <Footer>
              <Container>
                <Content style={{ textAlign: 'center' }}>
                  <p>
                    <strong>Bulma</strong> by{' '}
                    <a href="http://jgthms.com">Jeremy Thomas</a>. The source
                    code is licensed
                    <a href="http://opensource.org/licenses/mit-license.php">
                      MIT
                    </a>
                    . The website content is licensed{' '}
                    <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                      CC BY NC SA 4.0
                    </a>
                    .
                  </p>
                </Content>
              </Container>
            </Footer>
          </Router>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
