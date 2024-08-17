<script lang="ts">
  import * as THREE from 'three';
  import * as SC from 'svelte-cubed';
  import { onMount } from 'svelte';
  import { createStarryBackgroundScene } from '$lib/components/StarryBackground.svelte';
  import VideoOverlay from './VideoOverlay.svelte';
  import { createMario, createSonic, createPacman } from './characterCreation';
  import { animateCharacter } from './animationUtils';
  import { performAttack, resetAttackAnimation } from './attackAnimations';

  let starryBackgroundScene: any;
  let marioPosition = { x: -3, y: 0, z: 0 };
  let sonicPosition = { x: 0, y: 0, z: 0 };
  let pacmanPosition = { x: 3, y: 0, z: 0 };
  let marioHealth = 100;
  let sonicHealth = 100;
  let pacmanHealth = 100;
  let battleMode = false;
  let battleLog: string[] = [];

  let mario: THREE.Group;
  let sonic: THREE.Group;
  let pacman: THREE.Group;

  onMount(() => {
    starryBackgroundScene = createStarryBackgroundScene();
    mario = createMario();
    sonic = createSonic();
    pacman = createPacman();
    animateCharacters();
  });

  const videoSrc = 'video/GoldenLegendsMovievideo.mp4';

  function animateCharacters() {
    let direction = 1;
    let lastTime = 0;
    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      if (!battleMode) {
        marioPosition.x += 0.005 * direction;
        sonicPosition.x += 0.005 * direction;
        pacmanPosition.x -= 0.005 * direction;

        if (Math.abs(marioPosition.x) > 4 || Math.abs(sonicPosition.x) > 4 || Math.abs(pacmanPosition.x) > 4) {
          direction *= -1;
        }

        // Check for collision to start battle
        if (Math.abs(marioPosition.x - sonicPosition.x) < 1 || 
            Math.abs(marioPosition.x - pacmanPosition.x) < 1 || 
            Math.abs(sonicPosition.x - pacmanPosition.x) < 1) {
          battleMode = true;
          startBattle();
        }
      } else {
        // Move characters towards center during battle
        const moveSpeed = 0.001;
        marioPosition.x += moveSpeed * Math.sign(-marioPosition.x);
        sonicPosition.x += moveSpeed * Math.sign(-sonicPosition.x);
        pacmanPosition.x += moveSpeed * Math.sign(-pacmanPosition.x);
      }

      // Update character positions
      mario.position.x = marioPosition.x;
      sonic.position.x = sonicPosition.x;
      pacman.position.x = pacmanPosition.x;

      // Animate characters
      animateCharacter(mario, time);
      animateCharacter(sonic, time);
      animateCharacter(pacman, time);

      requestAnimationFrame(animate);
    };

    animate(0);
  }

  function startBattle() {
    battleLog = ["Battle started!"];
    aiBattle();
  }

  function aiBattle() {
    if (!battleMode) return;

    const characters = ['mario', 'sonic', 'pacman'].filter(char => 
      char === 'mario' ? marioHealth > 0 : 
      char === 'sonic' ? sonicHealth > 0 : 
      pacmanHealth > 0
    );

    if (characters.length <= 1) {
      endBattle(characters[0]);
      return;
    }

    const attacker = characters[Math.floor(Math.random() * characters.length)] as 'mario' | 'sonic' | 'pacman';
    let defender;
    do {
      defender = characters[Math.floor(Math.random() * characters.length)] as 'mario' | 'sonic' | 'pacman';
    } while (defender === attacker);

    attack(attacker, defender);

    if (battleMode) {
      setTimeout(aiBattle, 2000); // Increased delay between attacks for better visibility
    }
  }

  function attack(attacker: 'mario' | 'sonic' | 'pacman', defender: 'mario' | 'sonic' | 'pacman') {
    const attackOptions = 
      attacker === 'mario' ? ['fireball', 'jump', 'punch'] :
      attacker === 'sonic' ? ['spinDash', 'homing', 'kick'] :
      ['chomp', 'powerPellet', 'ghostEat'];
    
    const attackType = attackOptions[Math.floor(Math.random() * attackOptions.length)];
    const damage = performAttack(
      attacker === 'mario' ? mario : 
      attacker === 'sonic' ? sonic : 
      pacman, 
      attackType
    );

    if (defender === 'mario') {
      marioHealth -= damage;
      if (marioHealth <= 0) marioHealth = 0;
    } else if (defender === 'sonic') {
      sonicHealth -= damage;
      if (sonicHealth <= 0) sonicHealth = 0;
    } else {
      pacmanHealth -= damage;
      if (pacmanHealth <= 0) pacmanHealth = 0;
    }

    battleLog.push(`${attacker} uses ${attackType} on ${defender} for ${damage} damage!`);
    battleLog = battleLog.slice(-5); // Keep only the last 5 log entries

    // Reset attack animation after a delay
    setTimeout(() => resetAttackAnimation(
      attacker === 'mario' ? mario : 
      attacker === 'sonic' ? sonic : 
      pacman
    ), 1000);
  }

  function endBattle(winner: 'mario' | 'sonic' | 'pacman') {
    battleMode = false;
    battleLog.push(`${winner} wins the battle!`);
    setTimeout(() => {
      // Reset health and positions after a delay
      marioHealth = 100;
      sonicHealth = 100;
      pacmanHealth = 100;
      marioPosition = { x: -3, y: 0, z: 0 };
      sonicPosition = { x: 0, y: 0, z: 0 };
      pacmanPosition = { x: 3, y: 0, z: 0 };
      battleLog = [];
    }, 3000);
  }
</script>

<VideoOverlay {videoSrc} />

<SC.Canvas>
  <SC.PerspectiveCamera position={[0, 5, 10]} />
  <SC.OrbitControls />

  <SC.DirectionalLight position={[3, 10, 10]} />
  <SC.AmbientLight intensity={0.2} />

  {#if starryBackgroundScene}
    <SC.Group>
      <SC.Primitive object={starryBackgroundScene} />
    </SC.Group>
  {/if}

  <SC.Primitive object={mario} />
  <SC.Primitive object={sonic} />
  <SC.Primitive object={pacman} />
</SC.Canvas>

<div style="position: absolute; top: 10px; left: 10px; color: white;">
  Mario Health: {marioHealth}
  Sonic Health: {sonicHealth}
  Pac-Man Health: {pacmanHealth}
  <p>Battle Mode: {battleMode ? 'ON' : 'OFF'}</p>
  <ul>
    {#each battleLog as log}
      <li>{log}</li>
    {/each}
  </ul>
</div>