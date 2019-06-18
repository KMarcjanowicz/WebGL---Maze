function Level() {
    var container = new THREE.Object3D();
    var arr = [];
    var obj = leveldata.getLevelData()
    obj = JSON.stringify(obj);
    obj = JSON.parse(obj)

    for(var i = 0; i < obj.level.length; i++)
    {
        var x = parseInt(obj.level[i].i);
        var y = parseInt(obj.level[i].j);
        var h = hex.createHex(obj.level[i].dirin,obj.level[i].dirout, obj.level[i].type);

        if(x % 2 == 0)
        {
            h.position.x = y * 200 + 100;
        }
        else{
            h.position.x = y * 200;
        }
        h.position.z = x * 175;
        h.rotation.y = Math.PI / 1.2;
        h.position.y = 25;

        console.log(h.position.x);
        console.log(h.position.z);
        
        container.add(h);
        arr.push(h);
    }
    //tu wygeneruj meshe levelu na podstawie danych z poprzedniego pliku
    //i zwróć je do sceny
    this.getLevel = function () {
        return container;
    }
    this.getObject = function () {
        return obj;
    }
    this.getArr = function () {
        return arr;
    }
}