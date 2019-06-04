import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WEBGL from 'utils/WEBGL';
import Nav from 'component/Nav/Nav';
import Cube from 'view/Cube/Cube';
import Line from 'view/Line/Line';
import AxisHelper from 'view/AxisHelper/AxisHelper';
import OrthographicCamera from 'view/Camera/OrthographicCamera';
import PerspectiveCamera from 'view/Camera/PerspectiveCamera';
import './App.scss';

function App() {
  useEffect(() => {
    if (WEBGL.isWebGL2Available() === false) {
      document.body.appendChild(WEBGL.getWebGL2ErrorMessage());
    }
  }, []);

  return (
    <Router>
      <Nav />
      <div className="App">
        <Route path="/Cube" exact component={Cube} />
        <Route path="/Line" exact component={Line} />
        <Route path="/AxisHelper" exact component={AxisHelper} />
        <Route path="/OrthographicCamera" exact component={OrthographicCamera} />
        <Route path="/PerspectiveCamera" exact component={PerspectiveCamera} />
      </div>
    </Router>
  );
}

export default App;
