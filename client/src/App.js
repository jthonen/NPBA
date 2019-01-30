import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Signup from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import Game from "./pages/Game";


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route exact path="/Game" component={Game} />
          <Route exact path="/LandingPage" component={LandingPage} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
