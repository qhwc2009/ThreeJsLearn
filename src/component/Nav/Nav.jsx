import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

export default function Nav() {
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['1']}
      mode="inline"
      style={{ marginTop: '60px', height: '100%', borderRight: 0 }}
    >
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/Cube">Cube</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/Line">Line</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/AxisHelper">AxisHelper</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/OrthographicCamera">OrthographicCamera</Link>
      </Menu.Item>
      <Menu.Item key="6">
        <Link to="/PerspectiveCamera">PerspectiveCamera</Link>
      </Menu.Item>
      <Menu.Item key="7">
        <Link to="/NoLight">NoLight</Link>
      </Menu.Item>
      <Menu.Item key="8">
        <Link to="/AmbientLight">AmbientLight</Link>
      </Menu.Item>
      <Menu.Item key="9">
        <Link to="/DirectionalLight">DirectionalLight</Link>
      </Menu.Item>
      <Menu.Item key="10">
        <Link to="/PointLight">PointLight</Link>
      </Menu.Item>
      <Menu.Item key="11">
        <Link to="/Texture">Texture</Link>
      </Menu.Item>
      <Menu.Item key="12">
        <Link to="/LearnGeometry">LearnGeometry</Link>
      </Menu.Item>
      <Menu.Item key="13">
        <Link to="/GTFLoader">GTFLoader</Link>
      </Menu.Item>
      <Menu.Item key="14">
        <Link to="/LambertSideLearn">LambertSideLearn</Link>
      </Menu.Item>
    </Menu>
  );
}
