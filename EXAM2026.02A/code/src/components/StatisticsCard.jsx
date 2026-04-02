import React, { useMemo } from 'react';

const StatisticsCard = ({ orders }) => {
  const stats = useMemo(() => {
    let total = orders.length;
    let revenue = 0;
    let pending = 0;
    let confirmed = 0;
    let shipped = 0;
    let delivered = 0;

    orders.forEach(o => {
      revenue += Number(o.price) * Number(o.quantity);
      if (o.status === 'pending') pending++;
      else if (o.status === 'confirmed') confirmed++;
      else if (o.status === 'shipped') shipped++;
      else if (o.status === 'delivered') delivered++;
    });

    return { total, revenue, pending, confirmed, shipped, delivered };
  }, [orders]);

  const formatCurrency = (val) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="card shadow-sm border border-light-subtle rounded-3 mt-0 mb-4 bg-white" style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}}>
      <div className="card-body p-4">
        <h5 className="fs-5 fw-bold text-dark mb-4">StatisticsCard</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="border border-light-subtle rounded-3 p-4 bg-white h-100">
              <div className="fs-5 fw-bold text-dark mb-1">{stats.total}</div>
              <div className="text-secondary fs-6">Tổng đơn</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="border border-light-subtle rounded-3 p-4 bg-white h-100">
              <div className="fs-5 fw-bold text-dark mb-1">{formatCurrency(stats.revenue)}</div>
              <div className="text-secondary fs-6">Doanh thu</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="border border-light-subtle rounded-3 p-4 bg-white h-100">
              <div className="fs-5 fw-bold text-dark mb-1">{stats.pending}</div>
              <div className="text-secondary fs-6">Pending</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="border border-light-subtle rounded-3 p-4 bg-white h-100">
              <div className="fs-5 fw-bold text-dark mb-1">{stats.confirmed}</div>
              <div className="text-secondary fs-6">Confirmed</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="border border-light-subtle rounded-3 p-4 bg-white h-100">
              <div className="fs-5 fw-bold text-dark mb-1">{stats.shipped}</div>
              <div className="text-secondary fs-6">Shipped</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="border border-light-subtle rounded-3 p-4 bg-white h-100">
              <div className="fs-5 fw-bold text-dark mb-1">{stats.delivered}</div>
              <div className="text-secondary fs-6">Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
