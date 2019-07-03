import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
// import * as Stats from 'stats.js';
// import * as TWEEN from '@tweenjs/tween.js';

import './Camera.scss';

export default function OrthographicCamera() {
  const containerDom = useRef(null);
  const gui = useRef(null);

  useEffect(() => {
    let width;
    let height;
    let renderer;

    width = containerDom.current.clientWidth;
    height = containerDom.current.clientHeight;

    const ParamObj = function() {
      this.left = -(width / 2);
      this.right = width / 2;
      this.top = -(height / 2);
      this.bottom = height / 2;
      this.near = 10;
      this.far = 1000;
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
      camera = new THREE.OrthographicCamera(
        param.left,
        param.right,
        param.top,
        param.bottom,
        param.near,
        param.far,
      );
      camera.position.set(param.x, param.y, param.z);

      camera.up.set(0, 1, 0);

      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // scene.add(camera);

      // eslint-disable-next-line
      console.log('camera: ', camera);
    }

    function createUI() {
      gui.current = new dat.GUI();
      gui.current.add(param, 'left', -2000, 0).name('摄像机视锥体左侧面');
      gui.current.add(param, 'right', 0, 2000).name('摄像机视锥体右侧面');
      gui.current.add(param, 'top', -2000, 0).name('摄像机视锥体上侧面');
      gui.current.add(param, 'bottom', 0, 2000).name('摄像机视锥体下侧面');
      gui.current
        .add(param, 'near', 0, 100)
        .name('摄像机视锥体近端面')
        .step(0.1);
      gui.current.add(param, 'far', 0, 10000).name('摄像机视锥体远端面');
      gui.current.add(param, 'x', -500, 500).name('摄像机x');
      gui.current.add(param, 'y', -500, 500).name('摄像机y');
      gui.current.add(param, 'z', 0, 5000).name('摄像机z');
    }

    let light;
    function initLight() {
      light = new THREE.DirectionalLight('#ff0000', 1.0, 0);
      light.position.set(0, 100, -600);
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

    function setCamera() {
      camera.left = param.left;
      camera.right = param.right;
      camera.top = param.top;
      camera.bottom = param.bottom;
      camera.near = param.near;
      camera.far = param.far;
      camera.position.set(param.x, param.y, param.z);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      camera.updateProjectionMatrix();
    }

    function animation() {
      renderer.render(scene, camera);
      setCamera();
      requestAnimationFrame(animation);
    }

    function threeStart() {
      initThree();
      initScene();
      createUI();
      initCamera();
      initLight();
      initObject();
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
