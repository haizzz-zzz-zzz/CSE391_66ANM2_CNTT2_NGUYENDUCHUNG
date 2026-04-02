import React, { useState, useEffect, useMemo, useCallback } from 'react';
import OrderForm from './components/OrderForm';
import FilterBar from './components/FilterBar';
import StatisticsCard from './components/StatisticsCard';
import OrderList from './components/OrderList';
import ToastContainer from './components/ToastContainer';

function App() {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('ecommerce_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [filters, setFilters] = useState({ status: '', startDate: '', endDate: '', search: '' });
  const [editingId, setEditingId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  useEffect(() => {
    localStorage.setItem('ecommerce_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  }, []);

  const handleAddOrUpdate = useCallback((orderData, isError = false) => {
    if (isError) {
      showToast("Thông tin không hợp lệ!", "error");
      return;
    }

    if (editingId) {
      setOrders(prev => prev.map(o => o.id === editingId ? { ...orderData, id: editingId } : o));
      showToast("Cập nhật đơn hàng thành công!", "success");
      setEditingId(null);
    } else {
      const newId = Date.now();
      const newOrder = { ...orderData, id: newId };
      setOrders(prev => [newOrder, ...prev]);
      showToast(`Thêm đơn hàng #${newId.toString().slice(-6)} thành công!`, "success");
      if (orderData.status === 'pending') {
        setTimeout(() => showToast("Đang xử lý...", "info"), 600);
      }
    }
    setShowFormModal(false);
  }, [editingId, showToast]);

  const handleDelete = useCallback((id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    showToast("Xóa đơn hàng thành công!", "success");
  }, [showToast]);

  const handleEdit = useCallback((order) => {
    setEditingId(order.id);
    setShowFormModal(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setShowFormModal(false);
  }, []);

  const handleOpenAddModal = useCallback(() => {
    setEditingId(null);
    setShowFormModal(true);
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      let match = true;
      if (filters.status && o.status !== filters.status) match = false;
      if (filters.startDate && o.orderDate && o.orderDate < filters.startDate) match = false;
      if (filters.endDate && o.orderDate && o.orderDate > filters.endDate) match = false;
      if (filters.search) {
        const query = filters.search.toLowerCase();
        if (!o.scholarshipName.toLowerCase().includes(query) &&
          !o.phone.includes(query) &&
          !o.address.toLowerCase().includes(query)) {
          match = false;
        }
      }
      return match;
    });
  }, [orders, filters]);

  return (
    <>
    
    <div className="container-fluid min-vh-100 py-4 font-sans">
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-3 mt-2">
          <h4 className="fw-bold m-0 text-dark fs-4 tracking-tight">Scholarship catalog</h4>
          
          <div className="d-flex align-items-center gap-3">
            
            
          </div>
          
          
        </div>
      
        {/* OrderList - main.png */}
        <OrderForm
                    orderToEdit={orders.find(o => o.id === editingId)}
                    onSubmit={handleAddOrUpdate}
                    onCancel={handleCancelEdit}
                  />
        <OrderList
          orders={filteredOrders}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* StatisticsCard - card.png, liền ngay dưới OrderList */}
       
        {/* Modal chứa OrderForm + FilterBar - form.png */}
        

        <ToastContainer toast={toast} />
      </div>
    </div>
    </>
  );
}

export default App;
