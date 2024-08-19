import * as THREE from 'three';

// Pac-Man's Chomp Attack
export function chompAttack(character: THREE.Group): number {
  const chompDuration = 600; // ms
  const originalScale = character.scale.clone();
  const chompScaleFactor = 0.7; // Amount by which the character scales down to simulate chomping

  const chompAnimation = (progress: number) => {
    // Create a chomping effect by alternating the scale
    const scaleFactor = progress < 0.5 
      ? THREE.MathUtils.lerp(1, chompScaleFactor, progress * 2) 
      : THREE.MathUtils.lerp(chompScaleFactor, 1, (progress - 0.5) * 2);
    
    character.scale.set(originalScale.x, originalScale.y * scaleFactor, originalScale.z);

    if (progress < 1) {
      requestAnimationFrame(() => chompAnimation((Date.now() - startTime) / chompDuration));
    } else {
      character.scale.copy(originalScale); // Reset to original scale
    }
  };

  const startTime = Date.now();
  chompAnimation(0);

  return 10;
}

// Pac-Man's Ghost Eat Attack
export function ghostEatAttack(character: THREE.Group): number {
  const ghostEatDuration = 1500; // ms
  const originalPosition = character.position.clone();
  const targetPosition = originalPosition.clone().add(new THREE.Vector3(3, 0, 0)); // Move farther
  const originalScale = character.scale.clone();

  // Create ghost to be spit out
  const ghost = new THREE.Mesh(
    new THREE.SphereGeometry(0.2),
    new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.7 })
  );
  ghost.position.copy(targetPosition);
  character.parent?.add(ghost);

  // Hide the character while it is being "spit out"
  character.visible = false;

  const ghostEatAnimation = (progress: number) => {
    // Chomping animation
    const chompProgress = (Math.sin(progress * Math.PI * 10) + 1) / 2; // Faster chomping
    const chompScale = originalScale.clone().multiplyScalar(1 - chompProgress * 0.3);
    character.scale.copy(chompScale);

    if (progress < 0.4) {
      // Move towards ghost
      character.position.lerpVectors(originalPosition, targetPosition, progress / 0.4);
    } else if (progress < 0.6) {
      // Stay at target position and "eat" ghost
      ghost.scale.setScalar(1 - (progress - 0.4) * 5); // Shrink ghost faster
    } else if (progress < 1) {
      // Move back and spit out ghost
      character.position.lerpVectors(targetPosition, originalPosition, (progress - 0.6) / 0.4);
      
      // Spit out ghost
      const ghostProgress = (progress - 0.6) / 0.4;
      ghost.position.lerpVectors(targetPosition, targetPosition.clone().add(new THREE.Vector3(1, 0, 0)), ghostProgress);
      ghost.scale.setScalar(ghostProgress);
    }

    if (progress < 1) {
      requestAnimationFrame(() => ghostEatAnimation((Date.now() - startTime) / ghostEatDuration));
    } else {
      character.position.copy(originalPosition);
      character.scale.copy(originalScale);
      character.visible = true; // Make the character visible again

      // Remove ghost after animation
      setTimeout(() => {
        character.parent?.remove(ghost);
      }, 500);
    }
  };

  const startTime = Date.now();
  ghostEatAnimation(0);

  return 20;
}

