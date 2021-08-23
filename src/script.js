import './style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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
const objectTorusKnot1 = new THREE.TorusKnotGeometry(.6, .12, 1000, 80, 3, 7)




// MeshPhongMaterial
// MeshStandardMaterial
const sphereMaterial = new THREE.MeshPhongMaterial( {
	color: 0xffffff,
	// reflectivity: 10,
	emissive: 0xff0000,
	emissiveIntensity: .1,
	specular: 0xffffff,
    shininess: 5000,
	// flatShading: true,
	// metalness: 200,
	// wireframe: true,
	castShadow: false,
	receiveShadow: false

} );





// Mesh
const myTorus1 = new THREE.Mesh(objectTorusKnot1, sphereMaterial)
const myTorus2 = new THREE.Mesh(objectTorusKnot1, sphereMaterial)
// myTorus.castShadow = true; //default is false
// myTorus.receiveShadow = false; //default
scene.add(myTorus1)




// Lights
const pointLight1 = new THREE.PointLight(0xff0000, 1.5, 2.5)
pointLight1.position.set(-0.5, 1, 2)

const pointLight2 = new THREE.PointLight(0x0000ff, 0.8, 2.2)
pointLight2.position.set(.5, -1, 1)
// pointLight1.castShadow = true

scene.add(pointLight1, pointLight2)


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
    canvas: canvas,
	alpha: true // transparent background
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
    myTorus1.rotation.x = .5 * elapsedTime
	// myTorus1.rotation.y = .15 * elapsedTime
	myTorus1.rotation.z = 1 * elapsedTime


	// myTorus1.scale.y = Math.sin(1 * elapsedTime)
	myTorus1.geometry.tube = .1
	

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



