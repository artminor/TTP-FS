import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentPort } from '../../actions/portfolio';
import Spinner from '../auth/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Transaction from './Transaction';
import Stock from './Stock';
// import { Container, Row, Col } from 'reactstrap';
var Columns = require('react-columns');

const Dashboard = ({
  getCurrentPort,
  auth: { user },
  portfolio: { portfolio, loading }
}) => {
  useEffect(() => {
    getCurrentPort();
  }, []);
  return loading && portfolio == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <p className="lead">
        <i className="fas fa-wallet">
          Hi {user && user.name}, you have $
          {portfolio ? portfolio && portfolio.cash.toFixed(2) : '5000.00'} in
          wallet.
        </i>
      </p>
      {portfolio !== null ? (
        <Fragment>
          <td></td>
          <DashboardActions />
          <Stock stock={portfolio.stock} />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have no stocks, please buy some stocks.</p>
          <Link to="/create-portfolio" className="btn btn-primary my-1">
            Create Portfolio
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentPort: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  portfolio: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  portfolio: state.portfolio
});

export default connect(
  mapStateToProps,
  { getCurrentPort }
)(Dashboard);
