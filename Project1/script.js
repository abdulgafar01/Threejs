import * as THREE from 'three'
import gsap from 'gsap'

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
camera.position.z = 3
scene.add(camera)

// renderer 
const renderer = new THREE.WebGLRenderer({canvas})

renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)


// const clock = new THREE.Clock()

gsap.to(mesh.position, {duration:1, delay:1, x:2 })
gsap.to(mesh.position, {duration:1, delay:2, x:0 })

const tick = ()=> {
    // clock 
    // const elapsedTime = clock.getElapsedTime()


    // update object

    // mesh.position.y = Math.sin(elapsedTime)
    // mesh.position.x = Math.cos(elapsedTime)

    // render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()