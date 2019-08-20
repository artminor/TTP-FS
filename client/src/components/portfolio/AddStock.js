import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addStock } from '../../actions/portfolio';

const AddStock = ({ addStock, history }) => {
  const [formData, setFormData] = useState({
    ticker: '',
    shares: ''
  });

  const { ticker, shares } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <p className="lead">
        <i className="fas fa-search-dollar" /> Purchase stocks
      </p>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          addStock(formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder=" ticker symbol"
            name="ticker"
            value={ticker}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            min="1"
            placeholder="  shares"
            name="shares"
            value={shares}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddStock.propTypes = {
  addStock: PropTypes.func.isRequired
};

export default connect(
  null,
  { addStock }
)(AddStock);
