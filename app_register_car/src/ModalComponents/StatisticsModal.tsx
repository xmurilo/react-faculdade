import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import IDataUser from '../Interfaces';

interface Props {
  openStatistics: boolean;
  hideStatistics: () => void;
  dataUser: IDataUser[];
}

const styleModal = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
};

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
    const vehiclesRegister = props.dataUser.length;
    const averagePrice = props.dataUser.reduce(
      (acc, item) => acc + +item.price / vehiclesRegister,
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
      <Modal
        open={props.openStatistics}
        onClose={props.hideStatistics}
        sx={styleModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
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
            Preço Médio dos Veiculos:{' '}
            {statistics.averagePrice.toLocaleString('pt-br', {
              minimumFractionDigits: 2,
            })}
          </Typography>
          <Typography variant='subtitle1' color={'Highlight'}>
            Modelo Mais Caro: {statistics.modelMoreExpensive}
          </Typography>
          <Typography variant='subtitle1' color={'Highlight'}>
            Veiculo Mais Caro: {statistics.vehicleMoreExpensive.model}
          </Typography>
          <Button variant='contained' onClick={props.hideStatistics}>
            Fechar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default StatisticsModal;
