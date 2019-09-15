import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      {/* <ul>
        <li>
          {' '} */}
      <Link to="/add-stock" className="btn btn-light">
        <i className="fab text-primary" /> BUY STOCK{' '}
      </Link>
      {/* </li>
        <hr />
        <li>
          <Link to="/sell-stock" className="btn btn-light">
            <i className="fab text-primary" /> SELL STOCK{' '}
          </Link>{' '}
        </li>
      </ul> */}
    </div>
  );
};

export default DashboardActions;
