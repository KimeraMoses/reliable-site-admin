import React from 'react';

import './IncomeCard.styles.scss';

export function IncomeCard() {
  return (
    <div className="income">
      <div className="income__header">
        <h3 className="income__header-heading">Income Overview</h3>
        <p className="income__header-text">Income & Refunds Of Last Month</p>
      </div>
      <div className="income__chart">chart</div>
      <div className="income__card">
        <div
          className="income__card-inner"
          style={{ background: '#392F28 0% 0% no-repeat padding-box' }}
        >
          <div className="income__card-inner-icon">
            <img src="/icon/coin-yellow.svg" alt="" />
          </div>
          <div className="income__card-inner-text" style={{ color: '#FFA800' }}>
            Your Income
          </div>
        </div>
        <div
          className="income__card-inner"
          style={{ background: '#3A2434 0% 0% no-repeat padding-box' }}
        >
          <div className="income__card-inner-icon">
            <img src="/icon/coin-red.svg" alt="" />
          </div>
          <div className="income__card-inner-text" style={{ color: '#F64E60' }}>
            Your Refunds
          </div>
        </div>
      </div>
    </div>
  );
}
