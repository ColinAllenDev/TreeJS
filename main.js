/* Main Class: Program Entry Point */

// Components
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas});
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
const scene = new THREE.Scene();

class Main {
    // Initialization
    static Init() {
        // Event Listeners
        window.addEventListener('resize', this.OnResizeWindow, false);

        // Set renderer size (set to false if we wanna scale with the window)
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

        // Position Camera
        camera.position.set(0, 0, 15);

        // Lights
        this.AddToScene(light);
        
        // Plant Tree
        var tree = new Tree();
    }

    // The render 'loop'
    static Render() {;
        // Loop
        requestAnimationFrame(Main.Render);

        // Update Camera Controls
        controls.update();

        // Render Scene
        renderer.render(scene, camera);
    }

    // Resize window event listener
    static OnResizeWindow() {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        
        Main.Render();
    }

    // Add object to scene
    static AddToScene(obj) {
        scene.add(obj);
        this.Render();
    }

    /* ===== GETTTERS ====== */
    static GetCanvasBounds() {
        var bounds = new THREE.Vector2(canvas.clientWidth / 100, canvas.clientHeight / 100);
        return bounds;
    }
}

Main.Init();
Main.Render();
