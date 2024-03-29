import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  //will display when authenticated
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm"> Portfolio </span>{' '}
        </Link>{' '}
      </li>{' '}
      <li>
        <Link to="/transaction">
          <i className="fas fa-credit-card" />{' '}
          <span className="hide-sm"> Transactions </span>{' '}
        </Link>{' '}
      </li>{' '}
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm"> Logout </span>{' '}
        </a>{' '}
      </li>{' '}
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register"> Register </Link>{' '}
      </li>{' '}
      <li>
        <Link to="/login"> Login </Link>{' '}
      </li>{' '}
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"> Stock Portfolio </Link>{' '}
      </h1>{' '}
      {!loading && (
        <Fragment> {isAuthenticated ? authLinks : guestLinks} </Fragment>
      )}{' '}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  //bring entire state
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    logout
  }
)(Navbar);
