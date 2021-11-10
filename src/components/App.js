import GlobalStyle from "../styles/globalStyle.js";
import ProductsList from "./ProductsList/ProductsList.js";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Cart from "./Cart/Cart";
export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/" component={ProductsList} exact />
        <Redirect to="/" />
        <Route exact path="/cart">
          <Cart />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
