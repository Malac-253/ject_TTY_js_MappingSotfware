//Main Object Class to bulid off of
class Sprite {
    /*
      position{x,y},imageScr,velocity{x,y},animate t/f, 
      frames{max,hold},rotation,scale
      sprites imgs{up,left,down,right}, opacity, name
    */
    constructor({
        //Vector - Starting Postion       //HTML img tag
        position = {x: 0.0, y: 0.0},      image  = helper.html.img(),
        //Vector - force applied          //Boolean - can be animate?
        velocity = {x: 0.0, y: 0.0},      animate = false,
        /*Dict  - Max = posible frames    //Int - degree of roatation
                - Hold = FPS to next fr   //Int - amount of scale    */       
        frames = {max: 1, hold: 10 },    rotation = 0,    scale = 1,
        /*Dict  - HTML img = up sprite img    - HTML img = Left sprite img   
                - HTML img = down sprite img  - HTML img = right sprite img    */
        sprites = {up: helper.html.img(),left: helper.html.img(),
                  down: helper.html.img(),right: helper.html.img()},
        //Int - percent of of opacity
        opacity = 1 ,
        name = 'untitled' 
    }){
        //Linking to Object
        this.position = position;         
        this.image = helper.html.img(image)
        this.frames = { ...frames, val: 0, elapsed: 0 }
        this.animate = animate
        this.sprites = sprites
        this.opacity = opacity
        this.rotation = rotation
        this.scale = scale
        this.name = name

        //setting what will be seen
        this.image.onload = () => {
          // width is divded by amount of frames in sprites sheet
          this.width = (this.image.width / this.frames.max) * this.scale
          this.height = this.image.height * this.scale
        }   
    }

    draw() {
        // Save point to set the default state
        context.save() 

        //moves image to to match it's midpoint
        context.translate( 
            this.position.x + this.width / 2,
            this.position.y + this.height / 2 
        )    

        //in acts the rotation
        context.rotate(this.rotation)

        //moves image to to match it's midpoint
        context.translate(
          -this.position.x - this.width / 2,
          -this.position.y - this.height / 2
        )
        
        //match all opacity
        //context.globalAlpha = this.opacity

        //crop calculation for sprites images
        const crop = {
            position: {
              x: this.frames.val * (this.width / this.scale),
              y: 0
            },
            width: this.image.width / this.frames.max,
            height: this.image.height
        }

        //getting sprites images loaction data
        const image = {
          position: {
            x: this.position.x,
            y: this.position.y
          },
          width: this.image.width / this.frames.max,
          height: this.image.height
        }

    
        context.drawImage(
        //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)  
            this.image,
            //cropping
            crop.position.x,
            crop.position.y,
            crop.width,
            crop.height,
            //actual
            image.position.x,
            image.position.y,
            image.width * this.scale,
            image.height * this.scale
        ) //Help -- > https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

        // restore to save point to set the default state
        context.restore()

      
        if (!this.animate) return //Stop here if object is not intended to animate

        //keeps counter of frames
        if (this.frames.max > 1) {
          this.frames.elapsed++
        }
        
        //hole frame loop for an amount of frames
        if (this.frames.elapsed % this.frames.hold === 0) {
          if (this.frames.val < this.frames.max - 1) this.frames.val++
          else this.frames.val = 0
        }
    }
}


class Monster extends Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    isEnemy = false,
    name,
    attacks
  }) {
    super({
      position,
      velocity,
      image,
      frames,
      sprites,
      animate,
      rotation
    })
    this.health = 100
    this.isEnemy = isEnemy
    this.name = name
    this.attacks = attacks
  }

  faint() {
    document.querySelector('#dialogueBox').innerHTML = this.name + ' fainted!'
    gsap.to(this.position, {
      y: this.position.y + 20
    })
    gsap.to(this, {
      opacity: 0
    })
    audio.battle.stop()
    audio.victory.play()
  }

  attack({ attack, recipient, renderedSprites }) {
    document.querySelector('#dialogueBox').style.display = 'block'
    document.querySelector('#dialogueBox').innerHTML =
      this.name + ' used ' + attack.name

    let healthBar = '#enemyHealthBar'
    if (this.isEnemy) healthBar = '#playerHealthBar'

    let rotation = 1
    if (this.isEnemy) rotation = -2.2

    recipient.health -= attack.damage

    switch (attack.name) {
      case 'Fireball':
        audio.initFireball.play()
        const fireballImage = new Image()
        fireballImage.src = './img/fireball.png'
        const fireball = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y
          },
          image: fireballImage,
          frames: {
            max: 4,
            hold: 10
          },
          animate: true,
          rotation
        })
        renderedSprites.splice(1, 0, fireball)

        gsap.to(fireball.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          onComplete: () => {
            // Enemy actually gets hit
            audio.fireballHit.play()
            gsap.to(healthBar, {
              width: recipient.health + '%'
            })

            gsap.to(recipient.position, {
              x: recipient.position.x + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08
            })

            gsap.to(recipient, {
              opacity: 0,
              repeat: 5,
              yoyo: true,
              duration: 0.08
            })
            renderedSprites.splice(1, 1)
          }
        })

        break
      case 'Tackle':
        const tl = gsap.timeline()

        let movementDistance = 20
        if (this.isEnemy) movementDistance = -20

        tl.to(this.position, {
          x: this.position.x - movementDistance
        })
          .to(this.position, {
            x: this.position.x + movementDistance * 2,
            duration: 0.1,
            onComplete: () => {
              // Enemy actually gets hit
              audio.tackleHit.play()
              gsap.to(healthBar, {
                width: recipient.health + '%'
              })

              gsap.to(recipient.position, {
                x: recipient.position.x + 10,
                yoyo: true,
                repeat: 5,
                duration: 0.08
              })

              gsap.to(recipient, {
                opacity: 0,
                repeat: 5,
                yoyo: true,
                duration: 0.08
              })
            }
          })
          .to(this.position, {
            x: this.position.x
          })
        break
    }
  }
}

class Boundary {
  static width = 24
  static height = 24
  constructor({ position }) {
    this.position = position
    this.width = 24
    this.height = 24
  }



  draw() {
    //context.fillStyle = 'rgba(255, 0, 0, 0)'
    //context.fillRect(this.position.x, this.position.y, this.width, this.height)


      // Blue rectangle
      context.beginPath();
      //context.lineWidth = "5";
      //context.strokeStyle = 'red';
      context.fillStyle = 'red'
      context.rect(this.position.x, this.position.y, this.width, this.height);
      //context.stroke();
      context.fill();

  }
}