import { Film } from "../App";
import Swal from "sweetalert2";
interface PropsTitle {
  shopping: Film[];
}
const Title: React.FC<PropsTitle> = (props) => {
  const showCart = (): void => {
    const totalPrice = props.shopping.reduce((acc, film) => {
      return acc + film.price;
    }, 0);

    Swal.fire({
      title: "Carrinho de Compras",
      html: `<table>
      <tr>
        <td>Quantidade de Filmes:</td>
        <td>${props.shopping.length}</td>
      </tr>
      <tr>
          <td></td>
      </tr>
      </table>
      <h1>Total R$: ${totalPrice.toLocaleString("pt-br", { minimumFractionDigits: 2 })}</h1>
        `,
      confirmButtonText: "Fechar",
    });
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img
              src="../../public/logo.jpg"
              alt="Logo"
              width="80"
              height="80"
              className="d-inline-block align-text-top me-3"
            />
            AvenidaVideo: Plataforma de Filmes Online
          </a>
          <button
            type="button"
            className="btn btn-primary position-relative"
            onClick={showCart}
          >
            Ver Carrinho <i className="bi bi-cart-fill"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {props.shopping.length}
              <span className="visually-hidden">test</span>
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Title;
