import GlobalStyle from "../styles/globalStyle.js";
import Header from "./Header/Header.js";
import ProductsList from "./ProductsList/ProductsList.js";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Details from "./Details/Details";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/" component={ProductsList} exact />
        <Route exact path="/products/:id">
          <Header />
          <Details />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}
