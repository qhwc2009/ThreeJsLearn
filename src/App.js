import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WEBGL from 'utils/WEBGL';
import Nav from 'component/Nav/Nav';
import Cube from 'view/Cube/Cube';
import Line from 'view/Line/Line';
import AxisHelper from 'view/AxisHelper/AxisHelper';
import OrthographicCamera from 'view/Camera/OrthographicCamera';
import PerspectiveCamera from 'view/Camera/PerspectiveCamera';
import NoLight from 'view/Light/NoLight';
import AmbientLight from 'view/Light/AmbientLight';
import DirectionalLight from 'view/Light/DirectionalLight';
import PointLight from 'view/Light/PointLight';
import Texture from 'view/Texture/Texture';
import LearnGeometry from 'view/LearnGeometry/LearnGeometry';
import GTFLoader from 'view/Loader/GTFLoader';
import LambertSideLearn from 'view/LambertSideLearn/LambertSideLearn';

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
        <Route path="/NoLight" exact component={NoLight} />
        <Route path="/AmbientLight" exact component={AmbientLight} />
        <Route path="/DirectionalLight" exact component={DirectionalLight} />
        <Route path="/PointLight" exact component={PointLight} />
        <Route path="/Texture" exact component={Texture} />
        <Route path="/LearnGeometry" exact component={LearnGeometry} />
        <Route path="/GTFLoader" exact component={GTFLoader} />
        <Route path="/LambertSideLearn" exact component={LambertSideLearn} />
      </div>
    </Router>
  );
}

export default App;
