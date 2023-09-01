class Nodo {
    constructor(etiqueta) {
        this.etiqueta = etiqueta;
        this.conexiones = [];
    }

    conectar(destino) {
        this.conexiones.push(destino);
    }
}

class Grafo {
    constructor() {
        this.nodos = new Map();
    }

    agregarNodo(etiqueta) {
        this.nodos.set(etiqueta, new Nodo(etiqueta));
    }

    conectarNodos(origenEtiqueta, destinoEtiqueta) {
        const origen = this.nodos.get(origenEtiqueta);
        const destino = this.nodos.get(destinoEtiqueta);

        if (origen && destino) {
            origen.conectar(destino);
        } else {
            console.log("Nodo(s) no encontrado(s)");
        }
    }

    encontrarCaminos(origenEtiqueta, destinoEtiqueta) {
        const resultados = [];
        const visitados = new Set();
        const caminoActual = [];

        const origen = this.nodos.get(origenEtiqueta);
        const destino = this.nodos.get(destinoEtiqueta);

        if (!origen || !destino) {
            console.log("Nodo(s) no encontrado(s)");
            return [];
        }

        this._encontrarCaminosRecursivo(origen, destino, visitados, caminoActual, resultados);

        return resultados;
    }

    _encontrarCaminosRecursivo(nodoActual, destino, visitados, caminoActual, resultados) {
        visitados.add(nodoActual);

        caminoActual.push(nodoActual.etiqueta);

        if (nodoActual === destino) {
            resultados.push([...caminoActual]);
        } else {
            for (const conexion of nodoActual.conexiones) {
                if (!visitados.has(conexion)) {
                    this._encontrarCaminosRecursivo(conexion, destino, visitados, caminoActual, resultados);
                }
            }
        }

        visitados.delete(nodoActual);
        caminoActual.pop();
    }
}

const grafo = new Grafo();

// Agregar nodos
grafo.agregarNodo("A");
grafo.agregarNodo("B");
grafo.agregarNodo("C");
grafo.agregarNodo("D");
grafo.agregarNodo("E");
grafo.agregarNodo("F");

// Conectar nodos
grafo.conectarNodos("A", "B");
grafo.conectarNodos("B", "C");
grafo.conectarNodos("B", "D");
grafo.conectarNodos("A", "D");
grafo.conectarNodos("C", "A");
grafo.conectarNodos("D", "E");
grafo.conectarNodos("E", "F");

// Encontrar caminos
const caminos = grafo.encontrarCaminos("A", "F");

console.log("Caminos posibles:");
caminos.forEach(camino => {
    console.log(camino.join(" -> "));
});
