import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GameViewport from "./pages/GameViewport/index";
import NoMatch from "./pages/NoMatch/index";
import SignUp from "./pages/SignUp/index";
import Zoom from "./pages/Zoom/index";
import Signin from "./pages/SignIn";
import SuccessComp from "./pages/Success";

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/Zoom" component={Zoom} />
          <Route exact path="/Game" component={GameViewport} />
          <Route exact path="/Success" component={SuccessComp} />
          <Route component={NoMatch} />
        </Switch>
    </Router>
  );
}

export default App;