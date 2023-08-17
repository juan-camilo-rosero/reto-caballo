/*Código que calcula el recorrido que debe seguir un caballo en un tablero de ajedrez nxn para pasar por cada casilla sin repetir ninguna*/

// Hecho por Juan Camilo Rosero

let paso = 0,
n = 6,
total = (n*n)-1,
pasos_Eliminados = [[]],
posicion = [0,0],
camino = [posicion],
tablero = [],
contador = 0,
intervalo = 500,
casillas_Vacias = 0,
blanco = true

const contieneArreglo = (arr, arregloPrincipal) => {
    return arregloPrincipal.some(subArr => JSON.stringify(subArr) === JSON.stringify(arr)); // Línea hecha con ChatGPT
}

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
        tablero.push([])
        for (let j = 0; j < n; j++){
            tablero[i].push([i,j])
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
            $cuadro.setAttribute("data-pos", i + "-" + j)
            $cuadro.appendChild($texto)
            $fila.appendChild($cuadro)
        }
        $tablero.appendChild($fila)
    }
}

const rellenar_Tablero = caminoFinal => {
    caminoFinal.forEach((pos, i) => {
        const atributo = pos[0] + "-" + pos[1],
        $cuadro = document.querySelector(`[data-pos="${atributo}"]`),
        $texto = document.querySelector(`[data-pos="${atributo}"] p`)
        $texto.textContent = i + 1
    });
}

const posibles_Opciones = posicion => {
    const opciones = [],
    fila = posicion[0],
    columna = posicion[1]

    opciones.push([fila + 1, columna + 2])
    opciones.push([fila + 1, columna - 2])
    opciones.push([fila - 1, columna + 2])
    opciones.push([fila - 1, columna - 2])
    opciones.push([fila + 2, columna + 1])
    opciones.push([fila + 2, columna - 1])
    opciones.push([fila - 2, columna + 1])
    opciones.push([fila - 2, columna - 1])

    return opciones
}

const probar_Opciones = opciones => {
    const opciones_Validas = []
    /*console.log("*-*-");
    console.log(camino);
    console.log(paso);
    console.log(pasos_Eliminados[paso]);*/
    opciones.forEach((opcion, i) => {
        const fila = opcion[0],
        columna = opcion[1]
        if(fila >= 0 && fila < n && columna >= 0 && columna < n && contieneArreglo(opcion, camino) == false && contieneArreglo(opcion, pasos_Eliminados[paso]) == false){
            /*console.log("-----");
            console.log(opcion);
            console.log(camino);
            console.log("-----");*/
            //console.log(opcion + " es valida");
            opciones_Validas.push(opcion)
        }
    });

    return opciones_Validas
}

let camino_Caballo = () => {
    //console.log(pasos_Eliminados);
    if (paso != total - casillas_Vacias || contador == 20) {
        const pasos_Disponibles = probar_Opciones(posibles_Opciones(posicion))
        if (pasos_Disponibles.length == 0){
            pasos_Eliminados.pop()
            pasos_Eliminados[pasos_Eliminados.length - 1].push(camino[camino.length - 1])
            camino.pop()
            posicion = camino[camino.length - 1]
            paso -= 1
        }
        else{
            //console.log("ejecutando else");
            posicion = pasos_Disponibles[0]
            camino.push(posicion)
            pasos_Eliminados.push([])
            paso++
        }
        contador++
        camino_Caballo()
    }
}

function descansar() {
    let interval = setInterval(() => {
        if (paso != total - casillas_Vacias){
            console.log("Descansemos un poquito :3")
            contador = 0
            camino_Caballo()
        }
        else {
            clearInterval(interval)
            console.log("TERMINE :D");
            rellenar_Tablero(camino)
            console.log(camino);
        }
    }, intervalo);
    
}

const $n = document.querySelector(".n"),
$casillas_Vacias = document.querySelector(".casillas-vacias"),
$pos_X = document.querySelector(".pos-x"),
$pos_Y = document.querySelector(".pos-y"),
$btn = document.querySelector(".start")

$btn.addEventListener("click", e => {
    n = parseInt($n.value)
    casillas_Vacias = parseInt($casillas_Vacias.value)
    posicion = [parseInt($pos_Y.value), parseInt($pos_X.value)]
    crear_Tablero(n)
    descansar()
})
