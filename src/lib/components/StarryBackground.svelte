<script context="module">
    import * as THREE from 'three';
  
    export function createStarryBackgroundScene() {
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
  
      const starVertices = [];
      for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
      }
  
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      return new THREE.Points(starGeometry, starMaterial);
    }
  </script>
  
  <script>
    // This component doesn't render anything visible
  </script>