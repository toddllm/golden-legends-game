<script>
    import Game from '$lib/components/Game.svelte';
  </script>
  
  <main>
    <h1>Golden Legends</h1>
    <Game />
  </main>
  
  <style>
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: #202020;
      color: white;
      font-family: Arial, sans-serif;
    }
  
    h1 {
      margin-bottom: 20px;
    }
  </style>
  