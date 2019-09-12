// import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import moment from 'moment';
import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentPort } from '../../actions/portfolio';
import Spinner from '../auth/Spinner';
import TransactionList from './TransactionList';

const Transaction = ({
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
      {' '}
      {portfolio !== null ? (
        <Fragment>
          <TransactionList transaction={portfolio.transaction} />{' '}
        </Fragment>
      ) : (
        <Fragment>
          <p> You have no transactions, please buy some stocks. </p>{' '}
        </Fragment>
      )}{' '}
    </Fragment>
  );
};

Transaction.propTypes = {
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
  {
    getCurrentPort
  }
)(Transaction);
