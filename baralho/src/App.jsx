import objetoJogadores from './ObjetoJogadores';
import ListaJogadores from './ListaJogadores';
function App() {
  return (
    <>
      <div className="card text-center">
        <div className="card-header">
          <div className="row">
            <input type="text" />
            <input type="text" /> 
          </div>

          <button>App</button>
        </div>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            <ListaJogadores jogadores={objetoJogadores} />
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
        <div className="card-footer text-body-secondary">2 days ago</div>
      </div>
    </>
  );
}

export default App;
