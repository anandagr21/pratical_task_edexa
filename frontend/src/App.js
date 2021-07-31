
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/nav/Header";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Create from "./components/pages/Create";
import Dashboard from "./components/pages/Dashboard";

function App() {

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/login" component={SignIn} />
        <ProtectedRoute exact path="/create" component={Create} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </>
  );
}

export default App;
