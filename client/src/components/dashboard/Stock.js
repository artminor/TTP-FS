import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import Moment from 'react-moment';
import moment from 'moment';

const Stock = ({ stock }) => {
  const stocks = stock.map(s => (
    <tr key={s._id}>
      <td> {s.ticker} </td> <td className="hide-sm"> {s.shares} </td>{' '}
      <td className="hide-sm"> {s.salePrice} </td>{' '}
      <td>
        {moment(s.date).format('llll')}
        {/* <Moment parse="YYYY-MM-DDTHH:mm"> {s.date} </Moment>{' '} */}
      </td>{' '}
      {/* potential sell stock function
      <td>
        <button className="btn btn-danger">Sell</button>
      </td> */}
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2"> Stocks </h2>{' '}
      <table className="table">
        <thead>
          <tr>
            <th> Ticker </th> <th> Shares </th>{' '}
            <th className="hide-sm"> Purchase Price </th>{' '}
            <th className="hide-sm"> Purchase Date </th>{' '}
          </tr>{' '}
        </thead>{' '}
        <tbody>{stocks}</tbody>
      </table>{' '}
    </Fragment>
  );
};

Stock.propTypes = {
  stock: PropTypes.array.isRequired
};

export default Stock;
