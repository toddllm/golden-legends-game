import * as THREE from 'three';

export class StarryBackground {
  private scene: THREE.Scene;

  constructor() {
    this.scene = new THREE.Scene();
    this.createStars();
  }

  private createStars() {
    const starGeometry = new THREE.SphereGeometry(0.05, 24, 24);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 1000; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial);

      // Randomly position the star in space
      star.position.x = (Math.random() - 0.5) * 100;
      star.position.y = (Math.random() - 0.5) * 100;
      star.position.z = (Math.random() - 0.5) * 100;

      this.scene.add(star);
    }
  }

  getScene(): THREE.Scene {
    return this.scene;
  }
}
