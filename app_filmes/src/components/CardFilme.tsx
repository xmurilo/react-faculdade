import Swal from "sweetalert2";
interface PropsCardFilm {
  titulo: string;
  genero: string;
  sinopse: string;
  foto: string;
  preco: number;
  duracao: number;
  addFilm: (title: string, price:number) => void;
}

const CardFilm: React.FC<PropsCardFilm> = (props) => {
  const showSinopse = (): void => {
    Swal.fire({
      imageUrl: `${props.foto}`,
      imageHeight: 300,
      imageAlt: `Poster do filme do ${props.titulo}`,
      title: `${props.titulo}`,
      text: `${props.sinopse}`,
      confirmButtonText: "Fechar",
    });
  };
  return (
    <div className="col-sm-4 mb-3 mb-sm-0">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={props.foto}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.titulo}</h5>
              <p className="card-text">{props.genero}</p>
              <p className="card-text">
                Alugue por apenas R$:
                {props.preco.toLocaleString("pt-br", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p>
                <small>Duração: {props.duracao} min</small>
              </p>
              <button onClick={showSinopse} className="btn btn-sm btn-danger">
                Ver Sinopse <i className="bi bi-film"></i>
              </button>

              <button
                onClick={() => props.addFilm(props.titulo, props.preco)}
                className="btn btn-sm btn-primary float-end"
              >
                Alugar <i className="bi bi-cash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFilm;
