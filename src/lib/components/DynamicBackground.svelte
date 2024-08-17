<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';
  
    export let scene;
    
    let currentBackgroundMesh;
    let imageTextures = [];
    const imageLoader = new THREE.TextureLoader();
  
    onMount(async () => {
      console.log("DynamicBackground mounted");
      if (!scene) {
        console.error("Scene is not available");
        return;
      }
  
      try {
        // Load all textures
        for (let i = 139; i <= 999; i++) {
          for (let part = 1; part <= 4; part++) {
            const imageName = `movie_the_void_${i}_part_${part}.png`;
            console.log(`Loading image: ${imageName}`);
            try {
              const texture = await imageLoader.loadAsync(`/images/${imageName}`);
              imageTextures.push(texture);
            } catch (error) {
              console.error(`Failed to load image: ${imageName}`, error);
            }
          }
        }
  
        console.log(`Loaded ${imageTextures.length} textures`);
  
        // Create a plane geometry for the background
        const geometry = new THREE.PlaneGeometry(20, 10);
        currentBackgroundMesh = new THREE.Mesh(
          geometry,
          new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true })
        );
        currentBackgroundMesh.position.z = -5; // Place it behind other objects
        scene.add(currentBackgroundMesh);
        console.log("Background mesh added to scene");
  
        // Start the animation
        animateBackground();
      } catch (error) {
        console.error("Error in DynamicBackground setup:", error);
      }
    });
  
    function animateBackground() {
      let index = 0;
      const changeBackground = () => {
        if (currentBackgroundMesh && imageTextures.length > 0) {
          currentBackgroundMesh.material.map = imageTextures[index];
          currentBackgroundMesh.material.needsUpdate = true;
          index = (index + 1) % imageTextures.length;
        }
        setTimeout(changeBackground, 100); // Change every 100ms
      };
      changeBackground();
      console.log("Background animation started");
    }
  </script>