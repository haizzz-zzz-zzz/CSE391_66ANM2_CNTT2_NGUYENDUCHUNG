import React from 'react';

const ToastContainer = ({ toast }) => {
  if (!toast.show) return null;

  const bgClass =
    toast.type === 'success' ? 'bg-success text-white' :
    toast.type === 'error' ? 'bg-danger text-white' :
    toast.type === 'info' ? 'bg-info text-dark' : 'bg-primary text-white';

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1055 }}>
      <div className={`toast show align-items-center border-0 ${bgClass}`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">
            {toast.message}
          </div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => toast.onClose && toast.onClose()} aria-label="Close"></button>
        </div>
      </div>
    </div>
  );
};

export default ToastContainer;
