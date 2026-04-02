import React from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleClear = () => {
    onFilterChange({ status: '', startDate: '', endDate: '', search: '' });
  };

  return (
    <div className="card shadow-sm border border-light-subtle rounded-3 mb-4 bg-white">
      <div className="card-body p-4">
        <h5 className="fs-5 fw-bold text-dark mb-4">FilterBar</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label text-secondary mb-1" style={{fontSize: '0.9rem'}}>Trạng thái</label>
            <select className="form-select" name="status" value={filters.status} onChange={handleChange}>
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label text-secondary mb-1" style={{fontSize: '0.9rem'}}>Từ ngày</label>
            <input type="date" className="form-control" name="startDate" value={filters.startDate} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label text-secondary mb-1" style={{fontSize: '0.9rem'}}>Đến ngày</label>
            <input type="date" className="form-control" name="endDate" value={filters.endDate} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label text-secondary mb-1" style={{fontSize: '0.9rem'}}>Tìm kiếm (Tên/Phone/Địa chỉ)</label>
            <input type="text" className="form-control" name="search" value={filters.search} onChange={handleChange} placeholder="Search..." />
          </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleClear}>Xóa filter</button>
      </div>
    </div>
  );
};

export default FilterBar;
