// animationUtils.ts

import * as THREE from 'three';

export function animateCharacter(character: THREE.Group, time: number) {
  // Make character bob up and down
  character.position.y = Math.sin(time * 0.005) * 0.1;

  // Make character "breathe" by scaling slightly
  const scale = 1 + Math.sin(time * 0.002) * 0.02;
  character.scale.set(scale, scale, scale);

  // Rotate character slightly for a more dynamic feel
  character.rotation.y = Math.sin(time * 0.001) * 0.1;
}