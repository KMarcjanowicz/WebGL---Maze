function Hex() {
    var allies = [];
    var models = [];
    var fires = [];
    var models_fire = [];
    this.createHex = function (x, y, z) {
        var m = parseInt(x);
        var n = parseInt(y);
        if (m == 5) {
            m = 1;
        }
        else if (m == 4) {
            m = 2;
        }
        else if (m == 2) {
            m = 4;
        }
        else if (m == 1) {
            m = 5;
        }
        else if (m == 5) {
            m = 1;
        }
        if (n == 5) {
            n = 1;
        }
        else if (n == 4) {
            n = 2;
        }
        else if (n == 2) {
            n = 4;
        }
        else if (n == 1) {
            n = 5;
        }
        else if (n == 1) {
            n = 5;
        }
        var container = new THREE.Object3D();
        var wall = new THREE.Mesh(settings.geometry_1, settings.material_1);
        for (var i = 0; i < 6; i++) {
            if (m != (i + 1) && n != (i + 1)) {
                var side = wall.clone()
                side.position.z = settings.radius * Math.cos(i * Math.PI / 3);
                side.position.x = settings.radius * Math.sin(i * Math.PI / 3);
                side.lookAt(container.position)
                container.add(side)
            }
            else if (m == (i + 1) || n == (i + 1)) {
                var door = doors.getDoors().clone();
                door.position.z = settings.radius * Math.cos(i * Math.PI / 3);
                door.position.x = settings.radius * Math.sin(i * Math.PI / 3);
                door.lookAt(container.position)
                door.rotation.y += Math.PI / 2;
                container.add(door)
            }
        }
        if (z == "ally") {
            var ally = new Ally();
            allies.push(ally);
            ally.loadModel('ally/tris.js', function (data) {
                container.add(data);
                models.push(data);
            })
        }
        else if (z == "fire") {
            var f = new Fire();
            var m = f.getFire();
            m.scale.set(0.2, 0.2, 0.2);
            //f.position.x = 80;
            //f.position.z = -20;
            //m.rotation.x = - Math.PI;
            m.position.y = -20;
            fires.push(f);
            models_fire.push(m)
            container.add(m);
        }
        return container;
    }

    this.getAllies = function () {
        return allies;
    }

    this.getModels = function () {
        return models;
    }

    this.getFires = function () {
        return fires;
    }
    this.getFiresModels = function () {
        return models_fire;
    }
}