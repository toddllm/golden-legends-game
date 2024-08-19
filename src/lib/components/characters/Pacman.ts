import * as THREE from 'three';

export class Pacman {
  pacmanGroup: THREE.Group;

  constructor() {
    this.pacmanGroup = new THREE.Group();

    // Body
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32, 0.2, Math.PI * 1.8),
      new THREE.MeshStandardMaterial({ color: 0xffff00 }) // Yellow
    );
    this.pacmanGroup.add(body);

    // Eye
    const eye = new THREE.Mesh(
      new THREE.CircleGeometry(0.1, 32),
      new THREE.MeshStandardMaterial({ color: 0x000000 }) // Black
    );
    eye.position.set(0.2, 0.3, 0.4);
    this.pacmanGroup.add(eye);

    // Correct orientation: Rotate Pac-Man to face the correct direction
    // Adjust the rotation to ensure Pac-Man is not upside down
    this.pacmanGroup.rotation.set(0, Math.PI / 2, 0); // Rotate 90 degrees around the Y-axis
  }

  getGroup(): THREE.Group {
    return this.pacmanGroup;
  }
}
