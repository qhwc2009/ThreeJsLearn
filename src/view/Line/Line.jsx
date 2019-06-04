import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import './Line.scss';

export default function Line() {
  const containerDom = useRef(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2');
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      context: context,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    containerDom.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      500,
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();
    var material = new THREE.LineBasicMaterial({ color: '#0000ff' });

    const geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 10, 0));
    geometry.vertices.push(new THREE.Vector3(10, 0, 10));
    geometry.vertices.push(new THREE.Vector3(0, 10, 10));
    geometry.vertices.push(new THREE.Vector3(10, 10, 0));
    geometry.vertices.push(new THREE.Vector3(0, 10, 0));
    geometry.vertices.push(new THREE.Vector3(-10, 10, 0));
    geometry.vertices.push(new THREE.Vector3(-10, 0, 0));

    const line = new THREE.Line(geometry, material);

    scene.add(line);
    renderer.render(scene, camera);
  }, []);

  return <div ref={containerDom} className="line" />;
}
