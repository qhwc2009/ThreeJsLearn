import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WEBGL from 'utils/WEBGL'
import Nav from 'component/Nav/Nav';
import Cube from 'view/Cube/Cube';
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
      </div>
    </Router>
  );
}

export default App;
