import React from 'react';
import { ITableProps } from './InterfacesTable';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const columnHead = ['Modelo', 'Marca', 'Ano', 'Preço', 'Foto'];
const TableComp: React.FC<ITableProps> = props => {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {columnHead.map(item => (
                <TableCell key={item}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.filteredDataUser.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.model}</TableCell>
                <TableCell>{data.mark}</TableCell>
                <TableCell>{data.year}</TableCell>
                <TableCell>{data.price}</TableCell>
                <TableCell>
                  <img width={'100px'} src={data.photo} alt={data.model} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComp;
