function Doors() {
    
    var container = new THREE.Object3D()
    var wall = new THREE.Mesh(settings.geometry_2, settings.material_1);
    var side_1 = wall.clone();
    side_1.position.z = -40;
    side_1.rotation.y = Math.PI / 2;
    container.add(side_1)
    var side_2 = wall.clone();
    side_2.position.z = 40;
    side_2.rotation.y = Math.PI / 2;
    container.add(side_2)

    this.getDoors = function () {
        return container;
    }
}
