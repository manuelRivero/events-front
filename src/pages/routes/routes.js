import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./../../context/authContext";
import Login from "../login/login";
import Events from "../events/events";
import Bookings from "../bookings/bookings";

export default function Routes() {
  const { token } = useContext(AuthContext);
  return (
    <Switch>
      {!token && <Redirect from="/" to="/auth" exact />}
      {!token && <Redirect from="/bookings" to="/auth" exact />}
      {!token && <Route path="/auth"> <Login /> </Route>}
      <Route path="/events"> <Events /> </Route>
      {token && <Redirect from="/" to="/events" exact />}
      {token && <Redirect from="/auth" to="/events" exact />}
      {token &&  <Route path="/bookings"> <Bookings /> </Route>}
    </Switch>
  );
}
