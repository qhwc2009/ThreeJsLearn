import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as TWEEN from '@tweenjs/tween.js';

import './AxisHelper.scss';

export default function AxisHelper() {
  const containerDom = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2');
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      context: context,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    containerDom.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(3, 2, 1);
    const material = new THREE.MeshBasicMaterial({ color: '#457dbd' });

    const cube = new THREE.Mesh(geometry, material);

    const objectTotal = new THREE.Object3D();
    objectTotal.add(cube);

    const axisHelper = new THREE.AxesHelper(4);
    objectTotal.add(axisHelper);

    scene.add(objectTotal);

    camera.position.z = 5;

    const stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    new TWEEN.Tween(camera.position)
      .to({ x: 10 }, 10000)
      .repeat(Infinity)
      .start();

    function animate() {
      stats.begin();
      const diff = 0.005;
      objectTotal.rotation.x += diff;
      objectTotal.rotation.y += diff;
      renderer.render(scene, camera);
      TWEEN.update();
      stats.end();
      requestAnimationFrame(animate);
    }

    animate();
  }, []);
  return <div className="axisHelper" ref={containerDom} />;
}
