import React from 'react';
import { DashboardLayout } from 'layout';
import { TicketCard, OrderCard, IncomeCard, ForecastCard } from './sections';
import './Home.styles.scss';

function Home() {
  return (
    <DashboardLayout>
      <div className="bg-black/[.2] p-4 md:px-6 dashboard">
        <TicketCard />
        <OrderCard />
        <div />
        <IncomeCard />
        <ForecastCard />
        <div />
      </div>
    </DashboardLayout>
  );
}
export default Home;
