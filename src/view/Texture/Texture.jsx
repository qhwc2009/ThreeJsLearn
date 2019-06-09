import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import image1 from '../../asset/2.jpg';

import './Texture.scss';

const wrapMapper = {
  1: THREE.RepeatWrapping,
  2: THREE.ClampToEdgeWrapping,
  3: THREE.MirroredRepeatWrapping,
};

export default function Texture() {
  const containerDom = useRef(null);
  const gui = useRef(null);

  useEffect(() => {
    let width, height, renderer;
    const initThree = () => {
      width = containerDom.current.clientWidth;
      height = containerDom.current.clientHeight;

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      containerDom.current.appendChild(renderer.domElement);
      renderer.setClearColor('#ffffff', 1.0);
    };

    let scene;
    const initScene = () => {
      scene = new THREE.Scene();
    };

    let camera;
    const initCamera = () => {
      camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
      camera.position.set(0, 0, 400);
    };

    let texture;
    const initObject = () => {
      const gemotry = new THREE.PlaneGeometry(500, 300, 1, 1);

      const loader = new THREE.TextureLoader();
      loader.load(
        image1,
        function(text) {
          texture = text;

          texture.repeat.x = texture.repeat.y = 1;
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          const material = new THREE.MeshBasicMaterial({ map: texture });
          const mesh = new THREE.Mesh(gemotry, material);
          scene.add(mesh);
        },
        function(xhr) {
          // eslint-disable-next-line
          console.log(
            'progress: ',
            (xhr.loaded / xhr.total) * 100 + '% loaded',
          );
        },
        function(xhr) {
          // eslint-disable-next-line
          console.log('error: ', xhr);
        },
      );
    };

    let param;
    const createUI = () => {
      const paramObj = function() {
        this.repeat = 1;
        this.wrap = 1;
      };
      param = new paramObj();
      gui.current = new dat.GUI();

      gui.current.add(param, 'repeat', -5, 5).name('纹理重复');
      gui.current
        .add(param, 'wrap', 1, 3)
        .name('纹理回环')
        .step(1);
    };

    const change = () => {
      if (texture) {
        texture.repeat.x = texture.repeat.y = param.repeat;
        texture.wrapS = texture.wrapT = wrapMapper[param.wrap];
        texture.needsUpdate = true;
      }
    };

    const animate = () => {
      change();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    const threeStart = () => {
      initThree();
      initScene();
      initCamera();
      initObject();
      createUI();
      animate();
    };

    threeStart();

    return () => {
      if (gui.current) {
        gui.current.destroy();
      }
    };
  }, []);
  return <div ref={containerDom} className="texture" />;
}
