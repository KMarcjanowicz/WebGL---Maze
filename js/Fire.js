function Fire() {
    var complete = false;
    var particles = [];
    var scales = []
    var container = new THREE.Object3D();
    
    var material = new THREE.MeshBasicMaterial({
        color: 0xff6600,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending // kluczowy element zapewniający mieszanie kolorów poszczególnych cząsteczek
    });
    var CubeGeometry = new THREE.BoxGeometry(10, 10, 10);
    var SphereGeometry = new THREE.SphereBufferGeometry(10, 8, 8);
    var OctahedronGeometry = new THREE.SphereBufferGeometry(10, 4, 2);
    var TetrahedronGeometry = new THREE.TetrahedronGeometry(10, 0);

    for (var i = 0; i < 200; i++) {
        console.log("particle!")
        var particle;
        var a = 1;
        var b = 1 + Math.floor(Math.random() * 5);
        if (a <= 1) {
            particle = new THREE.Mesh(CubeGeometry.clone(), material.clone());
        }
        else if (a == 2) {
            particle = new THREE.Mesh(SphereGeometry.clone(), material.clone());
        }
        else if (a == 3) {
            particle = new THREE.Mesh(OctahedronGeometry.clone(), material.clone());
        }
        else {
            particle = new THREE.Mesh(TetrahedronGeometry.clone(), material.clone());
        }
        particle.scale.set(b, b, b);
        particle.position.y = 1 + Math.floor(Math.random() * 200);
        particle.position.x = 1 + Math.floor(Math.random() * 100);
        particle.position.z = 1 + Math.floor(Math.random() * 100);
        container.add(particle);
        particles.push(particle);
        scales.push(b);
    }
    complete = true;

    //*LIGHT*
    var light = new THREE.PointLight(0xff0000, 10, 500, 3.14);
    light.position.set(0, 0, 0);
    //light.lookAt(mesh.position);
    container.add(light);

    this.getFire = function () {
        return container;
    }
    this.checkIFcomplete = function () {
        return complete;
    }
    this.setComplete = function () {
        complete = false;
    }
    this.updateFire = function () {
        for (var i = 0; i < particles.length; i++) {
            if (particles[i].position.y >= 300) {
                particles[i].material.opacity = 0.5;
                particles[i].scale.set(scales[i], scales[i], scales[i])
                particles[i].position.y = 1 + Math.floor(Math.random() * 70);
                particles[i].position.x = 1 + Math.floor(Math.random() * 100);
                particles[i].position.z = 1 + Math.floor(Math.random() * 100);
            }
            else {
                particles[i].position.y += 1 + Math.floor(Math.random() * 3);
            }
            particles[i].material.opacity -= 0.005;
            particles[i].scale.x -= 0.01 * scales[i];
            particles[i].scale.y -= 0.01 * scales[i];
            particles[i].scale.z -= 0.01 * scales[i];
        }

    }
}

