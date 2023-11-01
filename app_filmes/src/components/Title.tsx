// interface PropsTitle {
//   title: string;
// }
const Title: React.FC = () => {
  return (
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
        <button type="button" className="btn btn-primary position-relative">
          Ver Carrinho <i className="bi bi-cart-fill"></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            0<span className="visually-hidden">unread messages</span>
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Title;
