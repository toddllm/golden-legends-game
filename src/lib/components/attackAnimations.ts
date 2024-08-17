// attackAnimations.ts

import * as THREE from 'three';

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

// Mario's Attacks
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

// Sonic's Attacks
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

// Pac-Man's Attacks
function chompAttack(character: THREE.Group): number {
  const chompDuration = 300; // ms
  const originalScale = character.scale.x;

  const chompAnimation = (progress: number) => {
    const scale = originalScale * (1 + 0.2 * Math.sin(progress * Math.PI * 2));
    character.scale.set(scale, scale, scale);

    if (progress < 1) {
      requestAnimationFrame(() => chompAnimation((Date.now() - startTime) / chompDuration));
    } else {
      character.scale.set(originalScale, originalScale, originalScale);
    }
  };

  const startTime = Date.now();
  chompAnimation(0);

  return 10;
}

function powerPelletAttack(character: THREE.Group): number {
  const pellet = new THREE.Mesh(
    new THREE.SphereGeometry(0.2),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  pellet.position.set(character.position.x + 0.5, character.position.y, character.position.z);
  character.parent?.add(pellet);

  // Animate power pellet
  const animatePellet = () => {
    pellet.position.x += 0.1;
    if (pellet.position.x > character.position.x + 3) {
      character.parent?.remove(pellet);
    } else {
      requestAnimationFrame(animatePellet);
    }
  };
  animatePellet();

  return 15;
}

function ghostEatAttack(character: THREE.Group): number {
  const ghostEatDuration = 500; // ms
  const originalPosition = character.position.clone();
  const targetPosition = originalPosition.clone().add(new THREE.Vector3(1, 0, 0));

  const ghostEatAnimation = (progress: number) => {
    character.position.lerpVectors(originalPosition, targetPosition, Math.sin(progress * Math.PI));

    if (progress < 1) {
      requestAnimationFrame(() => ghostEatAnimation((Date.now() - startTime) / ghostEatDuration));
    } else {
      character.position.copy(originalPosition);
    }
  };

  const startTime = Date.now();
  ghostEatAnimation(0);

  return 20;
}

export function resetAttackAnimation(character: THREE.Group) {
  character.position.y = 0;
  character.rotation.set(0, 0, 0);
  character.scale.set(1, 1, 1);
}