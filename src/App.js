import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Details from "./components/Details/Details";
// path = /products/:id
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/products/:id">
          <Details />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
