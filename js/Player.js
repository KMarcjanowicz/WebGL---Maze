function Player() {

    var container = new THREE.Object3D()
    var geometry = new THREE.BoxGeometry(20, 20, 20);
    var material = new THREE.MeshBasicMaterial({
        color: 0x8888ff,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true,
        opacity: 0.5
    });
    var player = new THREE.Mesh(geometry, material); // player sześcian
    player.position.y = 20;
    container.add(player)

    var axes = new THREE.AxesHelper(100) // osie do kontroli kierunku ruchu
    container.add(axes)

    //funkcja zwracająca kontener
    this.getPlayerCont = function () {
        return container;
    }

    //funkcja zwracająca playera
    this.getPlayerMesh = function () {
        return player;
    }

}