import GlobalStyle from "../styles/globalStyle.js";
import { useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext.js';
import CartContext from '../contexts/CartContext.js';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header/Header.js";
import ProductsList from "./ProductsList/ProductsList.js";
import Details from "./Details/Details";
import { getCart } from '../services/bootstore.js';
import Checkout from "./Checkout/Checkout";
export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));

  useEffect(() => {
    if (user) {
      getCart(user.token)
        .then((response) => setCart(response.data))
        .catch((error) => alert('Ocorreu algum erro! Tente novamente.'));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <BrowserRouter>
          <GlobalStyle />
          <Switch>
            <Route path="/" component={ProductsList} exact />
            <Route exact path="/products/:code">
              <Header />
              <Details />
            </Route>
            <Route exact path="/checkout">
              <Checkout />
            </Route>
            {/* <Redirect to="/" /> */}
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}
