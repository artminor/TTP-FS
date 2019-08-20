import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPortfolio, getCurrentPort } from '../../actions/portfolio';

const CreatePortfolio = ({createPortfolio, history}) => {
    const [formData, setFormData] = useState({stock:[]});
    const {stock} = formData;

  const onSubmit = e => {
    e.preventDefault();
    createPortfolio(formData, history);
  };

    return (
      <Fragment>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <p>Are you sure you want to create an account with us?</p>
          <p>Possibly enter ssn...etc</p>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </Fragment>
    );
}

CreatePortfolio.propTypes = {
    createPortfolio:PropTypes.func.isRequired,
}


export default connect(null, {createPortfolio})(withRouter(CreatePortfolio));
