import * as THREE from 'three';

export function fireballAttack(character: THREE.Group): number {
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

export function jumpAttack(character: THREE.Group): number {
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

export function punchAttack(character: THREE.Group): number {
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
