import React, { useMemo } from 'react';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Menu } from 'antd';

const pages = [
  {
    key: '1',
    link: '/',
    title: 'Home',
  },
  {
    key: '2',
    link: '/Cube',
    title: 'Cube',
  },
  {
    key: '3',
    link: '/Line',
    title: 'Line',
  },
  {
    key: '4',
    link: '/AxisHelper',
    title: 'AxisHelper',
  },
  {
    key: '5',
    link: '/OrthographicCamera',
    title: 'OrthographicCamera',
  },
  {
    key: '6',
    link: '/PerspectiveCamera',
    title: 'PerspectiveCamera',
  },
  {
    key: '7',
    link: '/NoLight',
    title: 'NoLight',
  },
  {
    key: '8',
    link: '/AmbientLight',
    title: 'AmbientLight',
  },
  {
    key: '9',
    link: '/DirectionalLight',
    title: 'DirectionalLight',
  },
  {
    key: '10',
    link: '/PointLight',
    title: 'PointLight',
  },
  {
    key: '11',
    link: '/Texture',
    title: 'Texture',
  },
  {
    key: '12',
    link: '/LearnGeometry',
    title: 'LearnGeometry',
  },
  {
    key: '13',
    link: '/GTFLoader',
    title: 'GTFLoader',
  },
  {
    key: '14',
    link: '/LambertSideLearn',
    title: 'LambertSideLearn',
  },
  {
    key: '15',
    link: '/Jump',
    title: 'Jump',
  },
];

function Nav({ location }) {
  // eslint-disable-next-line
  console.log('location: ', location);
  const defaultKey = useMemo(() => {
    if (location.pathname === '/') {
      return '1';
    } else {
      return _.get(pages
        .slice(1)
        .find(page => location.pathname.indexOf(page.link) !== -1), 'key', '1');
    }
  }, [location.pathname]);
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[defaultKey]}
      mode="inline"
      style={{ marginTop: '60px', height: '100%', borderRight: 0 }}
    >
      {pages.map(page => (
        <Menu.Item key={page.key}>
          <Link to={page.link}>{page.title}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default withRouter(Nav);
