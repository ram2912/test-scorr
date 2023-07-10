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

export default function BarChartExample({ factors }) {
  const theme = useTheme();

  const data = factors.map((factor) => ({
    name: factor.Feature,
    value: factor.Importance,
  }));

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

