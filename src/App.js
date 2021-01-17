import React from "react";
import "./App.css";
import deliveroo from "./assets/img/deliveroo.png";
import axios from "axios";
import { useState, useEffect } from "react";
import Categorie from "./Components/Categorie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Order from "./Components/Order";
library.add(faStar);

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("https://delivroo-back.herokuapp.com/");
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClick = (product) => {
    const newTab = [...order];
    let isFound = false;
    for (let i = 0; i < newTab.length; i++) {
      if (newTab[i].name === product.title) {
        newTab[i].number = newTab[i].number + 1;
        isFound = true;
      }
    }
    if (isFound === false) {
      newTab.push({
        name: product.title,
        number: 1,
        value: Number(product.price).toFixed(2),
      });
    }
    setOrder(newTab);
  };
  const livraison = 2.5;
  let subTotal = 0;
  order.forEach((ele) => {
    subTotal += ele.value * ele.number;
  });
  const total = subTotal + livraison;

  return (
    <div className="App">
      {isLoading ? (
        <header className="chargement">
          <img src={deliveroo} alt="greg" />
          <p>
            Pause !!! Veillez attendre le chargement des données 3. 2. 1. 🚀 !!!
          </p>
        </header>
      ) : (
        <div>
          <header>
            <div className="contener">
              <img src={deliveroo} alt="logo-deliveroo" />
            </div>

            <hr></hr>
            <div className="contener">
              <div>
                <h1>{data.restaurant.name}</h1>
                <p>{data.restaurant.description}</p>
              </div>
              <img src={data.restaurant.picture} alt="reg" />
            </div>
          </header>
          <div className="main contener">
            <main>
              {data.categories.map((categorie, index) => {
                if (categorie.meals.length === 0) {
                  return "";
                } else {
                  return (
                    <Categorie
                      handleAddClick={handleAddClick}
                      order={order}
                      setOrder={setOrder}
                      titre={categorie.name}
                      categorie={categorie}
                      index={index}
                      key={index}
                    ></Categorie>
                  );
                }
              })}
            </main>
            {order.length === 0 ? (
              <aside className="panier-off">
                <button>Valider mon panier</button>
                <p>Votre panier est vide</p>
              </aside>
            ) : (
              <aside className="panier-on">
                <button>Valider mon panier</button>
                <div>
                  {order.map((Orderr, indix) => {
                    return (
                      <Order
                        order={order}
                        setOrder={setOrder}
                        key={indix}
                        number={Orderr.number}
                        name={Orderr.name}
                        price={Orderr.value}
                        index={indix}
                      ></Order>
                    );
                  })}
                </div>

                <div>
                  <div>
                    <span>Sous-total</span>
                    <em> {subTotal.toFixed(2)}€</em>
                  </div>
                  <div>
                    <span>Frais de livraison</span>
                    <em>{livraison} €</em>
                  </div>
                </div>
                <div>
                  <strong>Total</strong>
                  <strong> {total.toFixed(2)} €</strong>
                </div>
              </aside>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
