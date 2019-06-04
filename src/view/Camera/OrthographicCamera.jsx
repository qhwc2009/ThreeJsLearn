import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// import * as Stats from 'stats.js';
// import * as TWEEN from '@tweenjs/tween.js';

import './Camera.scss';

export default function OrthographicCamera() {
  const containerDom = useRef(null);

  useEffect(() => {
    let width;
    let height;
    let renderer;

    function initThree() {
      width = containerDom.current.clientWidth;
      height = containerDom.current.clientHeight;
      // const canvas = document.createElement('canvas');
      // const context = canvas.getContext('webgl2');
      // renderer = new THREE.WebGLRenderer({
      //   canvas: canvas,
      //   context: context,
      // });
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      containerDom.current.appendChild(renderer.domElement);
      renderer.setClearColor('#ffffff', 1.0);
    }

    let scene;
    function initScene() {
      scene = new THREE.Scene();
    }

    let camera;
    function initCamera() {
      camera = new THREE.OrthographicCamera(
        -(width / 2),
        width / 2,
        -(height / 2),
        height / 2,
        10,
        1000,
      );
      camera.position.set(0, 0, 600);

      camera.up.set(0, 1, 0);

      camera.lookAt(new THREE.Vector3(0, 0, 0));

      scene.add(camera);

      // eslint-disable-next-line
      console.log('camera: ', camera);
    }

    let light;
    function initLight() {
      light = new THREE.DirectionalLight('#ff0000', 1.0, 0);
      light.position.set(100, 100, 200);
      scene.add(light);
    }

    function initObject() {
      const geometry = new THREE.CylinderGeometry(70, 100, 200);
      const material = new THREE.MeshLambertMaterial({ color: '#ffffff' });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 0, 0);
      scene.add(mesh);

      // eslint-disable-next-line
      console.log('mesh: ', mesh);
    }

    function animation() {
      renderer.render(scene, camera);
      requestAnimationFrame(animation);
    }

    function threeStart() {
      initThree();
      initScene();
      initCamera();
      initLight();
      initObject();
      animation();
    }

    if (containerDom.current) {
      threeStart();
    }
  }, []);
  return <div ref={containerDom} className="camera" />;
}
