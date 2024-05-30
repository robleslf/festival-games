const canvas = document.getElementById('tablero');
const colorFondo = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//colorFondo.fillStyle = 'balck';
//colorFondo.fillRect(0,0,canvas.width,canvas.height);

class Jugador {
    constructor({posicion, velocidad}){
        this.posicion = posicion;
        this.velocidad = velocidad;
        this.rotacion = 0
    }

    pintar(){
        colorFondo.save()

        colorFondo.translate(this.posicion.x, this.posicion.y)
        colorFondo.rotate(this.rotacion)
        colorFondo.translate(-this.posicion.x, -this.posicion.y)

        //colorFondo.fillStyle = 'red';
        //colorFondo.fillRect(this.posicion.x, this.posicion.y, 100, 100);
        colorFondo.beginPath()
        colorFondo.moveTo(this.posicion.x + 30, this.posicion.y);
        colorFondo.lineTo(this.posicion.x - 10, this.posicion.y - 10);
        colorFondo.lineTo(this.posicion.x - 10, this.posicion.y + 10);
        colorFondo.closePath();

        colorFondo.strokeStyle = 'white';
        colorFondo.stroke();

        colorFondo.restore()
    }

    actualizar() {
        this.pintar()
        this.posicion.x += this.velocidad.x
        this.posicion.y += this.velocidad.y
    }
}


class Bala {
    constructor({posicion, velocidad}) {
        this.posicion = posicion
        this.velocidad = velocidad
        this.radius = 5
    }
    pintar(){
        colorFondo.beginPath()
        colorFondo.arc(this.posicion.x, this.posicion.y, this.radius, 0, Math.PI * 2, false)
        colorFondo.closePath()
        colorFondo.fillStyle = 'white'
        colorFondo.fill()
    }
    actualizar() {
        this.pintar()
        this.posicion.x += this.velocidad.x
        this.posicion.y += this.velocidad.y
    }
}

const jugador = new Jugador({
    posicion: {x: canvas.width / 2, y: canvas.height / 2},
    velocidad: {x: 0, y: 0}
})


const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const balas = []

function animacion() {
    window.requestAnimationFrame(animacion)
    colorFondo.fillStyle = 'black';
    colorFondo.fillRect(0,0,canvas.width,canvas.height);

    jugador.actualizar()

    for (let i = balas.length - 1; i >= 0; i--){
        const bala = balas[i]
        bala.actualizar()
    }


    // jugador.velocidad.x = 0
    // jugador.velocidad.y = 0
    if (keys.w.pressed) {
        //jugador.velocidad.x = 1
        jugador.velocidad.x = Math.cos(jugador.rotacion) * 3
        jugador.velocidad.y = Math.sin(jugador.rotacion) * 3
    } else if (!keys.w.pressed){
        jugador.velocidad.x *= 0.95
        jugador.velocidad.y *= 0.95
    }

    if (keys.d.pressed) jugador.rotacion += 0.05
    else if (keys.a.pressed) jugador.rotacion -= 0.05
}

animacion()

window.addEventListener('keydown', (event) => {
    //console.log(event)
    switch (event.code) {
        case 'KeyW':
            //console.log('wwwwwwww')
            keys.w.pressed = true
        break

        case 'KeyA':
            //console.log('aaaa')
            keys.a.pressed = true
        break

        case 'KeyD':
            //console.log('ddddd')
            keys.d.pressed = true
        break

        case 'Space':
            balas.push(
                new Bala({
                posicion: {
                    x: jugador.posicion.x + Math.cos(jugador.rotacion) * 30,
                    y: jugador.posicion.y + Math.sin(jugador.rotacion) * 30
                },
                velocidad: {
                    // x: 1,
                    // y: 0,
                    x: Math.cos(jugador.rotacion) * 3,
                    y: Math.sin(jugador.rotacion) * 3, 
                },
            })
        )
        break
    }
})

window.addEventListener('keyup', (event) => {
    //console.log(event)
    switch (event.code) {
        case 'KeyW':
            //console.log('wwwwwwww')
            keys.w.pressed = false
        break

        case 'KeyA':
            //console.log('aaaa')
            keys.a.pressed = false
        break

        case 'KeyD':
            //console.log('ddddd')
            keys.d.pressed = false
        break
    }
})