import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/auth/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/auth/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Transaction from './components/dashboard/Transaction';
import PrivateRoute from './components/routing/PrivateRoute';
import CreatePortfolio from './components/portfolio/CreatePortfolio';
import EditPort from './components/portfolio/EditPort';
import AddStock from './components/portfolio/AddStock';
//redux
//provider connects react-redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  //will keep running when state updates unless has a second parameter of []
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />{' '}
              <Route exact path="/login" component={Login} />{' '}
              <PrivateRoute exact path="/dashboard" component={Dashboard} />{' '}
              <PrivateRoute exact path="/transaction" component={Transaction} />{' '}
              <PrivateRoute
                exact
                path="/create-portfolio"
                component={CreatePortfolio}
              />{' '}
              <PrivateRoute exact path="/edit-portfolio" component={EditPort} />{' '}
              <PrivateRoute exact path="/add-stock" component={AddStock} />{' '}
            </Switch>{' '}
          </section>{' '}
        </Fragment>{' '}
      </Router>{' '}
    </Provider>
  );
};

export default App;
