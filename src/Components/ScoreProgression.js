import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, useTheme } from '@mui/material';

const CustomTooltip = ({ active, payload, label }) => {
  const theme = useTheme();

  if (active && payload && payload.length) {
    return (
      <Paper
        sx={{
          backgroundColor: theme.palette.background.default,
          p: 1,
          color: theme.palette.text.primary,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize,
          fontWeight: theme.typography.body2.fontWeight,
        }}
      >
        <p>{`${label} : ${payload[0].value}`}</p>
      </Paper>
    );
  }

  return null;
};

export default function LineChartExample() {
  const theme = useTheme();

  const data = [
    { date: '2022-08-01', score: 60 },
    { date: '2022-09-01', score: 45 },
    { date: '2022-10-01', score: 46 },
    { date: '2022-11-01', score: 50 },
    { date: '2022-12-01', score: 75 },
    { date: '2023-01-01', score: 80 },
    { date: '2023-02-01', score: 60 },
    { date: '2023-03-01', score: 40 },
    { date: '2023-04-01', score: 35 },
    { date: '2023-05-01', score: 30 },
  ];

  return (
    <Paper sx={{ backgroundColor: '#1c1c1c', p: 2, boxShadow: 'none' }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.text.secondary} />
          <XAxis dataKey="date" tick={{ fill: theme.palette.text.secondary, fontFamily: 'roboto' }} />
          <YAxis tick={{ fill: theme.palette.text.secondary, fontFamily: 'roboto' }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#3c3c3c' }} />
          <Line type="monotone" dataKey="score" stroke={theme.palette.primary.main} strokeWidth={2} dot={{ stroke: theme.palette.primary.main, strokeWidth: 2, r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}
