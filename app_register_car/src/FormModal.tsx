import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, Container, Modal, TextField } from '@mui/material';

type FormValues = {
  model: string;
  mark: string;
  year: number;
  price: number;
  photo: string;
};

interface IDataUser {
  model: string;
  mark: string;
  year: number;
  price: number;
  photo: string;
}

interface Props {
  showModal: boolean;
  hideModal: () => void;
  getUserInputs: (data: IDataUser) => void;
}

const FormModal: React.FC<Props> = props => {
  const { register, reset, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data: IDataUser) => {
    props.getUserInputs(data);
    reset();
    props.hideModal();
  };

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

  return (
    <>
      <Modal
        open={props.showModal}
        onClose={props.hideModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={styleModal}
      >
        <Container sx={{ width: '100%' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '5px',
                rowGap: '10px',
                backgroundColor: '#fff',
                padding: '10px',
              }}
            >
              <TextField {...register('mark')} variant='standard' label='Marca' />
              <TextField {...register('model')} variant='standard' label='Modelo' />
              <TextField {...register('year')} variant='standard' label='Ano' />
              <TextField type='number' {...register('price')} variant='standard' label='Preço' />
              <TextField type='url' {...register('photo')} variant='standard' label='Foto' />
              <Button type='submit' variant='contained'>
                Enviar
              </Button>
            </Box>
          </form>
        </Container>
      </Modal>
    </>
  );
};

export default FormModal;
