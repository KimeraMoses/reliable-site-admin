import React from 'react';
import { DashboardLayout } from 'layout';
import { useMediaQuery } from 'react-responsive';
import { IncomeCard, ForecastCard } from './sections';
import { Tickets, Orders } from 'modules';
import './Home.styles.scss';

function Home() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1400px)',
  });

  return (
    <DashboardLayout>
      <div className="p-4 md:px-6 dashboard">
        {/* <TicketCard /> */}
        <Tickets />
        <Orders />
        {isDesktopOrLaptop && <div />}
        <IncomeCard />
        <ForecastCard />
        {isDesktopOrLaptop && <div />}
      </div>
    </DashboardLayout>
  );
}
export default Home;
