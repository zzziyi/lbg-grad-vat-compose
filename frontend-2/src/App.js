import { useState } from 'react';
import SERVER_URL from './env';
import './App.css';
import ProductList from './products';
import TotalPrice from './total';

function App() {
  const [totalPrice, setTotalPrice] = useState(0.0)
  const [totalPlusVat, setTotalPlusVat] = useState(0.0)

  const vatRate = 20;
  const products = [
    {"id": 1, "name": "Sample", "price": 9.99},
    {"id": 2, "name": "Sample", "price": 4.99}
  ]

  function inc(price) {
    return (
      function incTot() {
        setTotalPrice(totalPrice + price)
      }
    );
  }

  function dec(price) {
    return (
      function decTot() {
        setTotalPrice(Math.max(totalPrice - price, 0))
      }
    );
  }

  function getVat() {
    const req = new XMLHttpRequest()

    req.onload = () => {
      if (req.status >= 200 && req.status < 300) {
        console.log(req.responseText)
        const response = JSON.parse(req.responseText)
        setTotalPlusVat(response.AfterVat)
      }
    }

    const json = {
      BeforeVat: totalPrice,
      AfterVat: 0,
      Mode: 1,
      VatRate: vatRate
    }

    console.log(JSON.stringify(json))
    
    req.open('POST', 'http://' + SERVER_URL + '/calc', true)
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(JSON.stringify(json))

  }

  return (
    <div className="App">
      <h1>
        Point-of-Sale Service B (20% VAT)
      </h1>
      <p>
        Check out our range of products!
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
                (prod) => <ProductList id={prod.id} name={prod.name} price={prod.price} quantity={0} valueChanged={[dec(prod.price), inc(prod.price)]} />
              )
            }
            <TotalPrice type={"Excl."} value={totalPrice} valueChanged={getVat} />
            <TotalPrice type={"Incl."} value={totalPlusVat} valueChanged={() => {}} />
        </table>
    </div>
  );
}

export default App;
