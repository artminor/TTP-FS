import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPortfolio, getCurrentPort } from '../../actions/portfolio';

const EditPort = ({
  portfolio: { portfolio, loading },
  createPortfolio,
  getCurrentPort,
  history
}) => {
  const [formData, setFormData] = useState({
    stock: []
  });
  const { stock } = formData;

  const onSubmit = e => {
    e.preventDefault();
    createPortfolio(formData, history, true);
  };

  useEffect(() => {
    getCurrentPort();
    setFormData({
      stock: loading || !portfolio.stock ? '' : portfolio.stock
    });
  }, [loading, getCurrentPort]);

  // useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const portfolio = await getCurrentPort();
  //     console.log(portfolio);
  //     setFormData({
  //       stock: loading || !portfolio.stock ? '' : portfolio.stock
  //     });
  //   }
  //   fetchData();
  // }, [loading]);

  return (
    <Fragment>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <p> Are you sure you want to create an account with us ? </p>{' '}
        <p> Possibly enter ssn...etc </p>{' '}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back{' '}
        </Link>{' '}
      </form>{' '}
    </Fragment>
  );
};

EditPort.propTypes = {
  createPortfolio: PropTypes.func.isRequired,
  getCurrentPort: PropTypes.func.isRequired,
  portfolio: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  protfolio: state.portfolio
});

export default connect(
  mapStateToProps,
  {
    createPortfolio,
    getCurrentPort
  }
)(withRouter(EditPort));
