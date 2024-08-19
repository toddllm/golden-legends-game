import * as THREE from 'three';

export function spinDashAttack(character: THREE.Group): number {
  const spinDuration = 1000; // ms
  const startX = character.position.x;

  const spinAnimation = (progress: number) => {
    character.rotation.z += 0.5;
    character.position.x = startX + Math.sin(progress * Math.PI * 2) * 0.5;

    if (progress < 1) {
      requestAnimationFrame(() => spinAnimation((Date.now() - startTime) / spinDuration));
    } else {
      character.rotation.z = 0;
      character.position.x = startX;
    }
  };

  const startTime = Date.now();
  spinAnimation(0);

  return 12;
}

export function homingAttack(character: THREE.Group): number {
  const homingDuration = 500; // ms
  const startPosition = character.position.clone();
  const endPosition = startPosition.clone().add(new THREE.Vector3(1, 1, 0));

  const homingAnimation = (progress: number) => {
    character.position.lerpVectors(startPosition, endPosition, progress);

    if (progress < 1) {
      requestAnimationFrame(() => homingAnimation((Date.now() - startTime) / homingDuration));
    } else {
      character.position.copy(startPosition);
    }
  };

  const startTime = Date.now();
  homingAnimation(0);

  return 18;
}

export function kickAttack(character: THREE.Group): number {
  const kickDuration = 300; // ms
  const originalRotation = character.rotation.x;

  const kickAnimation = (progress: number) => {
    const rotation = originalRotation + (Math.PI / 3) * Math.sin(progress * Math.PI);
    character.rotation.x = rotation;

    if (progress < 1) {
      requestAnimationFrame(() => kickAnimation((Date.now() - startTime) / kickDuration));
    } else {
      character.rotation.x = originalRotation;
    }
  };

  const startTime = Date.now();
  kickAnimation(0);

  return 10;
}
