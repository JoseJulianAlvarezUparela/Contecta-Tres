// Variables globales
var tablero; // Representa el estado actual del tablero en forma de matriz
var jugadorO = "O"; // Símbolo que representa al jugador O
var jugadorX = "X"; // Símbolo que representa al jugador X
var jugadorActual = jugadorO; // Jugador que tiene el turno al inicio del juego
var juegoTerminado = false; // Indica si el juego ha terminado (true o false)

// Función que se ejecuta automáticamente al cargar la ventana
window.onload = function() {
    iniciarJuego(); // Configura y muestra el tablero inicial
}

// Función que inicializa el juego
function iniciarJuego() {
    // Crea un tablero vacío (matriz 3x3 llena de espacios)
    tablero = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    // Crea las celdas del tablero y las agrega al HTML
    for (let fila = 0; fila < 3; fila++) { // Itera sobre cada fila
        for (let columna = 0; columna < 3; columna++) { // Itera sobre cada columna
            let celda = document.createElement("div"); // Crea un nuevo elemento HTML tipo <div>
            celda.id = fila.toString() + "-" + columna.toString(); // Asigna un ID único basado en su posición
            celda.classList.add("celda"); // Añade la clase CSS "celda" para estilizar

            // Añade líneas de división horizontal
            if (fila == 0 || fila == 1) {
                celda.classList.add("linea-horizontal");
            }

            // Añade líneas de división vertical
            if (columna == 0 || columna == 1) {
                celda.classList.add("linea-vertical");
            }

            celda.innerText = ""; // Inicialmente, la celda está vacía
            celda.addEventListener("click", marcarCelda); // Añade un evento de clic para marcar la celda
            document.getElementById("tablero").appendChild(celda); // Agrega la celda al contenedor "tablero" en el HTML
        }
    }
}

// Función que se ejecuta al hacer clic en una celda
function marcarCelda() {
    if (juegoTerminado) {
        return; // Si el juego ya terminó, no permite realizar más movimientos
    }

    // Obtiene las coordenadas de la celda clickeada
    let coordenadas = this.id.split("-"); // Divide el ID (ejemplo: "1-2" -> ["1", "2"])
    let fila = parseInt(coordenadas[0]); // Convierte la primera parte en entero (fila)
    let columna = parseInt(coordenadas[1]); // Convierte la segunda parte en entero (columna)

    // Verifica si la celda ya está ocupada
    if (tablero[fila][columna] != ' ') {
        return; // Si ya tiene un símbolo, no permite sobrescribirlo
    }

    // Marca el tablero lógico y el visual con el símbolo del jugador actual
    tablero[fila][columna] = jugadorActual; // Actualiza la matriz lógica
    this.innerText = jugadorActual; // Muestra el símbolo en la celda del HTML

    // Cambia el turno al otro jugador
    jugadorActual = (jugadorActual == jugadorO) ? jugadorX : jugadorO;

    // Comprueba si hay un ganador o empate
    verificarGanador();
}

// Función para verificar si hay un ganador
function verificarGanador() {
    // Comprueba las filas para encontrar un ganador
    for (let fila = 0; fila < 3; fila++) {
        if (tablero[fila][0] == tablero[fila][1] && tablero[fila][1] == tablero[fila][2] && tablero[fila][0] != ' ') {
            // Si todos los elementos de la fila son iguales y no están vacíos
            for (let i = 0; i < 3; i++) {
                let celda = document.getElementById(fila.toString() + "-" + i.toString());
                celda.classList.add("ganador"); // Aplica el estilo de ganador
            }
            juegoTerminado = true; // Marca el juego como terminado
            return;
        }
    }

    // Comprueba las columnas para encontrar un ganador
    for (let columna = 0; columna < 3; columna++) {
        if (tablero[0][columna] == tablero[1][columna] && tablero[1][columna] == tablero[2][columna] && tablero[0][columna] != ' ') {
            // Si todos los elementos de la columna son iguales y no están vacíos
            for (let i = 0; i < 3; i++) {
                let celda = document.getElementById(i.toString() + "-" + columna.toString());
                celda.classList.add("ganador"); // Aplica el estilo de ganador
            }
            juegoTerminado = true;
            return;
        }
    }

    // Comprueba la diagonal principal (de arriba izquierda a abajo derecha)
    if (tablero[0][0] == tablero[1][1] && tablero[1][1] == tablero[2][2] && tablero[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let celda = document.getElementById(i.toString() + "-" + i.toString());
            celda.classList.add("ganador"); // Aplica el estilo de ganador
        }
        juegoTerminado = true;
        return;
    }

    // Comprueba la diagonal inversa (de arriba derecha a abajo izquierda)
    if (tablero[0][2] == tablero[1][1] && tablero[1][1] == tablero[2][0] && tablero[0][2] != ' ') {
        let celda = document.getElementById("0-2");
        celda.classList.add("ganador");

        celda = document.getElementById("1-1");
        celda.classList.add("ganador");

        celda = document.getElementById("2-0");
        celda.classList.add("ganador");

        juegoTerminado = true;
        return;
    }
}
