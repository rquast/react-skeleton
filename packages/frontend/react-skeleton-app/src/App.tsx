import React, { Component } from 'react';
import Welcome from './Welcome';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HelloWorld } from './components/HelloWorld';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Products } from './gql/Products';

// TODO: configure endpoint with real one
const client = new ApolloClient({ uri: 'https://fakerql.com/graphql' });

interface IAppState {
    date: Date
}

class App extends Component<{}, IAppState> {

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    productSelected = (optionValue: string) => {
        console.log(`Viewing ${optionValue}`);
    };

    render() {
        console.log(this.state, this.props);
        return (
            <ApolloProvider client={client}>
                <div className="App">
                    <header className="App-header">
                        <HelloWorld />
                        <Products onProductSelected={this.productSelected} />
                        <div className="notification">
                            Notification...
                        </div>
                    </header>
                    <div>
                        hello {this.state.date.toDateString()}
                    </div>
                    <div className="container">
                        <Router>
                            <div>
                                <Route exact path="/welcome" component={Welcome}/>
                            </div>
                        </Router>
                    </div>
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
