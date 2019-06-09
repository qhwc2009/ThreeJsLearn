import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Cube">Cube</Link>
        </li>
        <li>
          <Link to="/Line">Line</Link>
        </li>
        <li>
          <Link to="/AxisHelper">AxisHelper</Link>
        </li>
        <li>
          <Link to="/OrthographicCamera">OrthographicCamera</Link>
        </li>
        <li>
          <Link to="/PerspectiveCamera">PerspectiveCamera</Link>
        </li>
        <li>
          <Link to="/NoLight">NoLight</Link>
        </li>
        <li>
          <Link to="/AmbientLight">AmbientLight</Link>
        </li>
        <li>
          <Link to="/DirectionalLight">DirectionalLight</Link>
        </li>
        <li>
          <Link to="/PointLight">PointLight</Link>
        </li>
        <li>
          <Link to="/Texture">Texture</Link>
        </li>
      </ul>
    </nav>
  );
}
