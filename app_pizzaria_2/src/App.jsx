import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit, reset, setFocus, watch } = useForm();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [pizzas, setPizzas] = useState([]);
  const [modalNome, setModalNome] = useState("");
  const [modalIngredientes, setModalIndredientes] = useState("");
  const [modalFoto, setModalFoto] = useState("");

  function mostrarPizza(index) {
    setOpen2(true);
    setModalNome(pizzas[index].nome);
    setModalIndredientes(pizzas[index].ingredientes);
    setModalFoto(pizzas[index].foto);
  }

  function excluirPizza(index) {
    const nome = pizzas[index].nome;
    if (confirm(`Confimar a exclusão da ${nome}?`)) {
      const pizzas2 = [...pizzas];
      pizzas2.splice(index, 1);
      setPizzas(pizzas2)
      localStorage.setItem("pizzas", JSON.stringify(pizzas2))
    }
  }

  function gravaDados(data) {
    // atribui todo o conteúdo de pizzas para uma variável temporária
    const pizzas2 = [...pizzas];
    // adiciona um novo elemento (objeto) ao vetor pizzas2
    pizzas2.push({
      nome: data.nome,
      ingredientes: data.ingredientes,
      foto: data.foto,
    });
    // muda o conteúdo da variável de estado
    setPizzas(pizzas2);
    // joga o foco no campo produto
    setFocus("nome");
    // limpa os campos do formulário
    reset({ nome: "", ingredientes: "", foto: "" });

    // localStorage.setItem: salva os dados no navegador
    // JSON.stringify(): converte o array de objetos em uma string
    //                   semelhante ao Number()
    localStorage.setItem("pizzas", JSON.stringify(pizzas2));
  }

  // percorre todos os elementos do vetor pizzas e acrescenta
  // as tags HTML para renderização
  const listaPizzas = pizzas.map((pizza, i) => (
    <tr key={i}>
      <td>{pizza.nome}</td>
      <td>{pizza.ingredientes}</td>
      <td>
        <img
          src={pizza.foto}
          alt={`Foto da Pizza ${pizza.nome}`}
          width={150}
          height={100}
        />
      </td>
      <td>
        <i
          className="bi bi-search fs-4 text-info ms-2"
          style={{ cursor: "pointer" }}
          title="Ver Detalhes"
          onClick={() => mostrarPizza(i)}
        ></i>
        <i
          className="bi bi-trash3 fs-4 text-danger"
          style={{ cursor: "pointer" }}
          title="Excluir Pizza"
          onClick={() => excluirPizza(i)}
        ></i>
      </td>
    </tr>
  ));

  // serve para programar um "efeito colateral", ou seja,
  // após algo acontecer na app
  // com [], indica que será executado apenas quando o componente é
  // renderizado
  useEffect(() => {
    // se houver dados salvos em localStorage, carrega eles
    if (localStorage.getItem("pizzas")) {
      // obtém os dados salvos em localStorage
      // converte a string em um array de objetos
      const pizzas2 = JSON.parse(localStorage.getItem("pizzas"));
      // altera o conteúdo das variáveis de estado
      setPizzas(pizzas2);
    }
  }, []);

  return (
    <div className="container-fluid">
      <nav className="navbar bg-danger">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            <img
              src="./logo.png"
              alt="Logo"
              width="48"
              height="40"
              className="d-inline-block align-text-top me-2"
            />
            App Pizzaria: Controle do Cardápio de Pizzas
          </a>
        </div>
      </nav>

      <div className="container mt-2">
        <h2 className="d-flex justify-content-between">
          <span>Listagem das Pizzas Disponíveis</span>
          <button className="btn btn-danger px-3" onClick={() => setOpen(true)}>
            Adicionar
          </button>
        </h2>

        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Nome da Pizza</th>
              <th>Ingredientes</th>
              <th>Foto</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{listaPizzas}</tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} center>
        <div className="card">
          <div className="card-header">Inclusão de Pizzas no Cardápio</div>
          <form className="card-body" onSubmit={handleSubmit(gravaDados)}>
            <h5 className="card-title">Informe os Detalhes da Pizza</h5>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">
                Nome da Pizza:
              </label>
              <input
                type="text"
                className="form-control"
                id="nome"
                required
                {...register("nome")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ingredientes" className="form-label">
                Ingredientes:
              </label>
              <textarea
                className="form-control"
                id="ingredientes"
                rows="3"
                required
                {...register("ingredientes")}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="foto" className="form-label">
                URL da Foto:
              </label>
              <input
                type="url"
                className="form-control"
                id="foto"
                required
                {...register("foto")}
              />
            </div>
            <input
              type="submit"
              value="Enviar"
              className="btn btn-primary px-5"
            />
          </form>
          {watch("foto") && (
            <img
              src={watch("foto")}
              className="rounded mx-auto d-block"
              alt="Foto Pizza"
              width={240}
              height={200}
            />
          )}
        </div>
      </Modal>
      {/* const [modalNome, setModalNome] = useState("");
  const [modalIngredientes, setModalIndredientes] = useState("");
  const [modalFoto, setModalFoto] = useState(""); */}
      <Modal open={open2} onClose={() => setOpen2(false)} center>
        <div className="card">
          <img src={modalFoto} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{modalNome}</h5>
            <p className="card-text">{modalIngredientes}</p>
            <button
              onClick={() => setOpen2(false)}
              href="#"
              className="btn btn-danger"
            >
              Fechar
            </button>
            <button
              onClick={() => setOpen2(false)}
              href="#"
              className="btn btn-primary"
              style={{ marginLeft: "10px" }}
            >
              Incluir No Pedido
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
