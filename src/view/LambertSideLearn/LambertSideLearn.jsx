import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';

import './LambertSideLearn.scss';

const sideMap = {
  1: THREE.FrontSide,
  2: THREE.BackSide,
  3: THREE.DoubleSide,
}

export default function LambertSideLearn() {
  const containerDom = useRef(null);
  const gui = useRef(null);

  useEffect(() => {
    let width;
    let height;
    let renderer;

    let param;
    function createUI() {
      const ParamObj = function() {
        this.positionZ = 100;
        this.rotateY = 0;
        this.side = 1;
      };
      param = new ParamObj();
      gui.current = new dat.GUI();
      gui.current.add(param, 'positionZ', 0, 500).name('镜头距离');
      gui.current.add(param, 'rotateY', 0, 7).name('旋转角度').step(0.01);
      gui.current.add(param, 'side', 1, 3).name('物体表面渲染方式(外表面, 内表面, 双面)').step(1);
    }

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
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
      camera.position.set(0, 0, param.positionZ);

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
      const material = new THREE.MeshLambertMaterial({color: '#a3e463', side: sideMap[param.side]});
      const geometry = new THREE.BoxGeometry(100, 100, 100);
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    }

    function updateUI() {
      mesh.rotation.y = param.rotateY;
      camera.position.set(0, 0, param.positionZ);
      mesh.material.side = sideMap[param.side];
    }

    function animation() {
      updateUI();
      renderer.render(scene, camera);
      requestAnimationFrame(animation);
    }

    function threeStart() {
      createUI();
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
      if (gui.current) {
        gui.current.destroy();
      }
    };
  }, []);
  return <div ref={containerDom} className="lambertSideLearn" />;
}
