<script>
  import { onMount, tick } from 'svelte';
  import { fade } from 'svelte/transition';

  export let videoSrc;
  let showOverlay = true;
  let showIntro = true;
  let videoContainer;
  let videoElement;
  let audioElement;

  async function startVideo() {
    showIntro = false;
    await tick();
    
    if (!videoElement) {
      videoElement = document.createElement('video');
      videoElement.src = videoSrc;
      videoElement.addEventListener('ended', hideOverlay);
      
      const track = document.createElement('track');
      track.kind = 'captions';
      track.label = 'English';
      track.srclang = 'en';
      track.src = '/path/to/your/captions.vtt';  // Update this path
      videoElement.appendChild(track);
      
      videoContainer.appendChild(videoElement);
    }
    
    try {
      await videoElement.play();
      console.log("Video playback started successfully");
      if (audioElement) audioElement.pause(); // Pause the intro music when video starts
    } catch (error) {
      console.error("Playback was prevented:", error);
      showIntro = true; // Show intro again if playback fails
    }
  }

  function hideOverlay() {
    showOverlay = false;
    if (audioElement) audioElement.play(); // Resume music after video ends
  }

  onMount(() => {
    audioElement = new Audio('/audio/goldheart-triumph.mp3');
    audioElement.loop = true;
    audioElement.volume = 0.5; // Adjust volume as needed
    audioElement.play();

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', hideOverlay);
      }
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    };
  });
</script>

{#if showOverlay}
  <div class="video-overlay" transition:fade="{{ duration: 1000 }}">
    {#if showIntro}
      <div class="intro-screen">
        <h1>Golden Legends</h1>
        <button class="start-button" on:click={startVideo}>
          Start Adventure
        </button>
      </div>
    {:else}
      <div class="video-container" bind:this={videoContainer}>
        <!-- Video element will be inserted here dynamically -->
      </div>
    {/if}
  </div>
{/if}


<style>
  .video-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .intro-screen {
    text-align: center;
    color: white;
  }

  h1 {
    font-size: 3em;
    margin-bottom: 20px;
  }

  .start-button {
    padding: 15px 30px;
    font-size: 1.2em;
    cursor: pointer;
    background-color: gold;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  .start-button:hover {
    background-color: #ffd700;
  }

  .video-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :global(.video-container video) {
    max-width: 100%;
    max-height: 100%;
  }
</style>