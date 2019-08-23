import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const Stock = ({ stock }) => {
  const stocks = stock.map(s => (
    <tr key={s._id}>
      <td>{s.ticker}</td>
      <td className="hide-sm">{s.shares}</td>
      <td className="hide-sm">{s.salePrice}</td>
      <td>
        <Moment format="YYYY/MM/DD">{s.date}</Moment>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my2">Stocks</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Shares</th>
            <th className="hide-sm">Purchase Price</th>
            <th className="hide-sm">Purchase Date</th>
          </tr>
        </thead>
      </table>
    </Fragment>
  );
};

Stock.propTypes = {
  stock: PropTypes.array.isRequired
};

export default Stock;