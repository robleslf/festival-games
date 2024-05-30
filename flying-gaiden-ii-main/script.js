///////////////////////////////// Personajes
// El protagonista se guarda en una variable en la que cogemos el div que le habíamos puesto en el html y al que le vamos luego a dar una clase para que le aplique el CSS dependiendo de qué personaje escojas:
const protagonista = document.getElementById("divPajaro");

// Los enemigos exactamente igual, se podría volver más complejo y que crease elementos div en más número y fuese aplicando clases y demás a cada uno, pero en principio he puesto tres divs ya fijos en el html y a cada uno una clase, que les define tanto la imagen del pájaro enemigo como los movimientos que hacen
const enemigo_1 = document.getElementById("enemigo_1");
const enemigo_2 = document.getElementById("enemigo_2");
const enemigo_3 = document.getElementById("enemigo_3");
const enemigo_4 = document.createElement("div");

// Botones para segundo player
// Esto no va a funcionar porque he comentado unas líneas abajo porque no va a darme tiempo a meter dos jugadores, pero la idea es que se creen dos botones más para escoger un segundo personaje de los dos que quedan libres para que entre un sewgundo jugador en modo cooperativo
const boton_segundo_jugador_A = document.createElement("div");
const boton_segundo_jugador_B = document.createElement("div");



// Cartelito de game over para la función seAcaboLoQueSeDaba() y cosas para cuando se muere; son los divs donde se va a ver el GAME OVER cuando te estampas, el récord si lo superas, y la calavera que sale junto al GAME  OVER. 
// Hay también una variable que por defecto está en vivo y que al chocar con un pájaro pasa a "muerto" para que se active el evento de muerte y pasen las cosas para finalizar la partida
const cartelGameOver = document.createElement("div");
const cartelRecord = document.createElement("div");
const calavera = document.createElement("div");
let eventoMuerte = "vivo";

//  Esta función es la que se encarga de cambiar la altura a la que vuelan los enemigos para que no sea siempre la misma. En el parámetro se le tienen que meter los divs de los enemigos; el math.random lo que hace es gfenerar un numero aleatorio entre 0 y 1, así que se multiplica por 701; El número ha sido un poc a prueba y error para ver en qué áreas de la pantalla podían spamear los enemigos
function cambiar_la_Y_de_enemigos(enemigo) {
    const randomTop = Math.floor(Math.random() * 701);
    enemigo.style.top = randomTop + 'px';
}

// OTRAS VARIABLES
// Esta es la que guarda el contador que lleva el contador de puntuación, para que se pare cuando se choque el pájaro y pueda hacer cosas como comparar el almacenado con el record actual
var almacenContador = 0; 
const titulo = document.getElementById("titulo");

// Este interruptor esta en 0 y cambia a 1,2 o 3 dependiendo del personaje que elijas, para que en los movimientos del pájaro se ajuste la velocidad a cada uno en función de su rapidez
let interruptor = 0;


// Esta variable es la que guarda el record aunque hagas f5 o salgas del navegador
var record = localStorage.getItem('record');
if (!record) {
    record = 0;
}


// Puntuación; la puntuación va con esta función y variables, el IF le dice que tiene que sumar a la puntuacion cada 0.50ms, cuando chocas la variable eventoMuerte cambia a muerto y deja entonces de contar, guardándose la puntuación final en el almacenCOntador
// El contador incial lo saque de aquí: https://codepen.io/evilnapsis/pen/wBZBgv
// y modifiqué la velocidad y añadí el if solamente
// Variables del contador; 
var n = 0;
var l = document.getElementById("number");


// Función del contandor
function contadorPuntuacion(){
    window.setInterval(function(){
        if (eventoMuerte == "vivo"){
            l.innerHTML = "Puntuación: " + n;
            n++;
        }
        almacenContador = n - 1;
        
    },0.50);
}

