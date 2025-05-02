import * as THREE from 'three'
// import gsap from 'gsap'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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

// object
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color:"red"})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// size 
const sizes = {
    width:800,
    height:600
}

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