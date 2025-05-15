import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Gui from 'lil-gui'
import gsap from 'gsap'


/**
 * debug
 */

const gui = new Gui()
const debugObject = {}

/**
 * cursor
 */

console.log(OrbitControls)

const cursor = {
    x:0,
    y:0
}
window.addEventListener('mousemove', (event)=> {
    cursor.x = event.clientX/sizes.width - 0.5
    cursor.y = -(event.clientY/sizes.height - 0.5)
   
})


const canvas = document.querySelector('canvas.webgl')

// scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () =>
{
    console.log('loadingManager: loading started')
}
loadingManager.onLoad = () =>
{
    console.log('loadingManager: loading finished')
}
loadingManager.onProgress = () =>
{
    console.log('loadingManager: loading progressing')
}
loadingManager.onError = () =>
{
    console.log('loadingManager: loading error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)

const colorTexture = textureLoader.load('./textures/door/color.jpg')
// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
// const colorTexture = textureLoader.load('/textures/checkerboard-2x2.png')
// const colorTexture = textureLoader.load(
//     '/textures/minecraft.png',
//     () =>
//     {
//         console.log('textureLoader: loading finished')
//     },
//     () =>
//     {
//         console.log('textureLoader: loading progressing')
//     },
//     () =>
//     {
//         console.log('textureLoader: loading error')
//     }
// )
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5


// colorTexture.generateMipmaps = false
// colorTexture.minFilter = THREE.NearestFilter 
// colorTexture.magFilter = THREE.NearestFilter

const alphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const heightTexture = textureLoader.load('./textures/door/height.jpg')
const normalTexture = textureLoader.load('./textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('./textures/door/roughness.jpg')



debugObject.color = "#a778d8"

// object
const geometry = new THREE.BoxGeometry(1,1,1,2,2,2)
const material = new THREE.MeshBasicMaterial({map:colorTexture})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

gui.add(mesh.position,'y').min(-3).max(3).step(0.01).name('elevation')
gui.add(material, "visible")
gui.add(material, 'wireframe')
gui.addColor(debugObject, 'color')
.onChange(()=>{
    material.color.set(debugObject.color)
})

debugObject.spinX = ()=>{
    gsap.to(mesh.rotation, {x:mesh.rotation.x + Math.PI / 2})
}
debugObject.spinY = ()=>{
    gsap.to(mesh.rotation, {y:mesh.rotation.y + Math.PI / 2})
}

gui.add(debugObject, 'spinX')
gui.add(debugObject, 'spinY') 

debugObject.subdivision = 2

gui
    .add(debugObject, "subdivision")
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(()=>{
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(
            1,1,1,
            debugObject.subdivision,
            debugObject.subdivision,
            debugObject.subdivision
        )
    })

     
// size 
const sizes = {
    width:window.innerWidth,
    height:window.innerHeight
}

window.addEventListener('resize', ()=> {

    // update sizes 
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    // update camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()

    // update renderer
    renderer.setSize(sizes.width, sizes.height)

})

window.addEventListener('dblclick', () => {
    if(!document.fullscreenElement){
        canvas.requestFullscreen()
    }

    else{
        document.exitFullscreen()
    }
})

// camera

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
// camera.position.x = 2 
// camera.position.y = 2 
camera.position.z = 3
// camera.lookAt(mesh.position)
scene.add(camera)

// controls 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// renderer 
const renderer = new THREE.WebGLRenderer({canvas})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

renderer.render(scene, camera)


const clock = new THREE.Clock()


// making use of gsap 
// gsap.to(mesh.position, {duration:1, delay:1, x:2 })
// gsap.to(mesh.position, {duration:1, delay:2, x:0 })

const tick = ()=> {
    // clock 
    const elapsedTime = clock.getElapsedTime()


    // update object


    // mesh.rotation.y = elapsedTime
    // mesh.position.y = Math.sin(elapsedTime)
    // mesh.position.x = Math.cos(elapsedTime)
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) *3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) *3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position)


    // update controls
    controls.update()

    // render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()