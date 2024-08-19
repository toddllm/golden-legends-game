import * as THREE from 'three';
import { fireballAttack, jumpAttack, punchAttack } from './attacks/mario';
import { spinDashAttack, homingAttack, kickAttack } from './attacks/sonic';
import { chompAttack, powerPelletAttack, ghostEatAttack } from './attacks/pacman';

export function performAttack(character: THREE.Group, attackType: string): number {
  switch (attackType) {
    // Mario's attacks
    case 'fireball':
      return fireballAttack(character);
    case 'jump':
      return jumpAttack(character);
    case 'punch':
      return punchAttack(character);
    // Sonic's attacks
    case 'spinDash':
      return spinDashAttack(character);
    case 'homing':
      return homingAttack(character);
    case 'kick':
      return kickAttack(character);
    // Pac-Man's attacks
    case 'chomp':
      return chompAttack(character);
    case 'powerPellet':
      return powerPelletAttack(character);
    case 'ghostEat':
      return ghostEatAttack(character);
    default:
      console.error('Unknown attack type:', attackType);
      return 0;
  }
}

export function resetAttackAnimation(character: THREE.Group) {
  character.position.y = 0;
  character.scale.set(1, 1, 1);
  character.visible = true; // Ensure the character is visible after an attack
}
