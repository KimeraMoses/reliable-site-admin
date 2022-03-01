import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import './IncomeCard.styles.scss';

const data = [
  {
    name: '25-Feb',
    income: 50,
    refunds: 80,
  },
  {
    name: '26-Feb',
    income: 30,
    refunds: 20,
  },
  {
    name: '28-Feb',
    income: 90,
    refunds: 50,
  },
  {
    name: '01-Mar',
    income: 30,
    refunds: 20,
  },
  {
    name: '02-Mar',
    income: 85,
    refunds: 50,
  },
  {
    name: '02-Mar',
    income: 25,
    refunds: 30,
  },
  {
    name: '02-Mar',
    income: 90,
    refunds: 50,
  },
];

export function IncomeCard() {
  return (
    <div className="income">
      <div className="income__header">
        <h3 className="income__header-heading">Income Overview</h3>
        <p className="income__header-text">Income & Refunds Of Last Month</p>
      </div>
      <div className="income__chart">
        <ResponsiveContainer width="100%" height={150}>
          <LineChart
            width={500}
            height={150}
            data={data}
            margin={{ top: 0, right: -5, bottom: 0, left: -5 }}
          >
            <Line
              type="monotone"
              dataKey="income"
              stroke="#FFA800"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="refunds"
              stroke="#F64E60"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
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
