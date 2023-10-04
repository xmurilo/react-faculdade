import { useForm } from "react-hook-form";
import { useState} from "react";

type FormValues = {
  product: string;
  price: number | string;
}


function App() {
  const { register, handleSubmit, reset} = useForm<FormValues>();
  
  const [shopping, setShopping ] = useState<string[]>([]);

  function addProduct(data: FormData) {
    setShopping([...shopping, {product: data.product, price: data.price}])
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => addProduct(data)
  const listShoppings = shopping.map((item) => (
    <h4 className="d-flex justify-content-between">
    <span>{item.product}</span>
    <span>R$:{item.price.toLocaleString("pt-br", {minimumFractionDigits: 2})}</span>
  </h4>
  ))
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
              <div className="card-body text-primary">
               {listShoppings}
              </div>
              <div className="card-footer">
                <h4 className="d-flex justify-content-between">
                  <span>Total Previsto</span>
                  <span>R$: 12,90</span>
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
