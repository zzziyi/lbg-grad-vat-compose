import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ProductList from './products';

function App() {
  const [q, setQ] = useState(0.0)

  // const vatRate = 15;
  const products = [
    {"id": 1, "name": "Sample", "price": 9.99},
    {"id": 2, "name": "Sample", "price": 4.99}
  ]

  return (
    <div className="App">
      <h1>
        Sample React App
      </h1>
      <p>
        Lorem ipsum, dolor sic amet, adipiscing elit
      </p>
      <table className='Products'>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>price (excl. VAT)</th>
                <th>Quantity</th>
            </tr>
            {
              products.map(
                (prod) => <ProductList id={prod.id} name={prod.name} price={prod.price} quantity={q} valueChanged={setQ} />
              )
            }
        </table>
    </div>
  );
}

export default App;
