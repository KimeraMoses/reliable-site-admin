import React from 'react';

import './ForecastCard.styles.scss';

const incomelist = [
  {
    id: 0,
    text: 'Monthly Payment',
    price: '20,000 USD',
  },
  {
    id: 1,
    text: 'Annualy Payment',
    price: '20,000 USD',
  },
  {
    id: 2,
    text: 'Semi-Annual Payment',
    price: '20,000 USD',
  },
  {
    id: 3,
    text: 'Triennial Payment',
    price: '20,000 USD',
  },
  {
    id: 4,
    text: 'Monthly Payment',
    price: '20,000 USD',
  },
  {
    id: 5,
    text: 'Quarterly Payment',
    price: '20,000 USD',
  },
];

export function ForecastCard() {
  return (
    <div className="forecast">
      <div className="forecast__header">
        <div>
          <h3 className="forecast__header-heading">Forecast Overview</h3>
          <p className="forecast__header-text">
            forecast & Refunds Of Last Month
          </p>
        </div>
        <div className="forecast__header-price">120.000 USD</div>
      </div>
      <div className="forecast__box">
        <ul className="forecast__box-list">
          {incomelist.map(({ id, text, price }) => (
            <li key={id} className="forecast__box-list-item">
              <p className="forecast__box-list-item-txt">{text}</p>
              <p className="forecast__box-list-item-price">{price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
