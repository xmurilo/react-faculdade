import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import IDataUser from './Interfaces';

interface Props {
  dataUser: IDataUser[];
}

const StatisticsModal: React.FC<Props> = props => {
  const [statistics, setStatistics] = useState({
    vehiclesRegister: 0,
    averagePrice: 0,
    modelMoreExpensive: '',
    vehicleMoreExpensive: {
      model: '',
      mark: '',
      year: 0,
      price: 0,
      photo: '',
    },
  });

  useEffect(() => {
    if (!props.dataUser.length) return;
    const vehiclesRegister = props.dataUser.length + 1;
    const averagePrice = props.dataUser.reduce(
      (acc, item) => (acc + item.price) / vehiclesRegister,
      0,
    );
    const vehicleMoreExpensive = props.dataUser.reduce((acc, item) => {
      if (acc.price > item.price) {
        return acc;
      }
      return item;
    });
    const modelMoreExpensive = vehicleMoreExpensive.model;
    setStatistics({
      vehiclesRegister,
      averagePrice,
      modelMoreExpensive,
      vehicleMoreExpensive,
    });
  }, [props.dataUser]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#f3f3f3',
          width: '400px',
          padding: '20px',
          marginBottom: '20px',
          borderRadius: '16px',
        }}
      >
        <Typography variant='subtitle1' color={'Highlight'}>
          Estatisticas
        </Typography>
        <Typography variant='subtitle1' color={'Highlight'}>
          Quantidade de Veiculos Registrados: {statistics.vehiclesRegister}
        </Typography>
        <Typography variant='subtitle1' color={'Highlight'}>
          Preço Médio dos Veiculos: {statistics.averagePrice.toFixed(2)}
        </Typography>
        <Typography variant='subtitle1' color={'Highlight'}>
          Modelo Mais Caro: {statistics.modelMoreExpensive}
        </Typography>
        <Typography variant='subtitle1' color={'Highlight'}>
          Veiculo Mais Caro: {statistics.vehicleMoreExpensive.model}
        </Typography>
      </Box>
    </>
  );
};

export default StatisticsModal;
