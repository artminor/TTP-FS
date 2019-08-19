import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentPort } from '../../actions/portfolio';

const Dashboard = ({ getCurrentPort, auth, porfolio }) => {
  useEffect(() => {
    getCurrentPort();
  }, []);
  return <div>Dashboard</div>;
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
