

let sumaDealer = 0;
let tuSuma = 0;

let cuentaAsesDealer = 0;
let tuCuentaAses = 0; 

let oculto;
let baraja;

let puedeSeguir = true; 

window.onload = function() {
    crearBaraja();
    barajarBaraja();
    empezarJuego();
}

function crearBaraja() {
    let valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let tipos = ["C", "D", "H", "S"];
    baraja = [];

    for (let i = 0; i < tipos.length; i++) {
        for (let j = 0; j < valores.length; j++) {
            baraja.push(valores[j] + "-" + tipos[i]); 
        }
    }
    
}

function barajarBaraja() {
    for (let i = 0; i < baraja.length; i++) {
        let j = Math.floor(Math.random() * baraja.length); 
        let temp = baraja[i];
        baraja[i] = baraja[j];
        baraja[j] = temp;
    }
    console.log(baraja);
}

function empezarJuego() {
    oculto = baraja.pop();
    sumaDealer += obtenerValor(oculto);
    cuentaAsesDealer += checkearAs(oculto);
    

    while (sumaDealer < 17) {
        
        let imagenCarta = document.createElement("img");
        let cartas = baraja.pop();
        imagenCarta.src = "./cartas/" + cartas + ".png";
        sumaDealer += obtenerValor(cartas);
        cuentaAsesDealer += checkearAs(cartas);
        document.getElementById("cartasDealer").append(imagenCarta);
    }
    console.log(sumaDealer);

    for (let i = 0; i < 2; i++) {
        let imagenCarta = document.createElement("img");
        let cartas = baraja.pop();
        imagenCarta.src = "./cartas/" + cartas + ".png";
        tuSuma += obtenerValor(cartas);
        tuCuentaAses += checkearAs(cartas);
        document.getElementById("tusCartas").append(imagenCarta);
    }

    console.log(tuSuma);
    document.getElementById("seguir").addEventListener("click", seguir);
    document.getElementById("aguantar").addEventListener("click", aguantar);

}

function seguir() {
    if (!puedeSeguir) {
        return;
    }

    let imagenCarta = document.createElement("img");
    let cartas = baraja.pop();
    imagenCarta.src = "./cartas/" + cartas + ".png";
    tuSuma += obtenerValor(cartas);
    tuCuentaAses += checkearAs(cartas);
    document.getElementById("tusCartas").append(imagenCarta);

    if (reducirAs(tuSuma, tuCuentaAses) > 21) { //A, J, 8 -> 1 + 10 + 8
        puedeSeguir = false;
    }

}

function aguantar() {
    sumaDealer = reducirAs(sumaDealer, cuentaAsesDealer);
    tuSuma = reducirAs(tuSuma, tuCuentaAses);

    puedeSeguir = false;
    document.getElementById("oculto").src = "./cartas/" + oculto + ".png";

    let message = "";
    if (tuSuma > 21) {
        message = "Has perdido!";
    }
    else if (sumaDealer > 21) {
        message = "Has ganado!";
    }
    else if (tuSuma == sumaDealer) {
        message = "Empate!";
    }
    else if (tuSuma > sumaDealer) {
        message = "Has ganado!";
    }
    else if (tuSuma < sumaDealer) {
        message = "Has perdido!";
    }

    document.getElementById("sumaDealer").innerText = sumaDealer;
    document.getElementById("tuSuma").innerText = tuSuma;
    document.getElementById("resultados").innerText = message;
}

function reducirAs(sumaJugador, cuentaAsesJugador) {
    while (sumaJugador > 21 && cuentaAsesJugador > 0) {
        sumaJugador -= 10;
        cuentaAsesJugador -= 1;
    }
    return sumaJugador;
}

function checkearAs(cartas) {
    if (cartas[0] == "A") {
        return 1;
    }
    return 0;
}

function obtenerValor(cartas) {
    let data = cartas.split("-"); 
    let value = data[0];

    if (isNaN(value)) { 
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}
