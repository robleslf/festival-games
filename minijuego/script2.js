document.addEventListener('DOMContentLoaded', function() {
    const nuevaPartidaBoton = document.getElementById('nuevaPartida');
    const botonTiradaJugador1 = document.getElementById('botonTiradaJugador1');
    const botonTiradaJugador2 = document.getElementById('botonTiradaJugador2');
    const resultado = document.getElementById('resultadoTirada');
    const tablero = document.getElementById('tablero');
    let numeroAleatorioJugador1 = 0;
    let numeroAleatorioJugador2 = 0;

    let partidaIniciada = false;
    let turnoJugador1 = true;

    function reiniciarJuego() {
        partidaIniciada = false;
        turnoJugador1 = true;
        botonTiradaJugador1.disabled = false;
        botonTiradaJugador2.disabled = true;
        resultado.textContent = '';
        tablero.innerHTML = '';
        crearTablero();
    }

    function crearTablero() {
        for (let i = 0; i < 81; i++) {
            let casilla = document.createElement('div');
            casilla.classList.add('casilla');
            if (Math.floor(i / 9) % 2 === 0) {
                casilla.style.backgroundColor = i % 2 === 0 ? '#094293' : '#f6f6f6';
              } else {
                casilla.style.backgroundColor = i % 2 !== 0 ? '#f6f6f6' : '#094293';
              }
            casilla.dataset.columna = i % 9;
            casilla.addEventListener('click', seleccionarCasilla);
            if (i % 9 === 0) {
                casilla.textContent = '5';
                casilla.style.color = 'gold'; // Cambiar el color a dorado
                casilla.style.fontSize = '60px'; // Aumentar el tamaño del número
                casilla.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 1)'; // Agregar sombreado
              }
          
              if ([1, 2, 6, 7, 8].includes(i % 9)) {
                casilla.style.color = 'gold'; // Cambiar el color a dorado
                casilla.style.fontSize = '60px'; // Aumentar el tamaño del número
                casilla.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 1)'; // Agregar sombreado
                switch (i % 9) {
                  case 1:
                    casilla.textContent = '10';
                    break;
                  case 2:
                    casilla.textContent = '15';
                    break;
                  case 6:
                    casilla.textContent = '15';
                    break;
                  case 7:
                    casilla.textContent = '10';
                    break;
                  case 8:
                    casilla.textContent = '5';
                    break;
                }
              }
            tablero.appendChild(casilla);
        }

    }

    function seleccionarCasilla() {
        if (partidaIniciada) {
            const columna = this.dataset.columna;
            if (turnoJugador1 && esColumnaValidaJugador1(columna)) {
                this.style.backgroundColor = 'red';
                botonTiradaJugador1.disabled = true;
                botonTiradaJugador2.disabled = false;
                resultado.textContent = 'Turno del Jugador 2';
                turnoJugador1 = false;
            } else if (!turnoJugador1 && esColumnaValidaJugador2(columna)) {
                this.style.backgroundColor = 'green';
                botonTiradaJugador2.disabled = true;
                botonTiradaJugador1.disabled = false;
                resultado.textContent = 'Turno del Jugador 1';
                turnoJugador1 = true;
            }
        }
    }

    function esColumnaValidaJugador1(columna) {
        return (numeroAleatorioJugador1 <= 10 && columna === '0') ||
               (numeroAleatorioJugador1 > 10 && numeroAleatorioJugador1 < 15 && columna === '1') ||
               (numeroAleatorioJugador1 >= 15 && columna <= '2');
    }

    function esColumnaValidaJugador2(columna) {
        return (numeroAleatorioJugador2 <= 10 && columna === '8') ||
               (numeroAleatorioJugador2 > 10 && numeroAleatorioJugador2 < 15 && columna === '7') ||
               (numeroAleatorioJugador2 >= 15 && columna === '6');
    }

    nuevaPartidaBoton.addEventListener('click', function() {
        reiniciarJuego();
        partidaIniciada = true;
        resultado.textContent = 'Turno del Jugador 1';
    });

    botonTiradaJugador1.addEventListener('click', function() {
        if (partidaIniciada && turnoJugador1) {
            numeroAleatorioJugador1 = Math.floor(Math.random() * 20) + 1;
            resultado.textContent = `Jugador 1, tu número es: ${numeroAleatorioJugador1}. Selecciona una casilla.`;
        }
    });

    botonTiradaJugador2.addEventListener('click', function() {
        if (partidaIniciada && !turnoJugador1) {
            numeroAleatorioJugador2 = Math.floor(Math.random() * 20) + 1;
            resultado.textContent = `Jugador 2, tu número es: ${numeroAleatorioJugador2}. Selecciona una casilla.`;
        }
    });

    crearTablero();
});