// Botones de Personajes
document.addEventListener("DOMContentLoaded", function () {
  let posX = 10.0; 
  let posY = 200.0; 


 

// Estos son los tres botones que hay para elegir personaje, en función del que elijas se carga una clase css al divPajaro y se asigna un nuevo valor a la variable interruptor. Cambian sobre todo música, velocidad de movimiento y la skin del personaje 



// Pinchar botón 1 (Solo voy a explicar este porquie los otros dos son básicamente la misma idea ambos)
document.getElementById("play_boton").addEventListener("click", function() {

    // se le cambia el interruptor al valor del personaje elegid
    interruptor = 1;

    // se cambia el fondo de pantalla inicial al del nivel; ahoira son el mismop para los 3, la idea es que haya niveles distintos
    document.body.style.backgroundImage = "url(assets/img/ciudad_pajaro.webp)";


    // coge el div del html con el id divPajaro y le pone una clase para aplicarle un CSS diferente; en este caso la del personaje 1
    var divPajaro = document.getElementById("divPajaro");
    divPajaro.classList.add("pajaroVolante"); 
    // divPajaro.style.position = "absolute";
    // updatePosition();


    // Se borran los tres botones de selección de personaje de la pantalla y el título
    var boton_de_play = document.getElementById("play_boton");
    boton_de_play.style.display = "none";

    var boton_de_play = document.getElementById("play_boton_2");
    boton_de_play.style.display = "none";

    var boton_de_play = document.getElementById("play_boton_3");
    boton_de_play.style.display = "none";

    titulo.style.display = "none";



    // Suena el tema musical asignado al personaje
    var musiquita = document.getElementById("musiquitaNES");
    musiquita.play();


    // Se llama a la función que se encarga de contar la puntuación obtenida
    contadorPuntuacion();

    // El intervalo este hace que la función que cambia la posición Y del enemigo se ejecute cada 4 segundos, que es lo que dura la animación de desplazamiento X de los enemigos 
    setInterval(() => {
        cambiar_la_Y_de_enemigos(enemigo_1);
    }, 4000);


    // Se le aplica también un css a los enemigos a partir de una nueva clase a su div correspondiente
    enemigo_1.classList.add("gifs_de_pajaritos");


    // Lo mismo con los otros divs de los otros enemigos
    setInterval(() => {
    cambiar_la_Y_de_enemigos(enemigo_2);
    }, 2000);


    enemigo_2.classList.add("murcielago");


    setInterval(() => {
        cambiar_la_Y_de_enemigos(enemigo_3);
        }, 8000);
    
    

    enemigo_3.classList.add("losrusos");


    // Y esto nada aún porque como explique arriba el modo 2 jugadores va a posponerse a verano, pero si lo descomentas muestra un poco cuál es la idea
    // boton_segundo_jugador_A.classList.add("mini_play_boton_2");

    // document.body.appendChild(boton_segundo_jugador_A);

    // boton_segundo_jugador_A.style.left="85%"

    // boton_segundo_jugador_B.classList.add("mini_play_boton_3");

    // boton_segundo_jugador_B.style.left="90%"

    // document.body.appendChild(boton_segundo_jugador_B);


    // Esto también está pendiente, lo dejo porque visualmente está, pero no hay ninguna interacción con los misiles aún

    setInterval(dispararMisiles, 15000);

              
    });



// PINCHAR Botón 2
document.getElementById("play_boton_2").addEventListener("click", function() {

    interruptor = 3;

    document.body.style.backgroundImage = "url(assets/img/ciudad_pajaro.webp)";

    var divPajaro = document.getElementById("divPajaro");
    divPajaro.classList.add("pajaroVolante_2"); 
    // divPajaro.style.position = "absolute";
    // updatePosition();


    var boton_de_play = document.getElementById("play_boton");
    boton_de_play.style.display = "none";

    var boton_de_play = document.getElementById("play_boton_2");
    boton_de_play.style.display = "none";

    var boton_de_play = document.getElementById("play_boton_3");
    boton_de_play.style.display = "none";

    titulo.style.display = "none";


    var musiquita = document.getElementById("musiquitaNES_2");
    musiquita.play();

    contadorPuntuacion();


    setInterval(() => {
        cambiar_la_Y_de_enemigos(enemigo_1);
    }, 4000);


   enemigo_1.classList.add("gifs_de_pajaritos");

   setInterval(() => {
    cambiar_la_Y_de_enemigos(enemigo_2);
}, 2000);

enemigo_2.classList.add("murcielago");

setInterval(() => {
    cambiar_la_Y_de_enemigos(enemigo_3);
    }, 8000);


enemigo_3.classList.add("losrusos");

setInterval(dispararMisiles, 15000);



});


// pINCHAR BOTÓN 3
document.getElementById("play_boton_3").addEventListener("click", function() {


    interruptor = 3;

    document.body.style.backgroundImage = "url(assets/img/ciudad_pajaro.webp)";

    var divPajaro = document.getElementById("divPajaro");
    divPajaro.classList.add("pajaroVolante_3"); 
    // divPajaro.style.position = "absolute";
    // updatePosition();


    var boton_de_play = document.getElementById("play_boton");
    boton_de_play.style.display = "none";

    var boton_de_play = document.getElementById("play_boton_2");
    boton_de_play.style.display = "none";

    var boton_de_play = document.getElementById("play_boton_3");
    boton_de_play.style.display = "none";

    titulo.style.display = "none";



    var musiquita = document.getElementById("musiquitaNES_2");
    musiquita.play();

    contadorPuntuacion();


    setInterval(() => {
        cambiar_la_Y_de_enemigos(enemigo_1);
    }, 4000);


   enemigo_1.classList.add("gifs_de_pajaritos");

   setInterval(() => {
    cambiar_la_Y_de_enemigos(enemigo_2);
}, 2000);


enemigo_2.classList.add("murcielago");


setInterval(() => {
    cambiar_la_Y_de_enemigos(enemigo_3);
    }, 4000);


enemigo_3.classList.add("losrusos");

setInterval(dispararMisiles, 15000);
   
    
});



});







