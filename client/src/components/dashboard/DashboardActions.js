import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/add-stock" className="btn btn-light">
        <i className="fab text-primary" /> BUY STOCK
      </Link>
    </div>
  );
};

export default DashboardActions;
