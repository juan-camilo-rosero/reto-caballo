/*Código que calcula el recorrido que debe seguir un caballo en un tablero de ajedrez nxn para pasar por cada casilla sin repetir ninguna*/

// Hecho por Juan Camilo Rosero

const d = document,
$btn = d.querySelector(".start"),
camino = []
let n = 0,
total = 0,
blanco = true

const crear_Tablero = n => {

    /*Función que crea un tablero en la pantalla con n filas y n columnas*/

    const $tablero = document.querySelector(".tablero")

    for (let i = 0; i < n; i++) {

        if(n % 2 == 0){ // Poner color blanco o gris a las casillas de forma intercalada
            (blanco)
            ? blanco = false
            : blanco = true
        }
        
        const $fila = document.createElement("div")
        $fila.classList.add("fila")

        for (let j = 0; j < n; j++){
            const $cuadro = document.createElement("div"),
            $texto = document.createElement("p")
            $texto.textContent = "X"
            $cuadro.classList.add("cuadro")
            if(blanco){
                $cuadro.classList.add("blanco")
                blanco = false
            }
            else{
                $cuadro.classList.add("gris")
                blanco = true
            }
            $cuadro.setAttribute("data-pos", `${i}${j}`) // Poner atributo data-pos al elemento cuadro con la fila y columna para que, al momento de mostrar la solución, el programa sepa en qué casilla poner el número de salto
            $cuadro.appendChild($texto)
            $fila.appendChild($cuadro)
        }
        $tablero.appendChild($fila)
    }
}

const contieneArreglo = (arr, arreglo_Principal) => { // Función para saber si un arreglo arreglo_Principal contiene un arreglo arr
    return arreglo_Principal.some(subArr => JSON.stringify(subArr) === JSON.stringify(arr)); // Línea hecha con ChatGPT
}

const rellenar_Tablero = caminoFinal => { // Función para mostrar la solución en pantalla
    caminoFinal.forEach((pos, i) => {
        const atributo = `${pos[0]}${pos[1]}`, // Atributo según el cual se va a buscar el cuadro que corresponde a la fila/columna
        $cuadro = document.querySelector(`[data-pos="${atributo}"]`),
        $texto = document.querySelector(`[data-pos="${atributo}"] p`)
        $texto.textContent = i + 1
    });
}

const posibles_Opciones = posicion => {
    // Función que muestra todos los posibles movimientos válidos a partir de una posición

    const opciones = [],
    fila = posicion[0],
    columna = posicion[1],
    opciones_Validas = []

    opciones.push([fila + 1, columna + 2])
    opciones.push([fila + 1, columna - 2])
    opciones.push([fila - 1, columna + 2])
    opciones.push([fila - 1, columna - 2])
    opciones.push([fila + 2, columna + 1])
    opciones.push([fila + 2, columna - 1])
    opciones.push([fila - 2, columna + 1])
    opciones.push([fila - 2, columna - 1])

    opciones.forEach((opcion, i) => { // Comprobar cada opción para ver si es válida (está dentro del tablero y no es repetida)
        const fila = opcion[0],
        columna = opcion[1]
        if(fila >= 0 && fila < n && columna >= 0 && columna < n && contieneArreglo(opcion, camino) == false){
            opciones_Validas.push(opcion)
        }
    });

    return opciones_Validas
}

const probar_Opciones = posicion_Actual => {
    // Función que devuelve la mejor posición a la que se puede mover el caballo evaluando el segundo mejor movimiento
    let opciones_A_Probar = posibles_Opciones(posicion_Actual),
    mejor_Camino = opciones_A_Probar[0]
    opciones_A_Probar.forEach(opcion => {
        console.log(opcion);
        console.log(posibles_Opciones(opcion).length);
        if(posibles_Opciones(opcion).length < posibles_Opciones(mejor_Camino).length) mejor_Camino = opcion
    });
    return mejor_Camino
}

const iniciar_Programa = posision_Inicial => {
    n = d.querySelector(".n").value // n toma el valor del input que pide cantidad de filas y columnas
    total = (n*n) - 1 // Total de pasos para solucionar el problema
    let posicion = [parseInt(posision_Inicial[0]),parseInt(posision_Inicial[1])]
    camino.push(posicion)
    for (let i = 0; i < total; i++) {
        let siguiente_Paso = probar_Opciones(posicion)
        camino.push(siguiente_Paso)
        posicion = siguiente_Paso
    }
    rellenar_Tablero(camino)
}

$btn.addEventListener("click", e => { 
    n = d.querySelector(".n").value // n toma el valor del input que pide cantidad de filas y columnas
    crear_Tablero(n)
    d.querySelector(".uwu").textContent = "Selecciona la casilla donde va a iniciar el caballo"
    d.querySelectorAll(".cuadro").forEach($cuadro => {
        $cuadro.addEventListener("click", e => {
            iniciar_Programa($cuadro.getAttribute("data-pos"))
        })
    });
})
