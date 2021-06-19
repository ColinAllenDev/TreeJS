class Branch {
    constructor(parent, position, direction) {
        this.parent = parent;
        this.position = position;
        this.direction = direction;
    }

    Draw() {
        if(this.parent != null) {
            var path = new THREE.LineCurve3(this.parent.position, this.position);
            var geometry = new THREE.TubeGeometry(path, 8, 0.15, 4, false);
            var material = new THREE.MeshBasicMaterial({color: 0x964B00});
            var mesh = new THREE.Mesh(geometry, material);

            Main.AddToScene(mesh);
        }
    }
} 