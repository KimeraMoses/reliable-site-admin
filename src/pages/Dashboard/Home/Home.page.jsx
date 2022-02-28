import React from 'react';
import { DashboardLayout } from 'layout';
import { TicketCard, OrderCard, IncomeCard, ForecastCard } from './sections';

function Home() {
  return (
    <DashboardLayout>
      <div className="bg-black/[.2] p-4 md:px-6">
        <h2 className="text-xl font-normal text-white">Dashboard Page</h2>
        {/* <TicketCard /> */}
        {/* <OrderCard /> */}
        {/* <IncomeCard /> */}
        <ForecastCard />
      </div>
    </DashboardLayout>
  );
}
export default Home;
