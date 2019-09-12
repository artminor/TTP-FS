import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentPort } from '../../actions/portfolio';
import Spinner from '../auth/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Stock from './Stock';

const Dashboard = ({
  getCurrentPort,
  auth: { user },
  portfolio: { portfolio, loading }
}) => {
  useEffect(() => {
    getCurrentPort();
  }, [getCurrentPort]);
  return loading && portfolio == null ? (
    <Spinner />
  ) : (
    <Fragment>
      {portfolio !== null ? (
        <Fragment>
          <td>
            {' '}
            <Stock stock={portfolio.stock} />
          </td>
          <td>
            <h2 className="my-2">
              Hey {user && user.name}, you have $
              {portfolio ? portfolio && portfolio.cash.toFixed(2) : '5000.00'}{' '}
            </h2>
            <DashboardActions />
          </td>
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
