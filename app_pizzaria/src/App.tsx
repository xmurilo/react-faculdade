import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Fragment, useEffect } from "react";
import "./App.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Pizza {
  name: string;
  ingredient: string;
  photo: string;
}
function App() {
  const { register, handleSubmit } = useForm();
  const [pizza, setPizza] = useState<Pizza[]>([]);

  const onSubmit = (data: Record<string, string>) => {
    const { name, ingredient, photo } = data;
    addMenu({ name, ingredient, photo });
    localStorage.setItem("Pizza", JSON.stringify(pizza));
  };

  const addMenu = ({ name, ingredient, photo }: Pizza) => {
    const newPizza = [...pizza, { name, ingredient, photo }];
    setPizza(newPizza);
  };

  useEffect(() => {
    const pizzas = localStorage.getItem("Pizza");
    if (pizzas) {
      setPizza(JSON.parse(pizzas));
    }
  }, []);

  const listPizzas = pizza.map((pizza) => (
    <tr>
      <td>{pizza.name}</td>
      <td>{pizza.ingredient}</td>
      <td>
        <img src={pizza.photo} alt={pizza.name} width="100" />
      </td>
    </tr>
  ))

  const [open, setOpen] = useState(false);

  function onOpenModal() {
    setOpen(true);
  }

  function onCloseModal() {
    setOpen(false);
  }

  return (
    <Fragment>
      <div className="container-fluid">
        <nav className="navbar bg-danger">
          <div className="container-fluid">
            <a className="navbar-brand" href="#" style={{ color: "white" }}>
              <img
                src="../public/images.png"
                alt="Logo"
                width="48"
                height="40"
                className="d-inline-block align-text-top"
              />
              App pizzaria: Controle de Cardápio de Pizzas
            </a>
          </div>
        </nav>
        <div className="container mt-3">
          <h2 className="d-flex justify-content-between">
            <span>Listagem das Pizzas Disponiveis</span>
            <button className="btn btn-danger px-3" onClick={onOpenModal}>
              Adicionar pizza
            </button>
          </h2>

          <table className="table table-hover mt-3">
            <thead>
              <tr>
                <th>Nome da Pizza</th>
                <th>Ingredientes</th>
                <th>Foto</th>
              </tr>
            </thead>
            <tbody>
              {listPizzas}
            </tbody>
          </table>
        </div>

        <Modal open={open} onClose={onCloseModal} center>
          <div className="card">
            <div className="card-header">Inclusão de Pizzas no Cardápio</div>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <h5 className="card-title">Informe os Detalhes da Pizza</h5>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nome da Pizza
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  {...register("name")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ingredients" className="form-label">
                  Ingredientes
                </label>
                <textarea
                  className="form-control"
                  id="ingredients"
                  rows={3}
                  required
                  {...register("ingredient")}
                ></textarea>
                <div className="mb-3">
                  <label htmlFor="photo" className="form-label">
                    URL da Foto:
                  </label>
                  <input
                    type="string"
                    className="form-control"
                    id="photo"
                    required
                    {...register("photo")}
                  />
                </div>
                <input
                  type="submit"
                  value="Enviar"
                  className="btn btn-primary px-5"
                />
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </Fragment>
  );
}

export default App;
