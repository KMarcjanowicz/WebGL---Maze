function Ally() {
    
    var container = new THREE.Object3D
    //container.name = "ally"
    var mixer;
    var meshModel;
    var clock = new THREE.Clock();

    this.animate = false;
    this.clicked = false;
    this.hover = false;
    this.clickedVect; // wektor określający punkt kliknięcia
    this.directionVect; // wektor określający kierunek ruchu playera

    this.loadModel = function (url, callback) {

        var loader = new THREE.JSONLoader();
        loader.load(url, function (geometry) {
            var modelMaterial = new THREE.MeshBasicMaterial(
                {
                    map: THREE.ImageUtils.loadTexture("ally/tris.png"),
                    morphTargets: true // odpowiada za animację materiału modelu

                });

            // ładowanie modelu jak porzednio
            meshModel = new THREE.Mesh(geometry, modelMaterial);
            meshModel.rotation.y = 2; // ustaw obrót modelu
            meshModel.position.y = 0; // ustaw pozycje modelu
            meshModel.scale.set(1.2, 1.2, 1.2); // ustaw skalę modelu
            meshModel.position.set(0, 40, 0)
            //utworzenie mixera
            mixer = new THREE.AnimationMixer(meshModel);
            mixer.clipAction("stand").play();
            //dodanie modelu do kontenera
            //console.log(geometry.animations)
            meshModel.name = "ally";
            container.add(meshModel)
            var axes = new THREE.AxesHelper(50) // osie do kontroli kierunku ruchu
            container.add(axes)
            // zwrócenie kontenera

            callback(container);

        });
    }
    this.updateModel = function () {
        var delta = clock.getDelta();
        if (mixer) mixer.update(delta)
    }

    //animowanie postaci

    this.setAnimationRun = function () {
        if (mixer) {
            mixer.uncacheRoot(meshModel);
            mixer.clipAction("run").play();
        }

    }
    this.setAnimationStand = function () {
        if (mixer) {
            mixer.uncacheRoot(meshModel);
            mixer.clipAction("stand").play();
        }
    }
}