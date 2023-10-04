import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
function App() {
  const { register, handleSubmit, reset, setFocus } = useForm();
  const [shopping, setShopping] = useState([]);
  const [total, setTotal] = useState(0);

  function addProduct(data) {
    const shopping2 = [
      ...shopping,
      { product: data.product, price: Number(data.price) },
    ];
    setShopping(shopping2);
    setFocus("product");
    reset({ product: "", price: "" });
    const total2 = total + Number(data.price);
    setTotal(total2);
    localStorage.setItem("shopping", JSON.stringify(shopping2));
    localStorage.setItem("total", `${total2}`);
  }

  useEffect(() => {
    setFocus("product");
    if(localStorage.getItem("shopping")){
      const shopping2 = JSON.parse(localStorage.getItem("shopping"))
      setShopping(shopping2);
    }

    if(localStorage.getItem("total")){
      const total2 = JSON.parse(localStorage.getItem("total"))
      setTotal(total2);
    }
  }, []);

  const listShoppings = shopping.map((item) => (
    <h4 className="d-flex justify-content-between">
      <span>{item.product}</span>
      <span>
        R$:
        {item.price.toLocaleString("pt-br", {
          minimumFractionDigits: 2,
        })}
      </span>
    </h4>
  ));

  return (
    <div className="container-fluid">
      <nav className="navbar bg-info">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="./logo.png"
              alt="Logo"
              width="50"
              height="40"
              className="d-inline-block me-3"
            />
            App Controle de Compras
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <img src="./super.jpg" alt="Super" className="img-fluid mt-3" />
          </div>
          <div className="col-sm-8">
            <form onSubmit={handleSubmit(addProduct)} className="row mt-3">
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Produto"
                  className="form-control form-control-lg"
                  {...register("product")}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  step={0.01}
                  placeholder="Preço R$"
                  className="form-control form-control-lg"
                  {...register("price")}
                />
              </div>
              <div className="col-md-3 d-grid">
                <input
                  type="submit"
                  value="Adicionar"
                  className="btn btn-primary btn-lg"
                />
              </div>
            </form>
            <div className="card text-center mt-3 w-100 mx-auto">
              <div className="card-header">
                <h3 className="text-start">Lista dos Produtos Adicionados</h3>
              </div>
              <div className="card-body text-primary">{listShoppings}</div>
              <div className="card-footer">
                <h4 className="d-flex justify-content-between">
                  <span>Total Previsto</span>
                  <span>
                    R$:{" "}
                    {total.toLocaleString("pt-br", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
