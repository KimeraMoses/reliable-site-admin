import React from 'react';

import './OrderCard.styles.scss';

export function OrderCard() {
  return (
    <div className="order">
      <div className="order__header">
        <h3 className="order__header-heading">Orders</h3>
        <p className="order__header-text">
          All & Completed Orders Of Last Month
        </p>
      </div>
      <div className="order__chart">chart</div>
      <div className="order__card">
        <div
          className="order__card-inner"
          style={{ background: '#212e48 0% 0% no-repeat padding-box' }}
        >
          <div className="order__card-inner-icon">
            <img src="/icon/bulk-blue.svg" alt="" />
          </div>
          <div className="order__card-inner-text" style={{ color: '#3699FF' }}>
            All Orders
          </div>
        </div>
        <div
          className="order__card-inner"
          style={{ background: '#1C3238 0% 0% no-repeat padding-box' }}
        >
          <div className="order__card-inner-icon">
            <img src="/icon/bulk-green.svg" alt="" />
          </div>
          <div className="order__card-inner-text" style={{ color: '#0BB783' }}>
            Completed Orders
          </div>
        </div>
      </div>
    </div>
  );
}
