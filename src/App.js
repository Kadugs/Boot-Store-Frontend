import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Details from "./components/Details/Details";
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/products/:id">
          <Details />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