// colisiones y muerte

// Esta es la función que se invoca al colisionar el personaje con algún enemigo

function SeAcaboLoQueSeDaba(){

    // se activa el eventoMuerte a muerte para parar puntuación más que nada
    eventoMuerte = "muerte";

    // se detiene la música que estuviese sonando:
    var musiquita = document.getElementById("musiquitaNES");
    musiquita.pause();

    var musiquita2 = document.getElementById("musiquitaNES_2");
    musiquita2.pause();


    // y se pone la musiquita de game over para que sea más triste
    var musiquita_game_over = document.getElementById("musiquitaNES_gameover");
    musiquita_game_over.play();


    // se deja de impirmir en el navegador la puntuación del contador
    document.getElementById("number").style.display = "none;"

    // en el div q se había creado al principio del js se introduce ahora un texto de GAME OVER
    cartelGameOver.textContent = "GAME OVER";

    // y se le da una clase para que sea más bonito
    cartelGameOver.classList.add("game_over");
    
    // y luego se le añade al body para que aparezca por pantalla
    document.body.appendChild(cartelGameOver);

    // luego comparamos si la puntuacion que se guardó en el almacenCOntador es mayor que el record, y si lo es, se hace algo igual a lo del GAME OVER pero con el NEW RECORD
    if (almacenContador > record){
        record = almacenContador;
    
        cartelRecord.classList.add("clase_record");
        cartelRecord.textContent = "NEW RECORD";
    
        document.body.appendChild(cartelRecord);
    
        localStorage.setItem('record', record);
    }

    
    
    // Dejamos de mostrar los enemigos por pantalla
    enemigo_1.style.display = "none";
    enemigo_2.style.display = "none";
    enemigo_3.style.display = "none";

    calavera.classList.add("muerte");

    document.body.appendChild(calavera);


}


