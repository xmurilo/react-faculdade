import { useState } from 'react';
import './App.css';

function App() {
  const [sinaleira, setSinaleira] = useState('vermelha.png');
  const [aviso, setAviso] = useState('Sinal Vermelho: PROIBIDO AVANÇAR !!');

  function trocarSinaleira() {
    if (sinaleira == 'vermelha.png') {
      setSinaleira('verde.png');
      setAviso('Sinal Verde: Avançar ');
    } else if (sinaleira == 'verde.png') {
      setSinaleira('amarela.png');
      setAviso('Sinal Amarelo: ATENÇÃO !!');
    } else {
      setSinaleira('vermelha.png');
      setAviso('Sinal Vermelho: PROIBIDO AVANÇAR !!');
    }
  }

  return (
    <>
      <h1 className="titulo">Escola de trânsito</h1>
      <h2>Aula de Sinaleiras</h2>
      <hr />
      <img src={sinaleira} alt="Sinaleira vermelha" onClick={trocarSinaleira} />
      <br />
      <h2 className='titulo'>{aviso}</h2>
    </>
  );
}

export default App;
