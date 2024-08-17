<script>
  import * as THREE from 'three';
  import * as SC from 'svelte-cubed';
  import { onMount } from 'svelte';
  import { createStarryBackgroundScene } from '$lib/components/StarryBackground.svelte';
  import VideoOverlay from './VideoOverlay.svelte';

  let starryBackgroundScene;
  let marioPosition = { x: -2, y: 0, z: 0 };
  let sonicPosition = { x: 2, y: 0, z: 0 };

  onMount(() => {
    starryBackgroundScene = createStarryBackgroundScene();
    animateCharacters();
  });

  const videoSrc = 'video/GoldenLegendsMovievideo.mp4';

  function createMario() {
    const marioGroup = new THREE.Group();

    // Body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1.5, 0.5),
      new THREE.MeshStandardMaterial({ color: 0xff0000 }) // Red
    );
    marioGroup.add(body);

    // Head
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.MeshStandardMaterial({ color: 0xffa07a }) // Light salmon
    );
    head.position.y = 1.15;
    marioGroup.add(head);

    // Hat
    const hat = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.3, 0.8),
      new THREE.MeshStandardMaterial({ color: 0xff0000 }) // Red
    );
    hat.position.y = 1.6;
    marioGroup.add(hat);

    // Eyes
    const eyeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.1);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.2, 1.2, 0.4);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.2, 1.2, 0.4);
    marioGroup.add(leftEye, rightEye);

    return marioGroup;
  }

  function createSonic() {
    const sonicGroup = new THREE.Group();

    // Body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1.5, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x1e90ff }) // Dodger blue
    );
    sonicGroup.add(body);

    // Head
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.8, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x1e90ff }) // Dodger blue
    );
    head.position.y = 1.15;
    sonicGroup.add(head);

    // Spikes
    const spikeGeometry = new THREE.BoxGeometry(0.2, 0.4, 0.2);
    const spikeMaterial = new THREE.MeshStandardMaterial({ color: 0x1e90ff });
    for (let i = 0; i < 5; i++) {
      const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);
      spike.position.set(-0.4 + i * 0.2, 1.5, 0);
      spike.rotation.z = Math.PI / 4;
      sonicGroup.add(spike);
    }

    // Eyes
    const eyeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.1);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye.position.set(0, 1.2, 0.4);
    sonicGroup.add(eye);

    return sonicGroup;
  }

  const mario = createMario();
  const sonic = createSonic();

  function animateCharacters() {
    let direction = 1;
    const animate = () => {
      marioPosition.x += 0.05 * direction;
      sonicPosition.x -= 0.05 * direction;

      if (Math.abs(marioPosition.x) > 4 || Math.abs(sonicPosition.x) > 4) {
        direction *= -1;
      }

      mario.position.set(marioPosition.x, marioPosition.y, marioPosition.z);
      sonic.position.set(sonicPosition.x, sonicPosition.y, sonicPosition.z);

      requestAnimationFrame(animate);
    };

    animate();
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
</SC.Canvas>