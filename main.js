

//creating THREE.js scene
const scene = new THREE.Scene();
//creating THREE.js camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//3D object global vareiables
let object;
let controls; 
let objToRender = 'dna'; //default object to render
let mouseX = 0;
let mouseY = 0;

//creating loader for 3D object
const loader = new GLTFLoader();

//loading the 3D object file 
loader.load ( 
    'models/${objToRender}/scene.gltf'
    , function ( gltf ) {
        object = gltf.scene;
        scene.add( object );
    },
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
        console.log( 'An error happened' );
    }
);

//creating renderer
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);

//add the rendere to the DOM 
document.getElementById("container3D").appendChild(renderer.domElement);

//camera postion
camera.position.z = objToRender ==="dna" ? 25 : 100;

//add ligt to the scene
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500,500, 500);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender ==="dna" ? 5 : 1);
scene.add(ambientLight);

// render the scene 
function animate() {
  requestAnimationFrame(animate);

if(object && objToRender === "dna"){
    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
}

renderer.render(scene, camera);
}


window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    });

    //add mouse position listerner to make the model move
    document.onmousemove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
animate();