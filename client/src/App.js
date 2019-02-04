import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GameViewport from "./pages/GameViewport";
//import NoMatch from "./pages/NoMatch";
//import SignUp from "./pages/SignUp";
import Zoom from "./pages/Zoom";

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={GameViewport} />
          <Route exact path="/Zoom" component={Zoom} />
        </Switch>
    </Router>
  );
}

export default App;