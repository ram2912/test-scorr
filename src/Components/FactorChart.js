import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, useTheme, Typography } from '@mui/material';

const CustomTooltip = ({ active, payload, label }) => {
  const theme = useTheme();

  if (active && payload && payload.length) {
    const value = payload[0]?.payload?.Importance;

    if (typeof value !== 'number') {
      return null; // Skip rendering if the value is not a valid number
    }

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
          {`${label} : ${value.toFixed(3)}%`}
        </Typography>
      </Paper>
    );
  }

  return null;
};


export default function BarChartExample({ factors }) {
  const theme = useTheme();

  if (!factors || !factors['Top Features without Values'] || !factors['Factor Importance (Percentage)']) {
    // Handle the case where factors data is missing or incomplete
    return <div>No data available</div>;
  }

  const topFeatures = factors['Top Features without Values'];
  const factorImportance = factors['Factor Importance (Percentage)'];

  const topFeaturesData = topFeatures.map((feature) => {
    const featureName = feature.Feature.split("_")[0];
    const featureValue = feature.Feature.split("_")[1];
    
    return `${featureName} : ${featureValue}`;
    
  });

  const factorImportanceData = factorImportance.map((factor) => ({
    Factor: factor.Factor,
    Importance: (factor.Importance * 100).toFixed(3),
  }));

  return (
    <Paper sx={{ backgroundColor: '#1c1c1c', p: 2, boxShadow: 'none' }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={factorImportanceData} layout="vertical" fill={theme.palette.primary.main} width={500}>
          <CartesianGrid stroke="transparent" />
          <XAxis type="number" hide />
          <YAxis dataKey="Factor" type="category" tickLine={false} axisLine={false} tick={{ fill: theme.palette.text.secondary, fontFamily: 'roboto' }} width={120} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#3c3c3c' }} />
          <Bar dataKey="Importance" fill="#90caf9" barSize={30} label={{ position: 'right', fill: 'grey', fontFamily: 'roboto' }} />
        </BarChart>
      </ResponsiveContainer>

      <Typography variant="h6" component="h2" color="text.primary" sx={{ mt: 4 }}>
        Factor Importance
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Factors ranked by importance
      </Typography>

      <ol>
  {topFeaturesData.map((feature, index) => (
    <li key={index}>
      <Typography variant="subtitle1" color="text.primary">
        {feature}
      </Typography>
    </li>
  ))}
</ol>
    </Paper>
  );
}
