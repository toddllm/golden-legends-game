// attackAnimations.ts

import * as THREE from 'three';

export function performAttack(character: THREE.Group, attackType: string): number {
  switch (attackType) {
    case 'fireball':
      return fireballAttack(character);
    case 'jump':
      return jumpAttack(character);
    case 'punch':
      return punchAttack(character);
    case 'spinDash':
      return spinDashAttack(character);
    case 'homing':
      return homingAttack(character);
    case 'kick':
      return kickAttack(character);
    default:
      console.error('Unknown attack type:', attackType);
      return 0;
  }
}

function fireballAttack(character: THREE.Group): number {
  const fireball = new THREE.Mesh(
    new THREE.SphereGeometry(0.2),
    new THREE.MeshBasicMaterial({ color: 0xff4500 })
  );
  fireball.position.set(character.position.x + 0.5, character.position.y + 1, character.position.z);
  character.parent?.add(fireball);

  // Animate fireball
  const animateFireball = () => {
    fireball.position.x += 0.1;
    if (fireball.position.x > character.position.x + 3) {
      character.parent?.remove(fireball);
    } else {
      requestAnimationFrame(animateFireball);
    }
  };
  animateFireball();

  return 15;
}

function jumpAttack(character: THREE.Group): number {
  const jumpHeight = 2;
  const jumpDuration = 500; // ms
  const startY = character.position.y;

  const jumpAnimation = (progress: number) => {
    const y = startY + jumpHeight * Math.sin(progress * Math.PI);
    character.position.y = y;

    if (progress < 1) {
      requestAnimationFrame(() => jumpAnimation((Date.now() - startTime) / jumpDuration));
    } else {
      character.position.y = startY;
    }
  };

  const startTime = Date.now();
  jumpAnimation(0);

  return 10;
}

function punchAttack(character: THREE.Group): number {
  const originalRotation = character.rotation.z;
  const punchDuration = 300; // ms

  const punchAnimation = (progress: number) => {
    const rotation = originalRotation + (Math.PI / 4) * Math.sin(progress * Math.PI);
    character.rotation.z = rotation;

    if (progress < 1) {
      requestAnimationFrame(() => punchAnimation((Date.now() - startTime) / punchDuration));
    } else {
      character.rotation.z = originalRotation;
    }
  };

  const startTime = Date.now();
  punchAnimation(0);

  return 8;
}

function spinDashAttack(character: THREE.Group): number {
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

function homingAttack(character: THREE.Group): number {
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

function kickAttack(character: THREE.Group): number {
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

export function resetAttackAnimation(character: THREE.Group) {
  character.position.y = 0;
  character.rotation.set(0, 0, 0);
}