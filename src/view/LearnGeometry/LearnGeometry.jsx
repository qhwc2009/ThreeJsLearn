import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
// import * as Stats from 'stats.js';
// import * as TWEEN from '@tweenjs/tween.js';

import './LearnGeometry.scss';

export default function LearnGeometry() {
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
      camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
      camera.position.set(0, 0, 600);

      camera.up.set(0, 1, 0);

      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // scene.add(camera);

      // eslint-disable-next-line
      console.log('camera: ', camera);
    }

    let light;
    function initLight() {
      light = new THREE.DirectionalLight('#ffffff', 1.0, 0);
      light.position.set(100, 100, 200);
      scene.add(light);
    }

    function initObject() {
      const geometry = new THREE.PlaneGeometry(100, 100, 2, 3);
      const material = new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors,
        // color: '#ff0000',
        // wireframe: true,
      });

      const color1 = new THREE.Color('#00ff00');
      const color2 = new THREE.Color('#50f4f0');
      const color3 = new THREE.Color('#4f0fa0');

      geometry.faces.forEach(face => {
        face.vertexColors[0] = color1;
        face.vertexColors[1] = color2;
        face.vertexColors[2] = color3;
      });

      const object = new THREE.Mesh(geometry, material);
      scene.add(object);
    }

    let param;
    function createUI() {
      const ParamObj = function() {
        this.fov = 45;
      };
      param = new ParamObj();
      const gui = new dat.GUI();
      gui.add(param, 'fov', 0, 180).name('视角大小');
    }

    function changeFov() {
      setCameraFov(param.fov);
    }

    function setCameraFov(fov) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }

    function animation() {
      changeFov();
      renderer.render(scene, camera);
      requestAnimationFrame(animation);
    }

    function threeStart() {
      initThree();
      initScene();
      initCamera();
      initLight();
      initObject();
      createUI();
      animation();
    }

    if (containerDom.current) {
      threeStart();
    }
  }, []);
  return <div ref={containerDom} className="camera" />;
}
