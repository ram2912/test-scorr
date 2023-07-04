import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, useTheme, Typography } from '@mui/material';

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
        <Typography variant="subtitle1" color="inherit">
          {`${label} : ${payload[0].value}`}
        </Typography>
      </Paper>
    );
  }

  return null;
};

export default function BarChartExample() {
  const theme = useTheme();

  const data = [
    { name: 'Email Sentiment', value: 5 },
    { name: 'Close Date Push', value: 4 },
    { name: 'Property fill', value: 3.5 },
    { name: 'Response Time', value: 2 },
    { name: 'Stakeholder Involved', value: 1.7 },
  ];

  return (
    <Paper sx={{ backgroundColor: '#1c1c1c', p: 2, boxShadow: 'none' }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" fill={theme.palette.primary.main} width={500}>
          <CartesianGrid stroke="transparent" />
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{ fill: theme.palette.text.secondary, fontFamily: 'roboto' }} width={120} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#3c3c3c' }} />
          <Bar dataKey="value" fill="#90caf9" barSize={30} label={{ position: 'right', fill: 'grey', fontFamily: 'roboto' }} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

