import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import './OrderCard.styles.scss';

const data = [
  {
    name: '25-Feb',
    all: 50,
    complete: 80,
  },
  {
    name: '26-Feb',
    all: 30,
    complete: 20,
  },
  {
    name: '28-Feb',
    all: 90,
    complete: 50,
  },
  {
    name: '01-Mar',
    all: 30,
    complete: 20,
  },
  {
    name: '02-Mar',
    all: 85,
    complete: 50,
  },
  {
    name: '02-Mar',
    all: 25,
    complete: 30,
  },
  {
    name: '02-Mar',
    all: 90,
    complete: 50,
  },
];

export function OrderCard() {
  return (
    <div className="order">
      <div className="order__header">
        <h3 className="order__header-heading">Orders</h3>
        <p className="order__header-text">
          All & Completed Orders Of Last Month
        </p>
      </div>
      <div className="order__chart">
        <ResponsiveContainer width="100%" height={150}>
          <LineChart
            width={500}
            height={150}
            data={data}
            margin={{ top: 0, right: -5, bottom: 0, left: -5 }}
          >
            <Line
              type="monotone"
              dataKey="all"
              stroke="#3699FF"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="complete"
              stroke="#0BB783"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
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
