import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';

type ShoppingItem = {
  product: string;
  price: number;
};

function App() {
  const { register, handleSubmit, reset, setFocus } = useForm();
  const [shopping, setShopping] = useState<ShoppingItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const onSubmit = (data: Record<string, any>) => {
    const { product, price } = data;
    addProduct({ product, price });
  };

  const addProduct = ({ product, price }: ShoppingItem) => {
    const newProduct: ShoppingItem = { product, price: Number(price) };
    const updatedShopping = [...shopping, newProduct];
    setShopping(updatedShopping);
    const total2 = Number(price);
    setTotal(total + total2);
    reset({ product: '', price: '' });
    localStorage.setItem('Shoppings', JSON.stringify(updatedShopping));
    localStorage.setItem('Total', JSON.stringify(total + total2));
  };

  const listShoppings = shopping.map((item, index) => (
    <h4 className="d-flex justify-content-between" key={index}>
      <span>{item.product}</span>
      <span>R$:{item.price.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</span>
    </h4>
  ));

  useEffect(() => {
    setFocus('product');
    const shopping = localStorage.getItem('Shoppings');
    const total = localStorage.getItem('Total');
    if (shopping) {
      setShopping(JSON.parse(shopping));
    }
    if (total) {
      setTotal(JSON.parse(total));
    }
  }, []);

  const deleteHandler = ():void => {
   Swal.fire({
      title: 'Deseja excluir todos os produtos?',
      showDenyButton: true,
      confirmButtonText: `Sim`,
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        setShopping([]);
        setTotal(0);
      } 
    })
  }

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
            <form onSubmit={handleSubmit(onSubmit)} className="row mt-3">
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Produto"
                  className="form-control form-control-lg"
                  {...register('product')}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  step={0.01}
                  placeholder="Preço R$"
                  className="form-control form-control-lg"
                  {...register('price')}
                />
              </div>
              <div className="col-md-3 d-grid">
                <input type="submit" value="Adicionar" className="btn btn-primary btn-lg" />
                <input type="button" value="Excluir tudo" className="btn btn-danger btn-lg mt-2" onClick={deleteHandler} />
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
                  <span>R$: {total.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</span>
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
