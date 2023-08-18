const d = document,
$btn = d.querySelector(".start"),
camino = []
let n = 0,
total = 0,
blanco = true

const crear_Tablero = n => {
    const $tablero = document.querySelector(".tablero")
    for (let i = 0; i < n; i++) {
        if(n % 2 == 0){
            (blanco)
            ? blanco = false
            : blanco = true
        }
        const $fila = document.createElement("div")
        $fila.classList.add("fila")
        for (let j = 0; j < n; j++){
            const $cuadro = document.createElement("div"),
            $texto = document.createElement("p")
            //$texto.textContent = i + ", " + j
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
            $cuadro.setAttribute("data-pos", `${i}${j}`)
            $cuadro.appendChild($texto)
            $fila.appendChild($cuadro)
        }
        $tablero.appendChild($fila)
    }
}

const contieneArreglo = (arr, arreglo_Principal) => {
    return arreglo_Principal.some(subArr => JSON.stringify(subArr) === JSON.stringify(arr)); // Línea hecha con ChatGPT
}

const rellenar_Tablero = caminoFinal => {
    caminoFinal.forEach((pos, i) => {
        const atributo = `${pos[0]}${pos[1]}`,
        $cuadro = document.querySelector(`[data-pos="${atributo}"]`),
        $texto = document.querySelector(`[data-pos="${atributo}"] p`)
        $texto.textContent = i + 1
    });
}

const posibles_Opciones = posicion => {
    //console.log(posicion);
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

    opciones.forEach((opcion, i) => {
        const fila = opcion[0],
        columna = opcion[1]
        if(fila >= 0 && fila < n && columna >= 0 && columna < n && contieneArreglo(opcion, camino) == false){
            opciones_Validas.push(opcion)
        }
    });

    return opciones_Validas
}

const probar_Opciones = posicion_Actual => {
    let opciones_A_Probar = posibles_Opciones(posicion_Actual),
    mejor_Camino = opciones_A_Probar[0],
    mejor_Cantidad = 0
    opciones_A_Probar.forEach(opcion => {
        let mayor_Opcion = posibles_Opciones(opcion)[0]
        posibles_Opciones(opcion).forEach(opcion_De_Opcion => {
            if(posibles_Opciones(mayor_Opcion).length < posibles_Opciones(opcion_De_Opcion).length) mayor_Opcion = opcion_De_Opcion
        });
        if(mayor_Opcion != undefined){
            if(mejor_Cantidad < posibles_Opciones(mayor_Opcion).length){
                mejor_Cantidad = posibles_Opciones(mayor_Opcion).length
                mejor_Camino = opcion
            }
        }
        else console.log("Me quedé sin movimientos en ésta casilla :<");
    });
    return mejor_Camino
}

$btn.addEventListener("click", e => {
    n = d.querySelector(".n").value
    total = (n*n) - 1
    let posicion = [0,0]
    crear_Tablero(n)
    camino.push(posicion)
    for (let i = 0; i < total; i++) {
        let siguiente_Paso = probar_Opciones(posicion)
        camino.push(siguiente_Paso)
        posicion = siguiente_Paso
        rellenar_Tablero(camino)
    }
})