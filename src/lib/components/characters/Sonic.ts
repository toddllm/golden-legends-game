import * as THREE from 'three';

export class Sonic {
  sonicGroup: THREE.Group;

  constructor() {
    this.sonicGroup = new THREE.Group();

    // Body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1.5, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x1e90ff }) // Dodger blue
    );
    this.sonicGroup.add(body);

    // Head
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.8, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x1e90ff }) // Dodger blue
    );
    head.position.y = 1.15;
    this.sonicGroup.add(head);

    // Spikes
    const spikeGeometry = new THREE.BoxGeometry(0.2, 0.4, 0.2);
    const spikeMaterial = new THREE.MeshStandardMaterial({ color: 0x1e90ff });
    for (let i = 0; i < 5; i++) {
      const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);
      spike.position.set(-0.4 + i * 0.2, 1.5, 0);
      spike.rotation.z = Math.PI / 4;
      this.sonicGroup.add(spike);
    }

    // Eyes
    const eyeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.1);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye.position.set(0, 1.2, 0.4);
    this.sonicGroup.add(eye);
  }

  getGroup(): THREE.Group {
    return this.sonicGroup;
  }
}
