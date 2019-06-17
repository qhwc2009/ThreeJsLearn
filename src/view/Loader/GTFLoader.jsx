import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as dat from 'dat.gui';

import './Loader.scss';

export default function GTFLoader() {
  const containerDom = useRef(null);
  const gui = useRef(null);

  useEffect(() => {
    let width;
    let height;
    let renderer;

    function initThree() {
      width = containerDom.current.clientWidth;
      height = containerDom.current.clientHeight;
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
      camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1e10);
      camera.position.set(0, 0, 1000);

      camera.up.set(0, 1, 0);

      camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    let light;
    function initLight() {
      light = new THREE.DirectionalLight('#ffffff', 1.0, 0);
      light.position.set(200, 200, 1000);
      scene.add(light);
    }

    let mesh;
    function initObject() {
      const loader = new GLTFLoader();
      loader.load(
        process.env.PUBLIC_URL + '/models/matilda/scene.gltf',
        function(gltf) {
          mesh = gltf.scene;
          scene.add(gltf.scene);
          // eslint-disable-next-line
          console.log('gltf: ', gltf);
        },
        undefined,
        function(error) {
          // eslint-disable-next-line
          console.log('error: ', error);
        },
      );
    }

    let param;
    function createUI() {
      const ParamObj = function() {
        this.fov = 45;
        this.rotateY = 0;
      };
      param = new ParamObj();
      gui.current = new dat.GUI();
      gui.current.add(param, 'fov', 0, 180).name('视角大小');
      gui.current.add(param, 'rotateY', 0, 7).name('旋转').step(0.01);
    }

    function changeFov() {
      setCameraFov(param.fov);
    }

    function setCameraFov(fov) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }

    function changeRotateY() {
      if (mesh) {
        mesh.rotation.y = param.rotateY;
      }
    }

    function animation() {
      changeFov();
      changeRotateY();
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
  return <div ref={containerDom} className="loader" />;
}
