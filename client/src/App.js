import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GameViewport from "./pages/GameViewport";
import SignUp from "./pages/SignUp";
import NoMatch from "./pages/NoMatch";
import Select from "./pages/ButtonSelect";
import ZoOm from "./pages/FaceMatch"

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/Select" component={Select} />
          <Route exact path="/Play" component={GameViewport} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/ZoOm" component={ZoOm} />
          <Route component={NoMatch}/>
        </Switch>
    </Router>
  );
}

export default App;