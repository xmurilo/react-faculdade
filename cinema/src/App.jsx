import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
function App() {
  const [register, handleSubmit, setValue, watch] = useForm();
  
  return (
    <>
      <div className="container">
        <div className="card text-center">
          <div className="card-header">Escolha o filme:</div>
          <div className="card-body">{/* <img src={img} /> */}</div>
          <div className="container mb-5">
            <select className="form-select " aria-label="Default select example">
              <option value="barbie" selected>
                Barbie - R$12,00
              </option>
              <option value="sonic">Sonic - R$10,00</option>
              <option value="oppenheimer">Oppenheimer - R$11,00</option>
            </select>
            <div className="container-sm"></div>
          </div>
          <div className="card-footer text-body-secondary">
            <span>Total R$:</span> <span>12,00</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
