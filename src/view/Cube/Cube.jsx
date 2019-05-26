import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import './Cube.scss';

export default function Cube() {
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
//     const material = new THREE.ShaderMaterial({
//       vertexShader: `#version 300 es

// void main() {

// 	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

// }`,
//       fragmentShader: `#version 300 es

// precision highp float;
// precision highp int;
// out vec4 out_FragColor;

// void main() {

// 	out_FragColor = vec4( 1.0 );

// }`,
//     });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      const diff = 0.005;
      cube.rotation.x += diff;
      cube.rotation.y += diff;
      renderer.render(scene, camera);
    }

    animate();
  }, []);
  return <div className="cube" ref={containerDom} />;
}
