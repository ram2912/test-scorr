import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function TablePreview({ csvUrl }) {
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        Papa.parse(csvUrl, {
            download: true,
            header: true,
            complete: (results) => {
                if (results.data.length > 0) {
                    // Set headers
                    setHeaders(Object.keys(results.data[0]));
                    // Set data
                    setData(results.data);
                }
            }
        });
    }, [csvUrl]);

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
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead>
                            <TableRow>
                                {headers.map((header, i) => (
                                    <TableCell key={i} style={{ minWidth: 170 }}>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map((row, i) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                    {headers.map((header, j) => (
                                        <TableCell key={j} style={{ minWidth: 170 }}>{row[header]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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






