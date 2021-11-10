import GlobalStyle from "../styles/globalStyle.js";
import ProductsList from "./ProductsList/ProductsList.js";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Details from "./Details/Details";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/" component={ProductsList} exact />
        <Redirect to="/" />
        <Route exact path="/products/:id">
          <Details />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
