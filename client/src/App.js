import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GameViewport from "./pages/GameViewport";
//import NoMatch from "./pages/NoMatch";
//import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={GameViewport} />
          {/*<Route exact path="/" component={SignUp} />*/}
        </Switch>
    </Router>
  );
}

export default App;