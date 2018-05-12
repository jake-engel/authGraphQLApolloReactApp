import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';

import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import requireAuth from './hocs/requireAuth';

// Need this boilerplate code below to get cookies to work. By default, cookies not included in request.
// Lets us customize our network interface to retrieve data form the server.
const networkInterface = createNetworkInterface({
  uri: '/graphql', // says that server is listening to route /graphql
  opts: {
    credentials: 'same-origin' // means you're making a request to the same origin the browser is on (lets you send cookies)
  }
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id // needed so apollo caches data based off of object id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute />
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="dashboard" component={requireAuth(Dashboard)} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
