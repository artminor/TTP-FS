import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

const Transaction = ({ transaction }) => {
  const transactions = transaction.map(s => (
    <tr key={s._id}>
      <td> {s.companyName} </td> <td> {s.ticker.toUpperCase()} </td>{' '}
      <td> {s.shares} </td> <td> $ {s.salePrice} </td>{' '}
      <td className="hide-sm"> $ {(s.shares * s.salePrice).toFixed(2)} </td>{' '}
      <td> {moment(s.date).format('llll')} </td>{' '}
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2"> Transactions </h2>{' '}
      <table className="table">
        <thead>
          <tr>
            <th> Company </th> <th> Ticker </th> <th> Shares </th>{' '}
            <th> Price / Share </th> <th className="hide-sm"> Total Cost </th>{' '}
            <th className="hide-sm"> Purchase Date </th>{' '}
          </tr>{' '}
        </thead>{' '}
        <tbody> {transactions} </tbody>{' '}
      </table>{' '}
    </Fragment>
  );
};

Transaction.propTypes = {
  transaction: PropTypes.array.isRequired
};

export default Transaction;
