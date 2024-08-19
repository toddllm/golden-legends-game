import * as THREE from 'three';
import { Character } from './Character';

export class CharacterManager {
  mario: THREE.Group;
  sonic: THREE.Group;
  pacman: THREE.Group;
  marioHealth = 100;
  sonicHealth = 100;
  pacmanHealth = 100;
  private marioBox: THREE.Box3;
  private sonicBox: THREE.Box3;
  private pacmanBox: THREE.Box3;

  private marioPosition = { x: -3, y: 0, z: 0 };
  private sonicPosition = { x: 0, y: 0, z: 0 };
  private pacmanPosition = { x: 3, y: 0, z: 0 };

  constructor() {
    const character = new Character();
    this.mario = character.mario;
    this.sonic = character.sonic;
    this.pacman = character.pacman;

    this.marioBox = new THREE.Box3().setFromObject(this.mario);
    this.sonicBox = new THREE.Box3().setFromObject(this.sonic);
    this.pacmanBox = new THREE.Box3().setFromObject(this.pacman);
  }

  animateCharacters(onAnimationFrame: () => void) {
    let direction = 1;
    let lastTime = 0;

    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      this.marioPosition.x += 0.005 * direction;
      this.sonicPosition.x += 0.005 * direction;
      this.pacmanPosition.x -= 0.005 * direction;

      if (Math.abs(this.marioPosition.x) > 4 || Math.abs(this.sonicPosition.x) > 4 || Math.abs(this.pacmanPosition.x) > 4) {
        direction *= -1;
      }

      this.updatePositions();
      this.updateCollisionBoxes();

      onAnimationFrame();

      requestAnimationFrame(animate);
    };

    animate(0);
  }

  private updatePositions() {
    this.mario.position.x = this.marioPosition.x;
    this.sonic.position.x = this.sonicPosition.x;
    this.pacman.position.x = this.pacmanPosition.x;
  }

  private updateCollisionBoxes() {
    this.marioBox.setFromObject(this.mario);
    this.sonicBox.setFromObject(this.sonic);
    this.pacmanBox.setFromObject(this.pacman);
  }

  checkCollision(): boolean {
    return this.marioBox.intersectsBox(this.sonicBox) || 
           this.marioBox.intersectsBox(this.pacmanBox) || 
           this.sonicBox.intersectsBox(this.pacmanBox);
  }

  getActiveCharacters(): ('mario' | 'sonic' | 'pacman')[] {
    return [
      this.marioHealth > 0 ? 'mario' : null,
      this.sonicHealth > 0 ? 'sonic' : null,
      this.pacmanHealth > 0 ? 'pacman' : null,
    ].filter(Boolean) as ('mario' | 'sonic' | 'pacman')[];
  }

  getCharacter(name: 'mario' | 'sonic' | 'pacman'): THREE.Group {
    return name === 'mario' ? this.mario : name === 'sonic' ? this.sonic : this.pacman;
  }

  reduceHealth(name: 'mario' | 'sonic' | 'pacman', damage: number) {
    if (name === 'mario') {
      this.marioHealth -= damage;
      if (this.marioHealth <= 0) this.marioHealth = 0;
    } else if (name === 'sonic') {
      this.sonicHealth -= damage;
      if (this.sonicHealth <= 0) this.sonicHealth = 0;
    } else {
      this.pacmanHealth -= damage;
      if (this.pacmanHealth <= 0) this.pacmanHealth = 0;
    }
  }

  reset() {
    this.marioHealth = 100;
    this.sonicHealth = 100;
    this.pacmanHealth = 100;
    this.marioPosition = { x: -3, y: 0, z: 0 };
    this.sonicPosition = { x: 0, y: 0, z: 0 };
    this.pacmanPosition = { x: 3, y: 0, z: 0 };
  }
}
