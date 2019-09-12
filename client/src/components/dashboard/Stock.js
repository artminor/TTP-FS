import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Stock = ({ stock }) => {
  // let temp = 0;
  // total = stock.map(s => <div>{(temp += s.shares * s.open)}</div>);
  // total = temp.toFixed(2);

  const stocks = stock.map(s => (
    <tr
      key={s._id}
      className={
        s.open === s.salePrice
          ? 'grey-text'
          : s.open < s.salePrice
          ? 'red-text'
          : 'green-text'
      }
    >
      <td>{s.companyName}</td>
      <td> {s.ticker.toUpperCase()} </td>
      <td className="hide-sm">{s.shares}</td>
      <td className="hide-sm">$ {Number(s.open).toFixed(2)}</td>
      {/* potential sell stock function
      <td>
        <button className="btn btn-danger">Sell</button>
      </td> */}
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">
        {' '}
        <i className="fas fa-wallet"> Portfolio</i>
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th> Company</th>
            <th> Ticker </th> <th> Shares </th>
            <th className="hide-sm"> Current Value/Share </th>
            {/* <th className="hide-sm"> Purchase Date </th> */}
          </tr>
        </thead>
        <tbody>{stocks}</tbody>
      </table>
    </Fragment>
  );
};

Stock.propTypes = {
  stock: PropTypes.array.isRequired
};

export default Stock;
