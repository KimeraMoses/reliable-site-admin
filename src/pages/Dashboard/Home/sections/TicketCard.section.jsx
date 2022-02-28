import React from 'react';

import './TicketCard.styles.scss';

export function TicketCard() {
  return (
    <div className="ticket-card">
      <div className="ticket-card__header">
        <h3 className="ticket-card__header-heading">Tickets</h3>
        <p className="ticket-card__header-text">Tickets Assigned To You</p>
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
          chart
        </div>
      </div>
    </div>
  );
}
