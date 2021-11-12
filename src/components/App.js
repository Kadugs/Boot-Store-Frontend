import GlobalStyle from "../styles/globalStyle.js";
import ProductsList from "./ProductsList/ProductsList.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Details from "./Details/Details";
import Cart from "./Cart/Cart";
import Header from "./Header/Header.js";
import UserContext from "../contexts/UserContext.js";
import { listCartProductsForUsers } from "../services/bootstore.js";

export default function App() {
  const [userCart, setUserCart] = useState({});
  useEffect(() => {
    const localUserInfos = JSON.parse(localStorage.getItem("userInfos"));
    if (!!localUserInfos.token) {
      listCartProductsForUsers(localUserInfos.token)
        .then((res) => {
          setUserCart(res.data);
        })
        .catch((err) => {
          setUserCart({});
        });
    }
  });
  return (
    <UserContext.Provider value={{ userCart, setUserCart }}>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route path="/" component={ProductsList} exact />
          {/* <Redirect to="/" /> */}
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/products/:code">
            <Details />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
