import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'
// const loader = new THREE.FontLoader();

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



// Objects
// const geometryTorus = new THREE.TorusGeometry( .7, .2, 40, 80 );
// const geometryCone = new THREE.ConeGeometry( .5, 1, 32 );
const geometry = new THREE.TorusKnotGeometry( .5, .25, 400, 50 );




const sphereMaterial = new THREE.MeshStandardMaterial( {
	color: 0xffffff,
	// reflectivity: 10,
	emissive: 0x0000ff,
	// emissiveIntensity: .4,
	// flatShading: true,
	// metalness: .9
	// wireframe: true
} );



// Mesh
const myTorus = new THREE.Mesh(geometry,sphereMaterial)
// myTorus.castShadow = true; //default is false
// myTorus.receiveShadow = false; //default
scene.add(myTorus)

// Lights
const pointLight1 = new THREE.PointLight(0xffffff, 2, 2.2)
pointLight1.position.set(-0.5, 1, 2)

const pointLight2 = new THREE.PointLight(0xff00ff, 1, 2.2)
pointLight2.position.set(.5, -1, -1)
// pointLight1.castShadow = true

scene.add(pointLight1)


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.shadowMap.enabled = true
// renderer.setClearColor( 0xffffff, 0);


/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    myTorus.rotation.x = .5 * elapsedTime
	// myTorus.rotation.y = .25 * elapsedTime
	myTorus.rotation.z = 1 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()