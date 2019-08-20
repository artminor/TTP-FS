import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addStock } from '../../actions/portfolio';

const AddStock = ({ addPortfolio, history }) => {
  const [formData, setFormData] = useState({
    ticker: '',
    shares: ''
  });

  const { ticker, shares } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <p class="lead">
        <i class="fas fa-search-dollar" /> Purchase stocks
      </p>
      <form
        class="form"
        onSubmit={e => {
          e.preventDefault();
          addStock(formData, history);
        }}
      >
        <div class="form-group">
          <input
            type="text"
            placeholder=" ticker symbol"
            name="ticker"
            value={ticker}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
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

        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
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
