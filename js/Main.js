var settings;
var leveldata;
var hex;
var doors;
var level;
var model;
var fire;

$(document).ready(function () {

    var sphere_2;
    var sphere_1;
    let geometry = new THREE.SphereGeometry(30, 30, 30);
    let material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: false,
        transparent: true,
        opacity: 0.9
    });
    let material_1 = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: false,
        transparent: true,
        opacity: 0.9
    });
    sphere_2 = new THREE.Mesh(geometry, material);
    sphere_1 = new THREE.Mesh(geometry, material_1);

    var ready = false;


    settings = new Settings();
    leveldata = new LevelData();
    fire = new Fire();
    doors = new Doors();
    hex = new Hex();
    level = new Level();
    model = new Model();
    // nie ma ally

    var obj = level.getObject();
    console.log(obj)

    var allies = [];
    var models = [];
    var fires = [];
    var models_fire = [];

    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2()

    var raycaster_2 = new THREE.Raycaster();
    var mouseVector_2 = new THREE.Vector2()

    var raycaster_3 = new THREE.Raycaster();
    var mouseVector_3 = new THREE.Vector2()

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, $(window).width() / $(window).height(), 0.1, 10000);
    camera.position.set(300, 300, 300)
    camera.lookAt(scene.position);
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize($(document).width(), $(document).height());
    $(window).resize(function () {
        renderer.setSize($(document).width(), $(document).height());
    });
    $("#root").append(renderer.domElement);

    /////////////////////////////////////////////////////////////////////////////PLANE
    var plane = new THREE.Mesh(settings.geometryPlane, settings.planeMaterial);
    plane.position.set(0, 0, 0)
    settings.geometryPlane.rotateX(Math.PI / 2);
    plane.name = "plane"
    scene.add(plane);

    scene.add(level.getLevel()); ////////////////POZIOM

    ////////////////////////////////////////////////////////////////////////////PLAYER
    model.loadModel('model/tris.js', function (data) {
        data.position.set(100, 0, 0)
        scene.add(data);
        models.push(data);
    })

    allies = hex.getAllies();
    fires = hex.getFires();
    models_fire = hex.getFiresModels();
    console.log(fires);
    console.log(allies)

    ////////////////////////////////////////////////////////////////////////////PLAYER MOVEMENT
    $(document).mousedown(function (event) {
        if ((event.which == 1)) {
            ready = true;
            model.animate = true;
            for (var i = 1; i < models.length; i++) {
                if (allies[i - 1].clicked) {
                    allies[i - 1].animate = true;
                }
            }
            mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
            mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
            raycaster.setFromCamera(mouseVector, camera);
            var intersects = raycaster.intersectObjects(scene.children);
            if (intersects.length > 0) {
                if (intersects[0].object.name == "plane") {
                    models[0].clickedVect = intersects[0].point
                    models[0].directionVect = models[0].clickedVect.clone().sub(models[0].position).normalize()
                    //funkcja normalize() przelicza współrzędne x,y,z wektora na zakres 0-1
                    //jest to wymagane przez kolejne funkcje
                    var angle = Math.atan2(
                        models[0].position.clone().x - models[0].clickedVect.x,
                        models[0].position.clone().z - models[0].clickedVect.z
                    );
                    //models[0].rotation.y = angle
                    models[0].children[0].rotation.y = angle - (Math.PI / 2)
                    models[0].children[1].rotation.y = angle
                }

            }
        }
    })

    $("#r").on("change", function () {
        console.log(this.value)
        console.log(fires)
        for (var i = 0; i < models_fire.length; i++) {
            models_fire[i].scale.set(this.value, this.value, this.value);
        }
    });
    var t = true;
    function render() {

        $(document).on("click", function (event) {
            if ((event.which == 3)) {
                mouseVector_3.x = (event.clientX / $(window).width()) * 2 - 1;
                mouseVector_3.y = -(event.clientY / $(window).height()) * 2 + 1;
                raycaster_3.setFromCamera(mouseVector_3, camera);
                var intersects_3 = raycaster_3.intersectObjects(scene.children, true);
                if (intersects_3.length > 0) {
                    if(intersects_3[0].object.name == "ally" && t)
                    models.push(intersects_3[0].object.parent);
                    intersects_3 = "";
                    console.log(models);
                    t = false;
                }
            }
        });

        for (var i = 0; i < fires.length; i++) {
            if (fires[i].checkIFcomplete()) {
                fires[i].setComplete();
            }
            fires[i].updateFire();
        }
        //console.log(scene.children);
        //w tym miejscu ustalamy wszelkie zmiany w projekcie (obrót, skalę, położenie obiektów)
        //np zmieniająca się wartość rotacji obiektu

        if (ready) {
            //scene.remove(sphere_1);
            scene.add(sphere_1);
            var ray = new THREE.Ray(models[0].position.clone(), models[0].directionVect)
            sphere_1.position.set(models[0].position.x, models[0].position.y, models[0].position.z)

            raycaster_2.ray = ray
            var intersects_2 = raycaster_2.intersectObjects(level.getArr(), true);
            if (intersects_2[0]) {
                scene.remove(sphere_2)
                sphere_2.position.set(intersects_2[0].point.x, intersects_2[0].point.y, intersects_2[0].point.z)
                var clickedVect_2 = intersects_2[0].point
                var directionVect_2 = clickedVect_2.clone().sub(models[0].position).normalize()
                scene.add(sphere_2);
            }
            // for (var i = 0; i < models.length; i++) {
            //     models[i].position.set(allies_positions[i].x, allies_positions[i].y, allies_positions[i].z)
            // }
            if (models[0].directionVect) {
                for (var i = 0; i < models.length; i++) {
                    if (i > 0) {
                        //allies[i - 1].animate = true;
                        models[i].clickedVect = models[i - 1].position.clone();
                        models[i].directionVect = models[i].clickedVect.clone().sub(models[i].position).normalize()
                        var angle = Math.atan2(
                            models[i].position.clone().x - models[i].clickedVect.x,
                            models[i].position.clone().z - models[i].clickedVect.z
                        );
                        //models[0].rotation.y = angle
                        models[i].children[0].rotation.y = angle - (Math.PI / 2)
                        models[i].children[1].rotation.y = angle
                    }
                }
                if (models[0].position.clone().distanceTo(models[0].clickedVect.clone()) > 3 && model.move == true) {
                    models[0].translateOnAxis(models[0].directionVect.clone(), 3) // 5 - speed
                    if (model.animate) {
                        model.setAnimationRun();
                        model.animate = false;
                    }
                }
                else {
                    if (model.animate == false) {
                        model.setAnimationStand();
                        model.animate = true;
                    }
                }

                for (var i = 1; i < models.length; i++) {
                    if (models[i].position.clone().distanceTo(models[i].clickedVect.clone()) > 5) {
                        models[i].translateOnAxis(models[i].directionVect.clone(), 3) // 5 - speed
                        console.log(allies);
                        if (allies[i - 1].animate) {
                            allies[i - 1].setAnimationRun();
                            allies[i - 1].animate = false;
                        }
                    }
                    else {
                        if (allies[i - 1].animate == false) {
                            allies[i - 1].setAnimationStand();
                            allies[i - 1].animate = true;
                        }
                    }
                }
            }
            if (directionVect_2) {
                if (models[0].position.clone().distanceTo(clickedVect_2) < 10) {
                    model.move = false;
                }
                else {
                    model.move = true;
                }
            }

            camera.position.x = models[0].position.x
            camera.position.z = models[0].position.z + 200
            camera.position.y = models[0].position.y + 200
            camera.lookAt(models[0].position)
        }
        //mesh.rotation.y += 0.01;
        model.updateModel();
        for (var j = 0; j < allies.length;) {
            allies[j].updateModel();
            j++
        }
        //mesh.rotation.y += 0.01;
        //wykonywanie funkcji bez końca ok 60 fps jeśli pozwala na to wydajność maszyny

        requestAnimationFrame(render);

        //ciągłe renderowanie / wyświetlanie widoku sceny nasza kamerą

        renderer.render(scene, camera);
    }
    render();

});