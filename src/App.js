import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/login/login";
import Events from './pages/events/events';
import Bookings from './pages/bookings/bookings';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" to="/auth" exact></Redirect>
        <Route path="/auth">
          <Login/>
        </Route>
        <Route path="/Events">
          <Events />
        </Route>
        <Route path="/Bookings">
          <Bookings/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
