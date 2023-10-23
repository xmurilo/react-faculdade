import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ResponsiveAppBar from './AppBar';
import {
  Container,
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import { FormValues, DataUser } from './Interfaces/types';

function App() {
  const { register, handleSubmit, reset, setFocus } = useForm<FormValues>();

  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [editModal, setOpenEditModal] = useState(false);
  const [editedTrip, setEditedTrip] = useState<DataUser>({} as DataUser);

  const [trip, setTrip] = useState<DataUser[]>([]);

  const [modalDestiny, setModalDestiny] = useState('');
  const [modalDate, setModalDate] = useState('');
  const [modalDuration, setModalDuration] = useState('');
  const [modalPrice, setModalPrice] = useState('');
  const [modalPhoto, setModalPhoto] = useState('');
  const [modalAttractions, setModalAttractions] = useState('');

  function generateUniqueId(): string {
    const timestamp = new Date().getTime(); // Obtém o timestamp atual em milissegundos
    const random = Math.floor(Math.random() * 10000); // Gera um número aleatório entre 0 e 9999
    return `${timestamp}-${random}`;
  }

  const handleData: SubmitHandler<FormValues> = (data: DataUser): void => {
    const uniqueId = generateUniqueId();
    const trip2 = [...trip];
    trip2.push({
      id: uniqueId,
      destiny: data.destiny,
      date: data.date,
      duration: data.duration,
      price: data.price,
      photo: data.photo,
      attractions: data.attractions,
    });
    setTrip(trip2);
    setFocus('destiny');
    reset({
      destiny: '',
      date: '',
      duration: '',
      price: '',
      photo: '',
      attractions: '',
    });
    localStorage.setItem('trip', JSON.stringify(trip2));
  };

  useEffect(() => {
    const trip = localStorage.getItem('trip');
    if (trip) {
      setTrip(JSON.parse(trip));
    }
  }, []);

  const handleOpen = (): void => {
    setOpenModal(true);
  };

  const showTrip = (index: number): void => {
    setOpenModal2(true);
    setModalDestiny(trip[index].destiny);
    setModalDate(trip[index].date);
    setModalDuration(trip[index].duration);
    setModalPrice(trip[index].price);
    setModalPhoto(trip[index].photo);
    setModalAttractions(trip[index].attractions);
  };

  const excludeTrip = (index: number): void => {
    const destiny = trip[index].destiny;
    if (confirm(`Confirmar exclusão de ${destiny}?`)) {
      const trip2 = [...trip];
      trip2.splice(index, 1);
      setTrip(trip2);
      localStorage.setItem('trip', JSON.stringify(trip2));
    }
  };

  const editTrip = (i: number): void => {
    setOpenEditModal(true);
    setEditedTrip(trip[i]);
  };

  const handleEditData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setEditedTrip({ ...editedTrip, [name]: value });
  };

  const saveEditedData = (): void => {
    const editedTripIndex = trip.findIndex(t => t.id === editedTrip.id);
    if (editedTripIndex !== -1) {
      const updatedTrip = [...trip];
      updatedTrip[editedTripIndex] = editedTrip;
      setTrip(updatedTrip);
      setOpenEditModal(false);
    }
  };

  const listTrip = trip.map((trip, i) => (
    <Card key={trip.id} sx={{ maxWidth: 345 }}>
      <CardMedia component='img' alt='green iguana' height='140' image={trip.photo} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {trip.destiny}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {trip.date}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {trip.duration}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          R$ {trip.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => showTrip(i)} size='small' variant='contained'>
          Ver detalhes
        </Button>
        <Button onClick={() => editTrip(i)} size='small' variant='outlined'>
          Editar
        </Button>
        <Button onClick={() => excludeTrip(i)} size='small' variant='contained' color='error'>
          Excluir
        </Button>
      </CardActions>
    </Card>
  ));

  const styleBoxModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
  };

  const styleBoxModal2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
  };

  const styleBoxImg = {
    width: '400px',
    margin: '0 auto',
  };

  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth='xl'>
        <Box>
          <Button onClick={handleOpen} variant='contained'>
            Cadrastar Roteiro
          </Button>
        </Box>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box sx={styleBoxModal}>
            <form
              onSubmit={handleSubmit(handleData)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box>
                <TextField
                  {...register('destiny')}
                  id='standard-basic'
                  label='Destino'
                  variant='standard'
                  sx={{ width: '100%' }}
                />
                <TextField
                  {...register('date')}
                  id='standard-basic'
                  label='Data'
                  variant='standard'
                  sx={{ width: '100%' }}
                />
                <TextField
                  {...register('duration')}
                  id='standard-basic'
                  label='Duração'
                  variant='standard'
                  sx={{ width: '100%' }}
                />
                <TextField
                  {...register('price')}
                  id='standard-basic'
                  label='Preço'
                  variant='standard'
                  sx={{ width: '100%' }}
                />
                <TextField
                  type='url'
                  {...register('photo')}
                  id='standard-basic'
                  label='Foto'
                  variant='standard'
                  sx={{ width: '100%' }}
                />
                <TextField
                  {...register('attractions')}
                  id='standard-basic'
                  label='Atrações'
                  variant='standard'
                  sx={{ width: '100%' }}
                />
              </Box>
              <Button type='submit' sx={{ marginTop: '20px' }} variant='outlined'>
                Cadrastrar
              </Button>
            </form>
          </Box>
        </Modal>
        {listTrip}
        <Modal open={openModal2} onClose={() => setOpenModal2(false)}>
          <Box sx={styleBoxModal2}>
            <Box sx={styleBoxImg}>
              <img
                style={{ width: '100%', borderRadius: '16px' }}
                src={modalPhoto}
                alt={modalDestiny}
              />
            </Box>
            <Typography variant='h5' component='div'>
              {modalDestiny}
            </Typography>
            <Typography sx={{ fontSize: '16px' }} variant='body2' color='text.secondary'>
              {modalDate}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {modalDuration}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              R$ {modalPrice}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {modalAttractions}
            </Typography>
          </Box>
        </Modal>

        {editModal && (
          <Modal open={true} onClose={() => setOpenEditModal(false)}>
            <Box sx={styleBoxModal}>
              <h1>Editar Viagem</h1>
              {editedTrip && (
                <form onSubmit={handleSubmit(handleData)}>
                  <TextField
                    type='text'
                    name='destiny'
                    onChange={handleEditData}
                    defaultValue={editedTrip.destiny}
                  />
                  <TextField
                    type='text'
                    name='date'
                    onChange={handleEditData}
                    defaultValue={editedTrip.date}
                  />
                  <TextField
                    type='text'
                    name='duration'
                    onChange={handleEditData}
                    defaultValue={editedTrip.duration}
                  />
                  <TextField
                    type='text'
                    name='price'
                    onChange={handleEditData}
                    defaultValue={editedTrip.price}
                  />
                  <TextField
                    type='text'
                    name='photo'
                    onChange={handleEditData}
                    defaultValue={editedTrip.photo}
                  />
                  <Box>
                    <Button
                      variant='contained'
                      color='error'
                      type='button'
                      onClick={() => setOpenEditModal(false)}
                    >
                      Cancelar
                    </Button>
                    <Button onClick={saveEditedData} variant='contained' type='submit'>
                      Salvar
                    </Button>
                  </Box>
                </form>
              )}
            </Box>
          </Modal>
        )}
      </Container>
    </>
  );
}

export default App;
