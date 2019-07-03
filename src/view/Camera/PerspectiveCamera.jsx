import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
// import * as Stats from 'stats.js';
// import * as TWEEN from '@tweenjs/tween.js';

import './Camera.scss';

export default function PerspectiveCamera() {
  const containerDom = useRef(null);
  const gui = useRef(null);

  useEffect(() => {
    let width;
    let height;
    let renderer;

    width = containerDom.current.clientWidth;
    height = containerDom.current.clientHeight;

    const ParamObj = function() {
      this.fov = 45;
      this.x = 0;
      this.y = 0;
      this.z = 600;
    };

    const param = new ParamObj();

    function initThree() {
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
      camera.position.set(param.x, param.y, param.z);

      camera.up.set(0, 1, 0);

      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // scene.add(camera);
    }

    let light;
    function initLight() {
      light = new THREE.DirectionalLight('#ff0000', 1.0, 0);
      light.position.set(100, 100, 200);
      scene.add(light);
    }

    function initObject() {
      const geometry = new THREE.CylinderGeometry(70, 100, 200, 20);
      const material = new THREE.MeshLambertMaterial({ color: '#ffffff' });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 0, 0);
      scene.add(mesh);

      // eslint-disable-next-line
      console.log('mesh: ', mesh);
    }

    function createUI() {
      gui.current = new dat.GUI();
      gui.current.add(param, 'fov', 0, 180).name('视角大小');
      gui.current.add(param, 'x', -500, 500).name('摄像机x');
      gui.current.add(param, 'y', -500, 500).name('摄像机y');
      gui.current.add(param, 'z', 0, 5000).name('摄像机z');
    }

    function changeFov() {
      setCameraFov(param.fov);
    }

    function setCameraFov(fov) {
      camera.fov = fov;
      camera.position.set(param.x, param.y, param.z);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
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

    return () => {
      if (gui.current) {
        gui.current.destroy();
      }
    };
  }, []);
  return <div ref={containerDom} className="camera" />;
}
