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
      {portfolio !== null ? (
        <Fragment>
          <TransactionList transaction={portfolio.transaction} />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have no transactions, please buy some stocks.</p>
        </Fragment>
      )}
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
  { getCurrentPort }
)(Transaction);

// const Transaction = ({ transaction }) => {
//   console.log(transaction);
//   const transactions = transaction.map(s => (
//     <tr key={s._id}>
//       <td> {s.companyName} </td>
//       <td> {s.ticker} </td>
//       <td> {s.shares} </td>
//       <td> {s.salePrice} </td>
//       <td className="hide-sm">
//         {s.shares} * ${s.salePrice}
//       </td>
//       <td>{moment(s.date).format('llll')}</td>
//     </tr>
//   ));

//   return (
//     <Fragment>
//       <h2 className="my-2"> Transactions </h2>
//       <table className="table">
//         <thead>
//           <tr>
//             <th> Company </th>
//             <th> Ticker </th>
//             <th> Shares </th>
//             <th> Price/Share </th>
//             <th className="hide-sm"> Total Cost </th>
//             <th className="hide-sm"> Purchase Date </th>
//           </tr>
//         </thead>
//         <tbody>{transactions}</tbody>
//       </table>
//     </Fragment>
//   );
// };

// Transaction.propTypes = {
//   transaction: PropTypes.array.isRequired
// };

// export default Transaction;
