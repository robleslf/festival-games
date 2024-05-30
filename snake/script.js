//tablero
var bloques = 30;
var filas = 25;
var columnas = 25;
var tablero;
var contenido;
var puntuacion = 0;

//Serpiente
var serpienteX = bloques * 5;
var serpienteY = bloques * 5;
var velocidadX = 0;
var velocidadY = 0;
var cuerpoSerpiente = [];

//Comida
var comidaX;
var comidaY;

var gameOver = false;

//Creamos el tablero y ponemos la comida
window.onload = function(){
    tablero = document.getElementById("tablero");
    tablero.height = filas * bloques;
    tablero.width =  columnas * bloques;
    contenido = tablero.getContext("2d");

    ponerComida();
    document.addEventListener("keydown", cambiarDireccion);
    setInterval(actualizar, 1000/10);
}


function actualizar(){
    if (gameOver){
        return;
    }

    contenido.fillStyle = "lightgreen";
    contenido.fillRect( 0, 0, tablero.width, tablero.height);

    contenido.fillStyle = "red";
    contenido.fillRect( comidaX, comidaY, bloques, bloques);

    //Al comer, poner nueva comida
    if (serpienteX == comidaX && serpienteY == comidaY){
        cuerpoSerpiente.push([comidaX,comidaY]);
        puntuacion+= 10;
        document.getElementById("puntuacion").textContent = "Puntuacion: " + puntuacion;
        ponerComida();
    }

    for (let i = cuerpoSerpiente.length-1; i > 0; i--){
        cuerpoSerpiente[i] = cuerpoSerpiente [i-1]
    }

    if (cuerpoSerpiente.length){
        cuerpoSerpiente[0] = [serpienteX,serpienteY];
    }

    contenido.fillStyle = "purple";
    serpienteX += velocidadX * bloques;
    serpienteY += velocidadY * bloques;
    contenido.fillRect( serpienteX, serpienteY, bloques, bloques);

    for (let i = 0; i < cuerpoSerpiente.length; i++){
        contenido.fillRect( cuerpoSerpiente[i][0], cuerpoSerpiente[i][1], bloques, bloques);
    }

    //Game Over
    if (serpienteX < 0 || serpienteX >= columnas*bloques || serpienteY < 0 || serpienteY >= filas*bloques){
        gameOver = true;
        alert("Game Over");
        alert("Tu Puntuacion ha sido: "+ puntuacion);
    }

    for (let i = 0; i< cuerpoSerpiente.length; i++){
        if (serpienteX == cuerpoSerpiente[i][0] && serpienteY == cuerpoSerpiente[i][1]){
            gameOver = true;
            alert("Game Over");
            alert("Tu Puntuacion ha sido: "+ puntuacion);
        }
    }
} 

//Cambiar el rumbo de la serpiente
function cambiarDireccion(e){
    
    if (e.code == "ArrowUp" && velocidadY != 1){
        velocidadX = 0;
        velocidadY = -1;
    }
    else if (e.code == "ArrowDown" && velocidadY != -1){
        velocidadX = 0;
        velocidadY = 1;
    }
    else if (e.code == "ArrowLeft" && velocidadX != 1){
        velocidadX = -1;
        velocidadY = 0;
    }
    else if (e.code == "ArrowRight" && velocidadX != -1){
        velocidadX = 1;
        velocidadY = 0;
    }
}

//Poner Comida
function ponerComida(){
    comidaX = Math.floor(Math.random() * columnas) * bloques;
    comidaY =  Math.floor(Math.random() * filas) * bloques;
}
