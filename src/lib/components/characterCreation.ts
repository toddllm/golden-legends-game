// characterCreation.ts

import * as THREE from 'three';

export function createMario() {
  const marioGroup = new THREE.Group();

  // Body
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1.5, 0.5),
    new THREE.MeshStandardMaterial({ color: 0xff0000 }) // Red
  );
  marioGroup.add(body);

  // Head
  const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
    new THREE.MeshStandardMaterial({ color: 0xffa07a }) // Light salmon
  );
  head.position.y = 1.15;
  marioGroup.add(head);

  // Hat
  const hat = new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.3, 0.8),
    new THREE.MeshStandardMaterial({ color: 0xff0000 }) // Red
  );
  hat.position.y = 1.6;
  marioGroup.add(hat);

  // Eyes
  const eyeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.1);
  const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(-0.2, 1.2, 0.4);
  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(0.2, 1.2, 0.4);
  marioGroup.add(leftEye, rightEye);

  return marioGroup;
}

export function createSonic() {
  const sonicGroup = new THREE.Group();

  // Body
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1.5, 0.5),
    new THREE.MeshStandardMaterial({ color: 0x1e90ff }) // Dodger blue
  );
  sonicGroup.add(body);

  // Head
  const head = new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.8, 0.8),
    new THREE.MeshStandardMaterial({ color: 0x1e90ff }) // Dodger blue
  );
  head.position.y = 1.15;
  sonicGroup.add(head);

  // Spikes
  const spikeGeometry = new THREE.BoxGeometry(0.2, 0.4, 0.2);
  const spikeMaterial = new THREE.MeshStandardMaterial({ color: 0x1e90ff });
  for (let i = 0; i < 5; i++) {
    const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);
    spike.position.set(-0.4 + i * 0.2, 1.5, 0);
    spike.rotation.z = Math.PI / 4;
    sonicGroup.add(spike);
  }

  // Eyes
  const eyeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.1);
  const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eye.position.set(0, 1.2, 0.4);
  sonicGroup.add(eye);

  return sonicGroup;
}

export function createPacman() {
  const pacmanGroup = new THREE.Group();

  // Body
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32, 0.2, Math.PI * 1.8),
    new THREE.MeshStandardMaterial({ color: 0xffff00 }) // Yellow
  );
  pacmanGroup.add(body);

  // Eye
  const eye = new THREE.Mesh(
    new THREE.CircleGeometry(0.1, 32),
    new THREE.MeshStandardMaterial({ color: 0x000000 }) // Black
  );
  eye.position.set(0.2, 0.3, 0.4);
  pacmanGroup.add(eye);

  // Adjust initial rotation so that Pac-Man faces the correct direction.
  pacmanGroup.rotation.set(Math.PI / 2, 0, 0); // Rotate 90 degrees around X-axis

  return pacmanGroup;
}
