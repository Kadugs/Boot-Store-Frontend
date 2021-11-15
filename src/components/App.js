import GlobalStyle from "../styles/globalStyle.js";
import { useState, useEffect } from "react";
import UserContext from "../contexts/UserContext.js";
import CartContext from "../contexts/CartContext.js";
import PurchaseContext from "../contexts/PurchaseContext.js";
import Header from "./Header/Header.js";
import ProductsList from "./ProductsList/ProductsList.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Details from "./Details/Details";
import Cart from "./Cart/Cart";
import { getCart, getPurchaseProducts } from "../services/bootstore.js";
import Swal from "sweetalert2";

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [purchase, setPurchase] = useState([]);
  useEffect(() => {
    if (user) {
      getCart(user.token)
        .then((response) => setCart(response.data))
        .catch((error) =>
          Swal.fire({
            text: "Ocorreu algum erro! Tente novamente.",
          })
        );
      getPurchaseProducts(user.token)
        .then((response) => setPurchase(response.data))
        .catch((error) =>
          Swal.fire({
            text: "Ocorreu algum erro! Tente novamente.",
          })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <PurchaseContext.Provider value={{ purchase, setPurchase }}>
          <BrowserRouter>
            <GlobalStyle />
            <Switch>
              <Route path="/" component={ProductsList} exact />
              <Route exact path="/products/:code">
                <Header />
                <Details />
              </Route>
              <Route exact path="/cart">
                <Header />
                <Cart />
              </Route>
              {/* <Redirect to="/" /> */}
            </Switch>
          </BrowserRouter>
        </PurchaseContext.Provider>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}
