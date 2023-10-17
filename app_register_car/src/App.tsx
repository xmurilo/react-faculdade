import { useState, useEffect, useCallback } from 'react';
import FormModal from './ModalComponents/FormModal';
import StatisticsModal from './ModalComponents/StatisticsModal';
import IDataUser from './Interfaces';
import { AppBar, Box, Button, Container, TextField, Typography } from '@mui/material';
import Table from './Table/Table';

export default function App() {
  const [openModal, setOpenModal] = useState(false);
  const [openStatistics, setOpenStatistics] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [dataUser, setDataUser] = useState<IDataUser[]>([]);
  const [filteredDataUser, setFilteredDataUser] = useState<IDataUser[]>([]);
  const showModal = () => setOpenModal(true);
  const hideModal = () => setOpenModal(false);

  const showStatistics = () => setOpenStatistics(true);
  const hideStatistics = () => setOpenStatistics(false);

  const getUserInputs = useCallback(
    (newDataUser: IDataUser) => {
      setDataUser(prevDataUser => [...prevDataUser, newDataUser]);
      localStorage.setItem('dataUser', JSON.stringify([...dataUser, newDataUser]));
    },
    [dataUser],
  );

  useEffect(() => {
    const cars = localStorage.getItem('dataUser');
    if (cars) {
      setDataUser(JSON.parse(cars));
    }
    if (searchInput) {
      const filteredCars = dataUser.filter(item =>
        item.mark.toLowerCase().includes(searchInput.toLowerCase()),
      );
      // Não atualize dataUser diretamente, crie um novo estado para os carros filtrados
      setFilteredDataUser(filteredCars);
    } else {
      // Se a caixa de pesquisa estiver vazia, volte para a lista original
      setFilteredDataUser(dataUser);
    }
  }, [dataUser, searchInput]);

  return (
    <>
      <AppBar
        position='relative'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: '5px',
          }}
        >
          <Box width={'50px'}>
            <img
              width={'100%'}
              src='https://cdn-icons-png.flaticon.com/512/3054/3054929.png'
              alt=''
            />
          </Box>
          <Typography>MotorsGladi</Typography>
        </Box>
      </AppBar>

      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh',
          mt: '50px',
        }}
        maxWidth='xl'
      >
        <Box
          sx={{
            width: '400px',
            backgroundColor: '#F3f3f3f3',
            borderRadius: '16px',
            textAlign: 'center',
            padding: '10px',
            marginBottom: '20px',
          }}
        >
          <Typography variant='h4' color={'Highlight'}>
            Veiculos
          </Typography>
          <Button variant='contained' onClick={showModal}>
            Registrar Um Veiculo
          </Button>
          <Button sx={{ mt: 3 }} variant='contained' onClick={showStatistics}>
            Mostrar Estatisticas
          </Button>
          {filteredDataUser.length == 0 ? (
            <Typography variant='subtitle1'>
              Nenhuma estatistica encontrada, registre um veiculo para ver estatisticas
            </Typography>
          ) : (
            <StatisticsModal
              hideStatistics={hideStatistics}
              openStatistics={openStatistics}
              dataUser={dataUser}
            />
          )}
        </Box>
        <Box>
          <FormModal getUserInputs={getUserInputs} showModal={openModal} hideModal={hideModal} />
        </Box>

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
            Pesquisar Carro por Marca
          </Typography>
          <TextField
            sx={{ width: '100%', marginBottom: '10px' }}
            variant='standard'
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
        </Box>
        <Table filteredDataUser={filteredDataUser} />
      </Container>
    </>
  );
}
