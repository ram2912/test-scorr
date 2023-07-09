import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function TablePreview({ key }) {
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeals();
  }, [key]);

  const fetchDeals = async () => {
    try {
      const response = await fetch('https://testback.scorr-app.eu/extract/deals', {
        credentials: 'include',
      });
      console.log('Deals stored');

      const data = await response.json();

      if (data.length > 0) {
        setHeaders(Object.keys(data[0].properties));
        setData(data);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper sx={{ width: '87vw', overflowX: 'auto', borderBottom: 'none', borderRadius: 'none' }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
            <CircularProgress />
          </div>
        ) : (
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHead>
                <TableRow>
                  {headers.map((header, i) => (
                    <TableCell key={i} style={{ minWidth: 170 }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map((row, i) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {headers.map((header, j) => (
                      <TableCell key={j} style={{ minWidth: 170, maxHeight: 50, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {row.properties[header]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          rowsPerPageOptions={[10, 20, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </ThemeProvider>
  );
}


