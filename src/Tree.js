class Tree {
    origin = new THREE.Vector3(0, 2, 0);
    base = new THREE.Vector3(0, -8, 0);
    radius = 6;

    leaves = [];
    branches = [];
    grown = false;
    
    constructor() {
        this.PlantLeaves(25, this.origin, this.radius)
        this.PlantBranches(this.base, new THREE.Vector3(0, 1, 0));

        for(var i = 0; i < this.branches.length; i++) {
            this.branches[i].Draw();
        }
    }

    PlantLeaves(count, origin, radius) {
        for(var i = 0; i < count; i++) {
            var position = Util.GetRandomPointInSphere(origin, radius);
            var leaf = new Leaf(position);

            leaf.Draw();
            this.leaves.push(leaf);
        }
        this.DrawWireSphere(origin, radius);
    }

    
    PlantBranches(origin, direction) {
        var root = new Branch(null, origin, direction);
        var currentBranch = root;
        this.branches.push(currentBranch);

        var trunkGrown = false;
        while(!this.grown) {

            while(!trunkGrown) {                
                if(Util.IsPointInSphere(currentBranch.position, this.origin, this.radius)) {
                    trunkGrown = true; 
                }

                var newPos = currentBranch.position.clone().add(currentBranch.direction);
                var newBranch = new Branch(currentBranch, newPos, currentBranch.direction.clone());

                currentBranch = newBranch;
                this.branches.push(currentBranch);
            }

            this.leaves.sort((a, b) => {
                var aDist = a.position.distanceTo(currentBranch.position);
                var bDist = b.position.distanceTo(currentBranch.position);
                return bDist - aDist;
            });
            
            var targetLeaf = this.leaves[this.leaves.length-1];

            while(!targetLeaf.reached) {
                var newDir = targetLeaf.position.clone().sub(currentBranch.position);
                var newPos = currentBranch.position.clone().add(newDir);
                var newBranch = new Branch(currentBranch, newPos, newDir);

                currentBranch = newBranch;
                this.branches.push(currentBranch);

                targetLeaf.reached = true;
                targetLeaf.ChangeColor('0xff0000');    
            }
            this.leaves.pop(targetLeaf);

            if(this.leaves.length == 0) this.grown = true;
        }
    }

    DrawWireSphere(origin, radius) {
        var geometry = new THREE.SphereGeometry(radius, 10, 10);
        var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true, transparent: true, opacity: 0.15});
        var mesh = new THREE.Mesh(geometry, material);

        Main.AddToScene(mesh);
        mesh.position.set(origin.x, origin.y, origin.z);
    }
}