// Esta es la función que detecta la colisión con los cuervos; se hace a partir de getBounding
function detectarColision() {
    // Estas son las oordenadas del pájaro
    var pajaroRect = divPajaro.getBoundingClientRect();
    var pajaroX = pajaroRect.left;
    var pajaroY = pajaroRect.top;
    var pajaroAncho = pajaroRect.width;
    var pajaroAlto = pajaroRect.height;

    // Estas las del enemigo
    var enemigoRect = enemigo_1.getBoundingClientRect();
    var enemigoX = enemigoRect.left;
    var enemigoY = enemigoRect.top;
    var enemigoAncho = enemigoRect.width;
    var enemigoAlto = enemigoRect.height;

    // Y el if que compara posiciones de ambos
    if (
        pajaroX < enemigoX + enemigoAncho &&
        pajaroX + pajaroAncho > enemigoX &&
        pajaroY < enemigoY + enemigoAlto &&
        pajaroY + pajaroAlto > enemigoY
    ) {
        // Si coinciden posiciones, desaparece el protagonista y comienza la función de arriba

        

        protagonista.style.display = "none"
        document.body.style.backgroundImage = "url(assets/img/game_over.gif)";
        


        
        SeAcaboLoQueSeDaba();
    }


}

// Hay que lanzar la función cada tantos milisegundos para que compruebe constantemente las colisiones
setInterval(detectarColision, 10); 




// Esta la que detecta con los murciélagos; me di cuenta a  última hora que lo más lógico habría sido crear solo una función detectarCOlsion y que esta tuviero un parametro para meter un div de cualquier enemigo, y así llamar la función con los diferentes divs de los enemigos en vez de tener una función para cada enemigo que hace exactamente lo mismo
function detectarColisionMurcielago() {
    // Coordenadas del pájaro
    var pajaroRect = divPajaro.getBoundingClientRect();
    var pajaroX = pajaroRect.left;
    var pajaroY = pajaroRect.top;
    var pajaroAncho = pajaroRect.width;
    var pajaroAlto = pajaroRect.height;

    // Coordenadas del enemigo
    var enemigoRect = enemigo_2.getBoundingClientRect();
    var enemigoX = enemigoRect.left;
    var enemigoY = enemigoRect.top;
    var enemigoAncho = enemigoRect.width;
    var enemigoAlto = enemigoRect.height;

    // Comprobar colisión
    if (
        pajaroX < enemigoX + enemigoAncho &&
        pajaroX + pajaroAncho > enemigoX &&
        pajaroY < enemigoY + enemigoAlto &&
        pajaroY + pajaroAlto > enemigoY
    ) {
        // Colisión detectada

        

        protagonista.style.display = "none"
        document.body.style.backgroundImage = "url(assets/img/game_over.gif)";
        


        
        SeAcaboLoQueSeDaba();
    }


}


// Esto lo que hace es que la funcion de detectar colisiones con los murciélagos se ejecute cada 10 milisgundos 
setInterval(detectarColisionMurcielago, 10); 


function detectarColisionConLosRusos() {
    // Estas son las oordenadas del pájaro
    var pajaroRect = divPajaro.getBoundingClientRect();
    var pajaroX = pajaroRect.left;
    var pajaroY = pajaroRect.top;
    var pajaroAncho = pajaroRect.width;
    var pajaroAlto = pajaroRect.height;

    // Estas las del enemigo
    var enemigoRect = enemigo_3.getBoundingClientRect();
    var enemigoX = enemigoRect.left;
    var enemigoY = enemigoRect.top;
    var enemigoAncho = enemigoRect.width;
    var enemigoAlto = enemigoRect.height;

    // Y el if que compara posiciones de ambos
    if (
        pajaroX < enemigoX + enemigoAncho &&
        pajaroX + pajaroAncho > enemigoX &&
        pajaroY < enemigoY + enemigoAlto &&
        pajaroY + pajaroAlto > enemigoY
    ) {
        // Si coinciden posiciones, desaparece el protagonista y comienza la función de arriba

        

        protagonista.style.display = "none"
        document.body.style.backgroundImage = "url(assets/img/game_over.gif)";
        


        
        SeAcaboLoQueSeDaba();
    }


}

// Hay que lanzar la función cada tantos milisegundos para que compruebe constantemente las colisiones
setInterval(detectarColisionConLosRusos, 10); 







///////////// Movimientos del Pájaro: //////////////////////////////////////
// Cambié los que había; efectivamente, no se me ocurrió a mí:


