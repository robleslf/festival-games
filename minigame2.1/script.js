document.addEventListener('DOMContentLoaded', function(){
    var juego = document.getElementById('juego');
    var nuevaPartidaBtn = document.getElementById('nuevaPartida');
    var circulo;
    var puntuacion = 0;
    var rombos = [];
    var pentagonos = [];
    var rectangulos = [];
    var nivel=1;
    //Esto es nuevo
    var modalNombre = document.getElementById('modalNombre');
    var empezarJuegoBtn = document.getElementById('empezarJuego');
    var nombreJugadorInput = document.getElementById('nombreJugador');
    var tablaClasificacion = document.getElementById('tablaClasificacion');
    var nombreJugador = '';
    var juegoActivo = false;

    function crearRombos(){
        var numeroRombos = Math.floor(Math.random()*(10-5+1))+5;
        rombos =[];

        for(var i = 0; i < numeroRombos; i++) {
            var rombo = document.createElement('div');
            rombo.classList.add('rombo');
            rombo.style.left = Math.random()*(juego.offsetWidth - 20)+'px';
            rombo.style.top = Math.random()*(juego.offsetHeight - 20)+'px';
            juego.appendChild(rombo);
            rombos.push(rombo);
        }
    }

    function crearPentagonos(){
        var numeroPentagonos = nivel;
        pentagonos=[];
        
        for(var i = 0; i<numeroPentagonos; i++){
            var pentagono = document.createElement('div');
            pentagono.classList.add('pentagono');
            pentagono.style.left = Math.random()*(juego.offsetWidth - 20) + 'px';
            pentagono.style.top = Math.random()*(juego.offsetHeight - 20) + 'px';
            juego.appendChild(pentagono);
            pentagonos.push(pentagono);
        }
    }

    function crearRectangulos(){
        var numeroRectangulos = nivel;
        rectangulos= [];

        for (var i = 0; i<numeroRectangulos; i++){
            var rectangulo = document.createElement('div');
            rectangulo.classList.add('rectangulo');
            rectangulo.style.left = Math.random()*(juego.offsetWidth - 60)+'px';
            rectangulo.style.top = Math.random()*(juego.offsetHeight - 20)+'px';
            juego.appendChild(rectangulo);
            rectangulos.push(rectangulo);
        }
    }


    //IMPORTANTE DISEÑO ANTIGUO
    // nuevaPartidaBtn.addEventListener('click', function() {
    //     var modalNombre = document.getElementById('modalNombre');
    //     var empezarJuegoBtn = document.getElementById('empezarJuego');
    //     var nombreJugadorInput = document.getElementById('nombreJugador');

    //     modalNombre.style.display = 'block'; // Mostrar modal para ingresar nombre

    //     empezarJuegoBtn.addEventListener('click', function() {
    //         nombreJugador = nombreJugadorInput.value; // Guardar el nombre del jugador
    //         modalNombre.style.display = 'none'; // Ocultar modal
    //         iniciarNuevaPartida();
    //     });
    // });


    //NUEVA IMPLEMENTACIÓN
    nuevaPartidaBtn.addEventListener('click', function() {
        modalNombre.style.display = 'block'; // Mostrar modal para ingresar nombre
    });

    empezarJuegoBtn.addEventListener('click', function() {
        nombreJugador = nombreJugadorInput.value.trim();
        if (nombreJugador === '') {
            alert('Por favor, introduce un nombre para empezar a jugar.');
            return;
        }
        modalNombre.style.display = 'none'; // Ocultar modal
        iniciarNuevaPartida();

        nuevaPartidaBtn.classList.remove("iniciador");
        nuevaPartidaBtn.classList.add("iniciador_2");
        nuevaPartidaBtn.textContent=("Nueva Partida");
    });

    function iniciarNuevaPartida() {
        juego.innerHTML = '<div id="puntuacion">Puntuación: 0</div>';
        juego.style.display = 'block';
        puntuacion = 0;
        nivel = 1;
        rombos = [];
        pentagonos = [];
        rectangulos = [];
        juegoActivo = true;

        circulo = document.createElement('div');
        circulo.classList.add('circulo');
        circulo.style.left = '225px';
        circulo.style.top = '225px';
        juego.appendChild(circulo);

        crearRombos();
        crearPentagonos();
        crearRectangulos();

        window.addEventListener('keydown', moverCirculo);
  
    }

    
    function ordenarClasificacion() {
        var filas = Array.from(tablaClasificacion.getElementsByTagName('tr'));
        // Eliminar la fila de cabecera para no ordenarla
        var cabecera = filas.shift();
    
        // Ordenar las filas basándose en la puntuación que está en la segunda celda
        filas.sort(function(a, b) {
            var puntuacionA = parseInt(a.cells[1].textContent);
            var puntuacionB = parseInt(b.cells[1].textContent);
            return puntuacionB - puntuacionA; // Orden descendente
        });
    
        // Volver a añadir la cabecera al principio de la tabla
        tablaClasificacion.innerHTML = '';
        tablaClasificacion.appendChild(cabecera);
    
        // Añadir las filas ya ordenadas a la tabla
        filas.forEach(function(fila) {
            tablaClasificacion.appendChild(fila);
        });
    }



    function moverCirculo(event) {

        if(!juegoActivo) return;

        var tecla = event.key;
        var posicionActual = circulo.getBoundingClientRect();
        var juegoRect = juego.getBoundingClientRect();
        

        if (tecla === 'ArrowUp' && posicionActual.top > juegoRect.top+10){
            circulo.style.top = (posicionActual.top - juegoRect.top -20) + 'px';
        }
        else if (tecla === 'ArrowDown' && posicionActual.bottom < juegoRect.bottom-10){
            circulo.style.top = (posicionActual.top - juegoRect.top +10) + 'px';
        }
        else if (tecla === 'ArrowLeft' && posicionActual.left > juegoRect.left+10){
            circulo.style.left = (posicionActual.left - juegoRect.left -20) + 'px';
        }
        else if (tecla === 'ArrowRight' && posicionActual.right < juegoRect.right-10){
            circulo.style.left = (posicionActual.left - juegoRect.left +10) + 'px';
        }
        else {
            juegoActivo = false;
            //alert("Has perdido!! Tu puntuacion máxima es "+puntuacion);
            var fila = tablaClasificacion.insertRow();
            var celdaNombre = fila.insertCell(0);
            var celdaPuntuacion = fila.insertCell(1);
            celdaNombre.textContent = nombreJugador;
            celdaPuntuacion.textContent = puntuacion;
            tablaClasificacion.style.display = 'table';
            ordenarClasificacion();
        }

        // rombos.forEach(function(rombo,index){
        //     if (circulo.getBoundingClientRect().intersects(rombo.getBoundingClientRect())){
        //         juego.removeChild(rombo);
        //         rombos.splice(index,1);
        //         puntuacion=puntuacion+10;
        //         document.getElementById("puntuacion").textContent=("Puntuacion: "+puntuacion);
        //         if (rombos.length===0){
        //             crearRombos();
        //             nivel++;
        //             crearPentagonos();
        //             crearRectangulos();
        //         }
        //     }
        // });

        rombos.forEach(function(rombo,index){
            var circuloRect = circulo.getBoundingClientRect();
            var romboRect = rombo.getBoundingClientRect();
            var distanciaX = (circuloRect.left + circuloRect.width / 2) - (romboRect.left + romboRect.width / 2);
            var distanciaY = (circuloRect.top + circuloRect.height / 2) - (romboRect.top + romboRect.height / 2);
            var distanciaCentros = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
            var sumaRadios = circuloRect.width / 2 + romboRect.width / 2;

            if (distanciaCentros < sumaRadios){
                juego.removeChild(rombo);
                rombos.splice(index,1);
                puntuacion+= 10;
                document.getElementById("puntuacion").textContent = "Puntuacion: " + puntuacion;
                if (rombos.length === 0){
                    crearRombos();
                    nivel++;
                    crearPentagonos();
                    crearRectangulos();
                }
            }
            
        })
        
        pentagonos.forEach(function(pentagono){
            if (circulo.getBoundingClientRect().intersects(pentagono.getBoundingClientRect())){
                //alert("Has perdido!! Tu puntuacion máxima es "+puntuacion);
                var fila = tablaClasificacion.insertRow();
                var celdaNombre = fila.insertCell(0);
                var celdaPuntuacion = fila.insertCell(1);
                celdaNombre.textContent = nombreJugador;
                celdaPuntuacion.textContent = puntuacion;
                tablaClasificacion.style.display = 'table';
                juegoActivo = false;
                ordenarClasificacion();
             
            }
        });
        
        rectangulos.forEach(function(rectangulo){
            if (circulo.getBoundingClientRect().intersects(rectangulo.getBoundingClientRect())){
                //alert("Has perdido!! Tu puntuacion máxima es "+puntuacion);
                var fila = tablaClasificacion.insertRow();
                var celdaNombre = fila.insertCell(0);
                var celdaPuntuacion = fila.insertCell(1);
                celdaNombre.textContent = nombreJugador;
                celdaPuntuacion.textContent = puntuacion;
                tablaClasificacion.style.display = 'table';
                juegoActivo = false;
                ordenarClasificacion();
            
            }
        })
    }

    function finalizarJuego() {
        juegoActivo = false;
        window.removeEventListener('keydown', moverCirculo);
        // Agregar la puntuación a la tabla de clasificación...

        ordenarClasificacion();
    }

    });

    DOMRect.prototype.intersects = function(rect){
        return !(rect.left > this.right || rect.right < this.left || rect.top > this.bottom || rect.bottom < this.top);
    };


    