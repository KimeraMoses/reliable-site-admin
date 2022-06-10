import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { FilterCheck, FilterIndicator } from '../../components';

let data = [];
for (let i = 1; i <= 12; i++) {
  data.push({
    month: moment(`${i}`, 'M').format('MMM'),
    totalCustomer: i * 20,
    totalAgent: i * 15,
  });
}

// 0 = ByCustomer, 1 = ByAgent, 2 = ByStatus, 3 = ByDepartment, 4 = ByPriority

export const AnnualIncomeReport = () => {
  const [filters, setFilters] = useState({
    byCustomer: true,
    byAgent: true,
  });
  return (
    <div className="m-[40px] max-w-[1367px]">
      {/* Filters */}
      <div className="w-full p-[18px] bg-[#1E1E2D] rounded-[8px]">
        <FilterCheck
          checked={filters?.byCustomer}
          name="byCustomer"
          label="Tickets by Customer"
          setFilters={setFilters}
        />
        <FilterCheck
          checked={filters?.byAgent}
          name="byAgent"
          label="Tickets by Agent"
          setFilters={setFilters}
        />
      </div>

      {/* Chart */}
      <div className="bg-[#1E1E2D] p-[32px] mt-[40px] rounded-[8px]">
        {/* Filter Indicator */}
        <div className="h-[52px] flex items-center justify-between">
          <div></div>
          <div className="flex items-center gap-[20px]">
            {filters?.byCustomer && (
              <FilterIndicator title="Tickets By Customer" bg="bg-[#8950FC]" />
            )}
            {filters?.byAgent && (
              <FilterIndicator title="Tickets By Agent" bg="bg-[#ffa800]" />
            )}
          </div>
        </div>
        {/* Chart Component */}
        <div className="mt-[32px]">
          {/* Heading */}
          <h5 className="text-[24px] text-white mb-[32px]">
            Annual Income Report
          </h5>
          {/* Chart */}
          <div className="w-full">
            <ResponsiveContainer width="100%" height={437}>
              <BarChart
                barSize={8}
                barGap={1}
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis
                  dataKey="month"
                  strokeDasharray="3 3"
                  stroke="#323248"
                  tick={{ fill: '#474761' }}
                />
                <YAxis
                  width={35}
                  strokeDasharray="3 3"
                  stroke="#323248"
                  tick={{ fill: '#474761' }}
                />
                <Bar
                  dataKey="totalCustomer"
                  fill="#8950FC"
                  hide={!filters?.byCustomer}
                />
                <Bar
                  dataKey="totalAgent"
                  fill="#FFA800"
                  hide={!filters?.byAgent}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
