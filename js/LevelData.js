function LevelData() {
    var obj =
        {
            "size": "3",
            "level": [
                {
                    "i": "0",
                    "j": "0",
                    "dirin": "0",
                    "dirout": "6",
                    "type": "fire"
                },
                {
                    "i": "0",
                    "j": "1",
                    "dirin": "3",
                    "dirout": "1",
                    "type": "ally"
                },
                {
                    "i": "1",
                    "j": "2",
                    "dirin": "4",
                    "dirout": "1",
                    "type": "ally"
                },
                {
                    "i": "2",
                    "j": "2",
                    "dirin": "4",
                    "dirout": "3",
                    "type": "fire"
                },
                {
                    "i": "2",
                    "j": "1",
                    "dirin": "6",
                    "dirout": "3",
                    "type": "ally"
                },
                {
                    "i": "2",
                    "j": "0",
                    "dirin": "6",
                    "dirout": "4",
                    "type": "wall"
                },
                {
                    "i": "1",
                    "j": "0",
                    "dirin": "1",
                    "dirout": "3",
                    "type": "wall"
                }
            ]
        }
    this.getLevelData = function () {
        return obj
    }
}