// Una vez cargado el contenido, se ejecuta lo siguiente en js: 
document.addEventListener('DOMContentLoaded', function () {

    // Lo primero guarda en una variable llamada div el div que tenemos en el html con el id divPajaro, que es el div del pájaro que manejamos:
    const div = document.getElementById('divPajaro');

    // Se define el salto de px que va a pegar el personaje en cada pulsación de tecla
    const step = 5; 

    // Esto se supone que pone las coordenadas del pájaro (de su div más bien) en el centro del navegador, aunque creo que me hace conflicto con el CSS y por eso le estoy indicando la posición incial en la la hoja de estilos, pero no lo puedo quitar porque si no no va todo lo demás 
    let x = window.innerWidth / 2 - div.offsetWidth / 2;
    let y = window.innerHeight / 2 - div.offsetHeight / 2;

    // ESta constante es la que va a "rastrear" el estado de las teclas pulsadas y hará que el pçájaro vaya más fluído
    const keys = {};
    
    // Y esta es la que va a almacenar el id del intervalo de tiempo que controla el movimiento
    let intervalId;


    // Esto es básicmanete la misma función que teníamos para ajustar las coordenadas del div del pájaro basándose en lo que pulses
    function moveDiv() {

        if(interruptor==1){
            if (keys['ArrowUp'] || keys['w']) y -= step;
            if (keys['ArrowDown']|| keys['s']) y += step;
            if (keys['ArrowLeft']|| keys['a']) x -= 2*step;
            if (keys['ArrowRight']|| keys['d']) x += step;}

        else if(interruptor==2){
                if (keys['ArrowUp']) y -= step;
                if (keys['ArrowDown']) y += step;
                if (keys['ArrowLeft']) x -= 6*step;
                if (keys['ArrowRight']) x += step;}

        else if(interruptor==3){
                if (keys['ArrowUp']) y -= 2*step;
                if (keys['ArrowDown']) y += 2*step;
                if (keys['ArrowLeft']) x -= 4*step;
                if (keys['ArrowRight']) x += 2*step;}

        // Con estas dos nos aseguramenos que el pajarito no se salga de la ventana del navegador
        x = Math.max(0, Math.min(window.innerWidth - div.offsetWidth, x));
        y = Math.max(0, Math.min(window.innerHeight - div.offsetHeight, y));

        div.style.left = x + 'px';
        div.style.top = y + 'px';
    }



    // Estas dos funciones son las que hacen que se inicie o detenga el intervalo que llama a la función de arriba; startMoving la llama cada 20 ms, y stopMoving define el intervalo y pone el intervalId que teníamos arriba a NULL
    function startMoving() {
        if (!intervalId) {
            intervalId = setInterval(moveDiv, 20); 
        }
    }

    function stopMoving() {
        clearInterval(intervalId);
        intervalId = null;
    }


    // Y estos eventos son los que actualizan el "keys" que habíamos definido arriba; si hay una tercla presionada, se llama a startMoving, y si hay una tecla suelta, a stopMoving
    window.addEventListener('keydown', (event) => {
        keys[event.key] = true;
        startMoving();
    });

    window.addEventListener('keyup', (event) => {
        keys[event.key] = false;
        if (!keys['ArrowUp'] && !keys['ArrowDown'] && !keys['ArrowLeft'] && !keys['ArrowRight'] && !keys['w'] && !keys['a'] && !keys['s'] && !keys['d']) {
            stopMoving();
        }
    });
    


    moveDiv(); 

});





document.addEventListener("DOMContentLoaded", function () {
    var recordElement = document.getElementById("record");

    var record = localStorage.getItem('record');


    recordElement.textContent = "Record: " + record;
});



// Misiles, en pruebas faltan aún definir las colisiones y perfeccionar otras cosas, pero la idea es que cada 15 segundos se disparen misiles en ráfaga


function dispararMisiles() {
    let misiles = document.createElement("div");
  

    misiles.classList.add("misiles");

    setTimeout(() => {
        cambiar_la_Y_de_enemigos(misiles);
      }, 1000);
  
    document.body.appendChild(misiles);
  
    setTimeout(() => {
      misiles.remove();
    }, 3000);


    
  }
  

  
  





