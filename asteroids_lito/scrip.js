
let lienzo= document.getElementById("canvas");
let baseFondo= lienzo.getContext("2d");

// Tamaño pantalla y color
lienzo.width= window.innerWidth;
lienzo.height= window.innerHeight;

// Clase da nave
class Xojador{
    constructor({posicion, velocidad}) {
        this.posicion= posicion;
        this.velocidad= velocidad;
        this.rotacion= 0;
        this.radius= 20; // deteccion das colisións detección de colisiones
    }

    formaNave() {
        baseFondo.save();
        baseFondo.translate(this.posicion.x, this.posicion.y);
        baseFondo.rotate(this.rotacion);
        baseFondo.translate(-this.posicion.x, -this.posicion.y);

        baseFondo.beginPath();
        baseFondo.moveTo(this.posicion.x + 30, this.posicion.y);
        baseFondo.lineTo(this.posicion.x - 10, this.posicion.y - 10);
        baseFondo.lineTo(this.posicion.x - 10, this.posicion.y + 10);
        baseFondo.closePath();

        baseFondo.strokeStyle = "violet";
        baseFondo.stroke();
        baseFondo.restore();
    }

    actualizar() {
        this.formaNave();
        this.posicion.x+= this.velocidad.x;
        this.posicion.y+= this.velocidad.y;
    }
}

// Clase de la bala
class Bala{
    constructor({posicion, velocidad}){
        this.posicion= posicion;
        this.velocidad= velocidad;
        this.radius= 4.5;
    }

    // Color da bala 
    formaBala() {
        baseFondo.beginPath();
        baseFondo.arc(this.posicion.x, this.posicion.y, this.radius, 0, Math.PI * 2, false);
        baseFondo.closePath();
        baseFondo.fillStyle= "steelblue";
        baseFondo.fill();
    }

    actualizar(){
        this.formaBala();
        this.posicion.x+= this.velocidad.x;
        this.posicion.y+= this.velocidad.y;
    }
}

// Clase dos asteroides
class Asteroide{
    constructor({posicion, velocidad}) {
        this.posicion= posicion;
        this.velocidad= velocidad;
        this.radius= 50 * Math.random() + 10;
    }

    draw(){
        baseFondo.beginPath();
        baseFondo.arc(this.posicion.x, this.posicion.y, this.radius, 0, Math.PI * 2, false);
        baseFondo.closePath();
        baseFondo.strokeStyle= 'white';
        baseFondo.stroke();
    }

    update(){
        this.draw();
        this.posicion.x+= this.velocidad.x;
        this.posicion.y+= this.velocidad.y;
    }
}

// Crear xogador 1
let xogador1= new Xojador({
    posicion:{
        x: lienzo.width / 2,
        y: lienzo.height / 2,
    },
    velocidad:{
        x: 0,
        y: 0,
    }
});

let keys= {
    w:{ pressed: false },
    a:{ pressed: false },
    d:{ pressed: false }
};

// Variable balas
let balas=[];

// Variable dos asteroides
let asteroides=[];

// Variable da puntuación
let puntuacion=0;

// Función colisions
function detectarColision(objeto1, objeto2){
    const distX= objeto1.posicion.x - objeto2.posicion.x;
    const distY= objeto1.posicion.y - objeto2.posicion.y;
    const distancia= Math.sqrt(distX * distX + distY * distY);

    return distancia < (objeto1.radius + objeto2.radius);
}

let juegoTerminado= false;

// Función da animación
function animacion(){
    if (juegoTerminado) return;
    window.requestAnimationFrame(animacion);
    baseFondo.fillStyle = "black";
    baseFondo.fillRect(0, 0, lienzo.width, lienzo.height);
    xogador1.actualizar();

    // Mostrar la puntuación
    baseFondo.fillStyle= "white";
    baseFondo.font= "24px Arial";
    baseFondo.fillText("Puntuación: " + puntuacion, 10, 30);

    // Animación das balas
    for (let i = balas.length - 1; i >= 0; i--) {
        let bala = balas[i];
        bala.actualizar();

        //  Colision cos asteroides
        for (let j = asteroides.length - 1; j >= 0; j--) {
            let asteroide = asteroides[j];

            if (detectarColision(bala, asteroide)) {
                // Borrado das balas cando baten
                balas.splice(i, 1);
                asteroides.splice(j, 1);
                // Incrementar a puntuación
                puntuacion += 10;
                break;
            }
        }
    }

    // Animación dos asteroides
    for(let i = asteroides.length - 1; i >= 0; i--){
        let asteroide = asteroides[i];
        asteroide.update();

        // Colisions ca nave
        if (detectarColision(xogador1, asteroide)){
            juegoTerminado = true;
            alert("Hay fui a nave batestes cun meteorito :(   Puntuación final: " + puntuacion +"  F5 Para reiniciar");
            return;
        }
    }

    // Movimiento da nave
    if (keys.w.pressed){
        xogador1.velocidad.x = Math.cos(xogador1.rotacion) * 2;
        xogador1.velocidad.y = Math.sin(xogador1.rotacion) * 2;
    } else{
        xogador1.velocidad.x *= 0.97;
        xogador1.velocidad.y *= 0.97;
    }

    if (keys.d.pressed) xogador1.rotacion += 0.05;
    if (keys.a.pressed) xogador1.rotacion -= 0.05;
}

animacion();

// Teclas de movimiento
window.addEventListener("keydown", (evento) => {
    switch (evento.code) {
        case "KeyW":
            keys.w.pressed= true;
            break;
        case "KeyA":
            keys.a.pressed= true;
            break;
        case "KeyD":
            keys.d.pressed= true;
            break;
        case "Space":
            balas.push(new Bala({
                posicion: {
                    x: xogador1.posicion.x + Math.cos(xogador1.rotacion) * 30,
                    y: xogador1.posicion.y + Math.sin(xogador1.rotacion) * 30,
                },
                velocidad: {
                    x: Math.cos(xogador1.rotacion) * 3,
                    y: Math.sin(xogador1.rotacion) * 3,
                }
            }));
            break;
    }
});

window.addEventListener("keyup",(evento) => {
    switch (evento.code) {
        case "KeyW":
            keys.w.pressed= false;
            break;
        case "KeyA":
            keys.a.pressed= false;
            break;
        case "KeyD":
            keys.d.pressed= false;
            break;
    }
});

// Generar asteroides
window.setInterval(() =>{
    if (!juegoTerminado){
        asteroides.push(new Asteroide({
            posicion: {
                x: Math.random() * lienzo.width,
                y: Math.random() * lienzo.height
            },
            velocidad: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            }
        }));
    }
}, 0o500);
