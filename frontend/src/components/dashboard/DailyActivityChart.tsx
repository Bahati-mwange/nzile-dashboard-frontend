
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DailyActivityData {
  day: string;
  infractions: number;
  controles: number;
}

interface DailyActivityChartProps {
  data: DailyActivityData[];
}

const DailyActivityChart: React.FC<DailyActivityChartProps> = ({ data }) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip
            formatter={(value: number, name: string) => {
              const label = name === 'controles' ? 'Contrôles' : 'Infractions';
              return [`${value} ${label}`, ''];
            }}
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend />
          <Bar dataKey="controles" name="Contrôles" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
          <Bar dataKey="infractions" name="Infractions" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyActivityChart;
