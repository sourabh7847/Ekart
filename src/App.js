import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe('pk_test_51JtQO3SCmu1bV7al2BzCbdETdvHbz8S03d6Lz2QJWFDCJcFzZmg3EglYfQAYsSOvqnML2gGZpL3aNasNYuOmxUzn00hz7MQn0d')

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser =>{
      console.log("the user", authUser)

      if(authUser){
        
        dispatch({
          type:'SET_USER',
          user: authUser
        })
      }else{

        dispatch({
          type:'SET_USER',
          user: null
        })

      }
    })
   
  }, [])
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );

  // sdfghjhgfds
}

export default App;
