import GlobalStyle from "../styles/globalStyle.js";
import { useState } from 'react';
import UserContext from '../contexts/UserContext.js';
import Header from "./Header/Header.js";
import ProductsList from "./ProductsList/ProductsList.js";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Details from "./Details/Details";

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <GlobalStyle />
        <Switch>
          <Route path="/" component={ProductsList} exact />
          <Route exact path="/products/:code">
            <Header />
            <Details />
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
