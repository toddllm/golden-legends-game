import * as THREE from 'three';
import { Mario } from './characters/Mario';
import { Sonic } from './characters/Sonic';
import { Pacman } from './characters/Pacman';

export class Character {
  mario: THREE.Group;
  sonic: THREE.Group;
  pacman: THREE.Group;
  marioHealth = 100;
  sonicHealth = 100;
  pacmanHealth = 100;

  constructor() {
    const marioCharacter = new Mario();
    const sonicCharacter = new Sonic();
    const pacmanCharacter = new Pacman();

    this.mario = marioCharacter.getGroup();
    this.sonic = sonicCharacter.getGroup();
    this.pacman = pacmanCharacter.getGroup();
  }
}
