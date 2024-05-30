document.addEventListener('DOMContentLoaded', function() {
  const nuevaPartidaBoton = document.getElementById('nuevaPartida');
  const tablero = document.getElementById('tablero');
  const boton = document.getElementById('botonTirada');
  const resultado = document.getElementById('resultadoTirada');
  const turnoUno = document.getElementById("turnoUno")
  const turnoDos = document.getElementById("turnoDos")


  let partidaIniciada = false;
  let turnoJugador1 = false;
//Código para generar el tablero

  for (let i = 0; i < 81; i++) {
    let casilla = document.createElement('div');
    casilla.classList.add('casilla');
    // Alternar colores de las casillas
    if (Math.floor(i / 9) % 2 === 0) {
      casilla.style.backgroundColor = i % 2 === 0 ? '#094293' : '#f6f6f6';
    } else {
      casilla.style.backgroundColor = i % 2 !== 0 ? '#f6f6f6' : '#094293';
    }

    //Mostrar numeros en columnas columna
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

    // Función para reiniciar el juego
    function reiniciarJuego() {
      partidaIniciada = false;
      turnoJugador1 = false;
      botonTirada.disabled = true;
      resultado.textContent = '';
      // Aquí puedes agregar más lógica para reiniciar el juego, como limpiar el tablero
  }

    // Iniciar una nueva partida
    nuevaPartidaBoton.addEventListener('click', function() {
      reiniciarJuego();
      partidaIniciada = true;
      turnoJugador1 = true;
      botonTirada.disabled = false;
      turnoUno.textContent = 'Turno del Jugador 1';
      // Configuración inicial del juego aquí
  });


    //Botón de tirada
  boton.addEventListener('click', function() {
    const numeroAleatorio = Math.floor(Math.random() * 20) + 1;
    resultado.textContent = ` Número generado: ${numeroAleatorio}`;
});

  // Manejar la tirada
  botonTirada.addEventListener('click', function() {
    if (partidaIniciada) {
        const numeroAleatorio = Math.floor(Math.random() * 20) + 1;
        resultado.textContent = ` Número generado: ${numeroAleatorio}`;

        if (turnoJugador1) {
            if (numeroAleatorio < 10) {
                // Lógica de tirada para el Jugador 1 en la columna 0
                const casillaColumna0 = document.querySelector('.casilla.columna-0');
                casillaColumna0.style.backgroundColor = 'red';
            } else if (numeroAleatorio < 15) {
                // Lógica de tirada para el Jugador 1 en las columnas 0 o 1
                // ...
            } else {
                // Lógica de tirada para el Jugador 1 en las columnas 0, 1 o 2
                // ...
            }

            // Cambiar el turno al Jugador 2
            turnoJugador1 = false;
            turnoUno.textContent= '';
            turnoDos.textContent = 'Turno del Jugador 2';
        } else {
            // Lógica de tirada para el Jugador 2
            // ...

            // Cambiar el turno al Jugador 1
            turnoJugador1 = true;
            turnoUno.textContent = 'Turno del Jugador 1';
            turnoDos.textContent = ''
        }
    }
});

});

