import React from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell } from 'recharts';
import './style.scss';

// Sample data
const d1 = [
  { name: 'Un-Assigned', value: 40 },
  { name: 'Assigned', value: 60 },
];

// Sample data
const d2 = [
  { name: 'Un-Assigned', value: 25 },
  { name: 'Assigned', value: 75 },
];

// Sample data
const d3 = [
  { name: 'Un-Assigned', value: 0 },
  { name: 'Assigned', value: 100 },
];

// Sample data
const d4 = [
  { name: 'Un-Assigned', value: 0 },
  { name: 'Assigned', value: 100 },
];

export function Tickets() {
  const { t } = useTranslation('/Tickets/ns');
  return (
    <div className="ticket-card">
      <div className="ticket-card__header">
        <h3 className="ticket-card__header-heading">{t('heading')}</h3>
        <p className="ticket-card__header-text">{t('desc')}</p>
      </div>
      <div className="ticket-card__inner">
        <div className="ticket-card__inner-left">
          <div className="ticket-card__inner-left-text">
            <h3
              className="ticket-card__inner-left-text-heading"
              style={{ color: '#0BB783' }}
            >
              Departament 1
            </h3>
            <p className="ticket-card__inner-left-text-txt">60%</p>
          </div>
          <div className="ticket-card__inner-left-text">
            <h3
              className="ticket-card__inner-left-text-heading"
              style={{ color: '#3699FF' }}
            >
              Departament 2
            </h3>
            <p className="ticket-card__inner-left-text-txt">75%</p>
          </div>
          <div className="ticket-card__inner-left-text">
            <h3
              className="ticket-card__inner-left-text-heading"
              style={{ color: '#F64E60' }}
            >
              Departament 3
            </h3>
            <p className="ticket-card__inner-left-text-txt">100%</p>
          </div>
          <div className="ticket-card__inner-left-text">
            <h3
              className="ticket-card__inner-left-text-heading"
              style={{ color: '#8950FC' }}
            >
              Departament 4
            </h3>
            <p className="ticket-card__inner-left-text-txt">100%</p>
          </div>
        </div>
        <div className="ticket-card__inner-right" style={{ color: '#FFFFFF' }}>
          <PieChart width={250} height={250}>
            <Pie
              data={d1}
              dataKey="value"
              stroke="none"
              outerRadius={120}
              innerRadius={104}
              endAngle={450}
              startAngle={80}
              paddingAngle={-10}
            >
              <Cell fill="#151521" />
              <Cell fill="#0BB783" cornerRadius={10} />
            </Pie>
            <Pie
              data={d2}
              dataKey="value"
              stroke="none"
              outerRadius={94}
              innerRadius={78}
              endAngle={450}
              startAngle={80}
              paddingAngle={-10}
            >
              <Cell fill="#151521" />
              <Cell fill="#3699FF" cornerRadius={10} />
            </Pie>
            <Pie
              data={d3}
              dataKey="value"
              stroke="none"
              outerRadius={68}
              innerRadius={52}
              endAngle={450}
              startAngle={80}
              paddingAngle={-10}
            >
              <Cell fill="#151521" />
              <Cell fill="#F64E60" cornerRadius={10} />
            </Pie>
            <Pie
              data={d4}
              dataKey="value"
              stroke="none"
              outerRadius={42}
              innerRadius={26}
              endAngle={450}
              startAngle={80}
              paddingAngle={-10}
            >
              <Cell fill="#151521" />
              <Cell fill="#8950FC" cornerRadius={10} />
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
}
