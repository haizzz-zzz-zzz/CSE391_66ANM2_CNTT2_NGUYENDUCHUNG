import React from 'react';

const OrderSummary = ({ orders }) => {
  const summary = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="card mt-4 shadow-sm border border-light-subtle rounded-3">
      <div className="card-header bg-white pt-3 pb-2 border-0">
        <h5 className="mb-0 fw-bold text-success">
          <i className="bi bi-pie-chart me-2"></i>Thống Kê Trạng Thái
        </h5>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between align-items-center px-0">
            <div><i className="bi bi-circle-fill text-warning me-2 small"></i>Pending</div>
            <span className="badge bg-warning text-dark rounded-pill px-3">{summary.pending || 0}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center px-0">
            <div><i className="bi bi-circle-fill text-info me-2 small"></i>Confirmed</div>
            <span className="badge bg-info text-dark rounded-pill px-3">{summary.confirmed || 0}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center px-0">
            <div><i className="bi bi-circle-fill text-primary me-2 small"></i>Shipped</div>
            <span className="badge bg-primary text-white rounded-pill px-3">{summary.shipped || 0}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center px-0 border-bottom-0">
            <div><i className="bi bi-circle-fill text-success me-2 small"></i>Delivered</div>
            <span className="badge bg-success text-white rounded-pill px-3">{summary.delivered || 0}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderSummary;
