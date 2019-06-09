import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './NoLight.scss';

export default function NoLight() {
  const containerDom = useRef(null);

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
      camera.position.set(600, 0, 600);
      camera.up.set(0, 1, 0);
      camera.lookAt(new THREE.Vector3(0, 0, 0)); // 必须用Vector来生成位置
    };

    let light;
    const initLight = () => {
      // light = new THREE.DirectionalLight('#ff0000', 1.0, 0);
      // light.position.set(100, 100, 200);
      // scene.add(light);
    };

    const initObject = () => {
      const geometry = new THREE.BoxGeometry(200, 100, 50);
      const material = new THREE.MeshLambertMaterial({ color: '#ffffff' });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 0, 0);
      scene.add(mesh);
    };

    function animation() {
      renderer.clear();
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
  return <div ref={containerDom} className="no-light" />;
}
