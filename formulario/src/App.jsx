import { useForm } from 'react-hook-form';
import './App.css';
function App() {
  const { register, handleSubmit } = useForm();
  function dados(dado){
    
  }
  return (
    <>
      <form onSubmit={handleSubmit(dados)}>
        <div>
          <label htmlFor="nome">
            <input id="nome" {...register('Nome')} placeholder="Nome" />
          </label>
        </div>
        <div>
          <label htmlFor="Masculino">
            <input type="radio" id="masculino" {...register('Sexo')} /> masculino
          </label>

          <label htmlFor="feminino">
            <input type="radio" id="feminino" {...register('Sexo')} />
          </label>
        </div>
        <div>
          <input {...register('Altura')} />
        </div>
      </form>

      <h2></h2>
    </>
  );
}

export default App;
