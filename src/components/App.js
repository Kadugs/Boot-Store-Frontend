import GlobalStyle from "../styles/globalStyle.js";
import ProductsList from "./ProductsList/ProductsList.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Details from "./Details/Details";
import Cart from "./Cart/Cart";
export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/" component={ProductsList} exact />
        {/* <Redirect to="/" /> */}
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/products/:id">
          <Details />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
