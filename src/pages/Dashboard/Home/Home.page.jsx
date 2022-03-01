import React from 'react';
import { DashboardLayout } from 'layout';
import { useMediaQuery } from 'react-responsive';
import { TicketCard, OrderCard, IncomeCard, ForecastCard } from './sections';
import './Home.styles.scss';

function Home() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1400px)',
  });

  return (
    <DashboardLayout>
      <div className="p-4 md:px-6 dashboard">
        <TicketCard />
        <OrderCard />
        {isDesktopOrLaptop && <div />}
        <IncomeCard />
        <ForecastCard />
        {isDesktopOrLaptop && <div />}
      </div>
    </DashboardLayout>
  );
}
export default Home;
