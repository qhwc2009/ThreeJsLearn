import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';

import './NoLight.scss';

export default function PointLight() {
  const containerDom = useRef(null);
  const gui = useRef(null);

  useEffect(() => {
    let renderer;

    let width, height;

    const initThree = () => {
      width = containerDom.current.clientWidth;
      height = containerDom.current.clientHeight;

      renderer = new THREE.WebGLRenderer({
        antialias: true,
      });

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
      camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
      camera.position.set(800, 200, 800);
      camera.up.set(0, 1, 0);
      camera.lookAt(new THREE.Vector3(0, 0, 0)); // 必须用Vector来生成位置
    };

    let light;
    let param;
    const initLight = () => {
      const ParamObj = function() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.intensity = 1;
      };

      param = new ParamObj();
      gui.current = new dat.GUI();
      gui.current.add(param, 'x', -10000, 10000).name('点光源X的位置');
      gui.current.add(param, 'y', -10000, 10000).name('点光源Y的位置');
      gui.current.add(param, 'z', -10000, 10000).name('点光源Z的位置');
      gui.current.add(param, 'intensity', 0, 1).name('光强');

      light = new THREE.PointLight('#ffffff', 1, 5000, 0.5);
      light.position.set(param.x, param.y, param.z);
      scene.add(light);
    };

    const initObject = () => {
      const material = new THREE.MeshLambertMaterial({ color: '#ff0000' });
      const geometry = new THREE.BoxGeometry(200, 100, 50);
      const mesh1 = new THREE.Mesh(geometry, material);
      const mesh2 = new THREE.Mesh(geometry, material);
      const mesh3 = new THREE.Mesh(geometry, material);
      const mesh4 = new THREE.Mesh(geometry, material);
      const mesh5 = new THREE.Mesh(geometry, material);
      const mesh6 = new THREE.Mesh(geometry, material);

      mesh1.position.set(0, 0, 0);
      mesh2.position.set(-300, 0, 0);
      mesh3.position.set(300, 0, 0);
      mesh4.position.set(0, -200, 0);
      mesh5.position.set(0, 200, 0);
      mesh6.position.set(0, 0, 100);

      scene.add(mesh1);
      scene.add(mesh2);
      scene.add(mesh3);
      scene.add(mesh4);
      scene.add(mesh5);
      scene.add(mesh6);
    };

    function animation() {
      renderer.clear();
      light.position.set(param.x, param.y, param.z);
      light.intensity = param.intensity;
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

    return () => {
      gui.current.destroy();
    };
  }, []);
  return <div ref={containerDom} className="no-light" />;
}
