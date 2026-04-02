import React from 'react';
import OrderItem from './OrderItem';

const OrderList = ({ orders, onEdit, onDelete }) => {
  if (orders.length === 0) {
    return (
      <div className="card shadow-sm border border-light-subtle rounded-3 bg-white mb-0">
        <div className="card-body p-4">
          <h5 className="fs-5 fw-bold text-dark mb-3">OrderList</h5>
          <div className="alert alert-info border-0 d-flex align-items-center mb-0">
            <i className="bi bi-info-circle-fill fs-4 me-3"></i>
            <span>Empty</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm border border-light-subtle rounded-3 bg-white mb-0">
      
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="border-bottom text-secondary" style={{backgroundColor: '#f8f9fa'}}>
            <tr>
              <th className="fw-semibold py-3 border-0"><b>Scholarship name</b></th>
              <th className="fw-semibold py-3 border-0"><b>Sposor</b></th>
              <th className="fw-semibold py-3 border-0"><b>Value</b></th>
              <th className="fw-semibold py-3 border-0"><b>Email</b></th>
              <th className="fw-semibold py-3 border-0"><b>Deadline</b></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <OrderItem key={order.id} order={order} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
