import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

function createData(name, status, mainFactor) {
    return { name, status, mainFactor };
  }
  
  const rows = [
    createData('Reign Group', 'Best', 'Deal closed in 2 weeks'),
    createData('Roboto', 'Best', 'Meeting with CEO scheduled'),
    createData('Diamler Group', 'Best', 'Stakeholder is a friend'),
  ];
  
  export default function DealsDeepDive() {
    return (
      <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
        <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Deal Name</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Main Factor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={row.status}
                    color="success" // Change color to green
                  />
                </TableCell>
                <TableCell align="right">{row.mainFactor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  