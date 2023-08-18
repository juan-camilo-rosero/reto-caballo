paso = 0
n = 5
total = n * n - 1
pasos_Eliminados = [[]]
posicion = [0, 0]
camino = []
tablero = []

def contieneArreglo(arr, arregloPrincipal):
    return any(subArr == arr for subArr in arregloPrincipal)

def crear_Tablero(n):
    for i in range(n):
        tablero.append([])
        for j in range(n):
            tablero[i].append([i, j])

def posibles_Opciones(posicion):
    fila, columna = posicion
    opciones = [
        [fila + 1, columna + 2],
        [fila + 1, columna - 2],
        [fila - 1, columna + 2],
        [fila - 1, columna - 2],
        [fila + 2, columna + 1],
        [fila + 2, columna - 1],
        [fila - 2, columna + 1],
        [fila - 2, columna - 1]
    ]
    return opciones

def probar_Opciones(opciones):
    opciones_Validas = []
    for opcion in opciones:
        fila, columna = opcion
        if 0 <= fila < n and 0 <= columna < n and opcion not in camino and opcion not in pasos_Eliminados[paso]:
            opciones_Validas.append(opcion)
    return opciones_Validas

def camino_Caballo():
    global paso, posicion
    if paso != total - 1:
        pasos_Disponibles = probar_Opciones(posibles_Opciones(posicion))
        if len(pasos_Disponibles) == 0:
            pasos_Eliminados.pop()
            pasos_Eliminados[-1].append(camino[-1])
            camino.pop()
            posicion = camino[-1]
            paso -= 1
        else:
            posicion = pasos_Disponibles[0]
            camino.append(posicion)
            pasos_Eliminados.append([])
            paso += 1
        camino_Caballo()
    else:
        print(camino)

crear_Tablero(4)
camino_Caballo()
