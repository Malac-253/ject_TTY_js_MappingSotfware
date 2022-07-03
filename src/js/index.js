// Main Javascript File

//Get and Set up HTML Canvas
const canvas = document.getElementById('game_view'); //Grabbing the canvas element to put game inside of --> console.log(canvas);
const context = canvas.getContext('2d'); // Assigning a 2d API --> console.log(context);

//Setting Sizes
canvas.width = 1024;
canvas.height = 576;

//Set Basic Look
context.fillStyle = "White";
context.fillRect(0,0,canvas.width,canvas.height);


//map


// something to check in map
    const collisionsMap = []
    const xtilecount =  80;
    for (let i = 0; i < collisions.length; i += xtilecount) {
      collisionsMap.push(collisions.slice(i, xtilecount + i))
    }

    const boundaries = []

    const offset = {
      x: -200,
      y: -0
    }

    collisionsMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol === 9601){
                boundaries.push(
                    new Boundary({
                        position: {
                          x: j * Boundary.width + offset.x,
                          y: i * Boundary.height + offset.y
                        }
                    })
                )
            }
        })
    })


    // boundaries.push(
    //   new Boundary({
    //       position: {
    //         x: 100,
    //         y: 100
    //       }
    //   })
    // )

// Create the player
  const player = new Sprite({
    position: {
      x: 0,
      //canvas.width / 2 - 192 / 4 / 2,
      y: 0
      //canvas.height / 2 - 68 / 2
    },
    image: '../src/assets/img/testplayer.png',
    frames: {
      max: 3,
      hold: 5
    },
    sprites: {
      up: '',
      left: '',
      right: '../src/assets/img/testplayer.png',
      down: ''
    },
    name:"player",
    scale:0.5
  })
  
  const background = new Sprite({
    position: {
      x: offset.x,
      y: offset.y
    },
    image: '../src/assets/img/layer_1_fitted.png',
    name:"background"
  })


  const keys = {
    w:{pressed: false},
    a:{pressed: false},
    s:{pressed: false},
    d:{pressed: false},
    f:{pressed: false},
    t:{pressed: false},
    g:{pressed: false},
    h:{pressed: false}
  }
  let lastKey = ''

  const movables = [
    background,
    ...boundaries // ,
    //foreground,
    //...battleZones,
    //...characters
  ]
  const renderables = [
    background,
    ...boundaries ,
    //...battleZones,
    // ...characters,
    player // ,
    // foreground
  ]

  let tets =  - 0.25

  function animate() {
    const animationId = window.requestAnimationFrame(animate) // Loop causing function
    



    renderables.forEach((renderable) => {
      //console.log(renderable);
      
      renderable.draw()
    })

    
    //control tac

    if       (keys.a.pressed && lastKey === 'a') {
        //   for (let i = 0; i < boundaries.length; i++) {
        //   const boundary = boundaries[i]
        //   if (
        //     rectangularCollision({
        //       rectangle1: player,
        //       rectangle2: {
        //         ...boundary,
        //         position: {
        //           x: boundary.position.x + 3,
        //           y: boundary.position.y
        //         }
        //       }
        //     })
        //   ) {
        //     moving = false
        //     break
        //   }
        // }

        // if (moving)
        //   movables.forEach((movable) => {
        //     movable.position.x += 3
        //   })

        player.position.x -= 3
    }else if (keys.d.pressed && lastKey === 'd') {
        player.position.x += 3
    }else if (keys.w.pressed && lastKey === 'w') {
        player.position.y -= 3
    }else if (keys.s.pressed && lastKey === 's') {
        player.position.y += 3
    }else if (keys.f.pressed && lastKey === 'f') {
        movables.forEach((movable) => {
            movable.position.x += 3
        })
    }else if (keys.h.pressed && lastKey === 'h') {
        movables.forEach((movable) => {
            movable.position.x -= 3
        })
    }else if (keys.t.pressed && lastKey === 't') {
        movables.forEach((movable) => {
            movable.position.y += 3
        })
    }else if (keys.g.pressed && lastKey === 'g') {
        movables.forEach((movable) => {
            movable.position.y -= 3
        })
    }

  }

  animate()


window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
      break
    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      break
    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break
    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break
    case 'f':
      keys.f.pressed = true
      lastKey = 'f'
      break
      case 'g':
      keys.g.pressed = true
      lastKey = 'g'
      break
    case 'h':
      keys.h.pressed = true
      lastKey = 'h'
      break
    case 't':
      keys.t.pressed = true
      lastKey = 't'
      break
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
    case 'f':
        keys.f.pressed = false
        break
    case 'g':
        keys.g.pressed = false
        break
    case 'h':
        keys.h.pressed = false
        break
    case 't':
        keys.t.pressed = false
        break
  }
})


// console.log(player);
// // player.onload = () => {
// //   context.drawImage(player,0,0,player.width*.75,player.height*.75);
// // }

// background.onload = () => {
//   //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
//   context.drawImage(background,-1000,-1000,background.width*1.25,background.height*1.25);
//   context.drawImage(player,
//     //Help -- > https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
//     //cropping
//     0, 
//     0,
//     player.width/3,
//     player.height,
//     //actual
//     player.width,
//     player.height,
//     player.width/3,
//     player.height 
//     );
// }






// //Checking for support - The fallback content is displayed in browsers
//     if (canvas.getContext) {
      
//       // drawing code here

//     } else {
//       // canvas-unsupported code here
//             // ADD-LATER
//             // ERROR
//     }

    

