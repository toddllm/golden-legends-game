import * as THREE from 'three';

export class Mario {
  marioGroup: THREE.Group;

  constructor() {
    this.marioGroup = new THREE.Group();

    // Body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1.5, 0.5),
      new THREE.MeshStandardMaterial({ color: 0xff0000 }) // Red
    );
    this.marioGroup.add(body);

    // Head
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.MeshStandardMaterial({ color: 0xffa07a }) // Light salmon
    );
    head.position.y = 1.15;
    this.marioGroup.add(head);

    // Hat
    const hat = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.3, 0.8),
      new THREE.MeshStandardMaterial({ color: 0xff0000 }) // Red
    );
    hat.position.y = 1.6;
    this.marioGroup.add(hat);

    // Eyes
    const eyeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.1);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.2, 1.2, 0.4);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.2, 1.2, 0.4);
    this.marioGroup.add(leftEye, rightEye);
  }

  getGroup(): THREE.Group {
    return this.marioGroup;
  }
}
