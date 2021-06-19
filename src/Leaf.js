class Leaf {
    constructor(position) {
        this.geometry = new THREE.SphereGeometry(0.1, 12, 12);
        this.material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.position = position;
        this.reached = false;
    }

    Draw() {
        Main.AddToScene(this.mesh);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    }

    ChangeColor(color) {
        this.material.color.setHex(color);
    }
} 