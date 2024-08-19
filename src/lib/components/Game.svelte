<script lang="ts">
  import { onMount } from 'svelte';
  import VideoOverlay from './VideoOverlay.svelte';
  import { CharacterManager } from './CharacterManager';
  import { BattleManager } from './BattleManager';
  import { createStarryBackgroundScene } from '$lib/components/StarryBackground.svelte';
  import * as SC from 'svelte-cubed';

  let starryBackgroundScene: any;
  let characterManager: CharacterManager;
  let battleManager: BattleManager;

  let battleLog: string[] = [];
  const videoSrc = 'video/GoldenLegendsMovievideo.mp4';

  onMount(() => {
    starryBackgroundScene = createStarryBackgroundScene();
    characterManager = new CharacterManager();
    battleManager = new BattleManager(characterManager);

    characterManager.animateCharacters(() => {
      if (!battleManager.battleMode && characterManager.checkCollision()) {
        battleManager.startBattle();
      }
    });

    battleManager.onBattleLogUpdate((log) => {
      battleLog = log.slice(-5);
    });
  });
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

  <SC.Primitive object={characterManager.mario} />
  <SC.Primitive object={characterManager.sonic} />
  <SC.Primitive object={characterManager.pacman} />
</SC.Canvas>

<div style="position: absolute; top: 10px; left: 10px; color: white;">
  Mario Health: {characterManager.marioHealth}
  Sonic Health: {characterManager.sonicHealth}
  Pac-Man Health: {characterManager.pacmanHealth}
  <p>Battle Mode: {battleManager.battleMode ? 'ON' : 'OFF'}</p>
  <ul>
    {#each battleLog as log}
      <li>{log}</li>
    {/each}
  </ul>
</div>
