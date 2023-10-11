/* eslint-disable react/prop-types */
import { Fragment } from 'react';
const ListaJogadores = props => {
  return <Fragment>
    { props.jogadores.map(jogador => {
    return (
      <ul key={jogador.id}>
        <li>
          <img src={jogador.imagem} width={200} />
        </li>
      </ul>
    );
  })}
  </Fragment>;
};

export default ListaJogadores;
