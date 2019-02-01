import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GameViewport from "./pages/GameViewport";
//import NoMatch from "./pages/NoMatch";
//import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <div id="Viewport">
        <Switch>
          <Route exact path="/" component={GameViewport} />
          {/*<Route exact path="/" component={SignUp} />*/}
        </Switch>
      </div>
    </Router>
  );
}

export default App;