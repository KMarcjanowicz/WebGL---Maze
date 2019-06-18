function Settings() {
    this.radius = 100 // wielkość hexagona, a tym samym całego labiryntu
    this.geometry_1 = new THREE.BoxGeometry(120, 50, 10);
    this.geometry_2 = new THREE.BoxGeometry(40, 50, 10);
    this.geometry_3 = new THREE.BoxGeometry(40, 40, 40);
    this.geometryPlane = new THREE.PlaneGeometry(2000, 2000, 20, 20)
    
    this.material_1 = new THREE.MeshBasicMaterial({
        color: 0x8888ff,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true,
        opacity: 0.5
    });
    this.material_2 = new THREE.MeshBasicMaterial({
        color: 0xff00000,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true,
        opacity: 0.5
    });
    this.planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x323232,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true,
    });
}