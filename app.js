// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigos = []; // Array para almacenar los nombres de los amigos
let tamañoEquipo = null; // Tamaño del equipo seleccionado

function agregarAmigo() { // Esta función se ejecuta al hacer clic en el botón "Agregar Amigo"
    const input = document.getElementById("amigo");// Obtenemos el elemento de entrada del DOM
    const nombre = input.value.trim();
    if (nombre) {// Verificamos que el nombre no esté vacío
        amigos.push (nombre);
        mostrarLista();
        input.value = ''; // Limpiamos el campo de entrada
    }
}
// Permite agregar amigo presionando Enter en el input
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById("amigo");
    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            agregarAmigo();
        }
    });

    // Vincula el selector de tamaño de equipo
    const select = document.getElementById('teamSizeSelect');
    if (select) {
        select.addEventListener('change', (e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value)) {
                actualizarTamañoEquipo(value);
            }
        });
    }
});
function mostrarLista() {
    const lista = document.getElementById("listaAmigos");// Obtenemos el elemento de la lista del DOM
    lista.innerHTML =''; // Limpiamos la lista antes de mostrar los amigos
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        // Botón eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.className = 'button-delete';
        btnEliminar.style.marginLeft = '10px';
        btnEliminar.onclick = function() {
            eliminarAmigo(index);
        };
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
};

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    mostrarLista();
}

function limpiarLista() {// Esta funcion limpia la lista de amigos y el dom
    amigos = []; // Reiniciamos el array de amigos
    const lista = document.getElementById("listaAmigos"); // Obtenemos el elemento de la lista del DOM
    lista.innerHTML = ''; // Limpiamos la lista en el DOM
};

actualizarTamañoEquipo = (nuevoTamaño) => {
    tamañoEquipo = nuevoTamaño;
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `<li style='color:limegreen;font-weight:bold;font-size:2em;'>Seleccionaste equipos de ${nuevoTamaño} integrantes</li>`;
    // Agrega también al HTML una referencia visual del tamaño seleccionado
    const equipoInfo = document.getElementById("equipoInfo");

};
function sortearAmigo() {// Esta funcion elige un solo objeto aleatoriamente de la lista de amigos y devuelve en el dom
    const lista = document.getElementById("listaAmigos");
    if (amigos.length === 0) {
        alert("No hay amigos en la lista.");
        return;
    }
    if (!tamañoEquipo) {
        alert("Selecciona un tamaño de equipo.");
        return;
    }
    switch (tamañoEquipo) {
        case 1:
            // Barajar aleatoriamente la lista completa y mostrarla
            renderizarGrupos(crearGrupos(1), 1);
            break;
        case 2:
            renderizarGrupos(crearGrupos(2), 2);
            break;
        case 3:
            renderizarGrupos(crearGrupos(3), 3);
            break;
        case 4:
            renderizarGrupos(crearGrupos(4), 4);
            break;
        default:
            alert("Tamaño de equipo no válido.");
            return;
    }
  
};

// Algoritmo de Fisher–Yates para mezclar un array in-place
function mezclarArrayEnSitio(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Crea grupos aleatorios del tamaño indicado, a partir de la lista de amigos
function crearGrupos(size) {
    const copia = [...amigos];
    mezclarArrayEnSitio(copia);
    const grupos = [];
    for (let i = 0; i < copia.length; i += size) {
        grupos.push(copia.slice(i, i + size));
    }
    return grupos;
}

// Pinta los grupos en el UL de resultado
function renderizarGrupos(grupos, size) {
    const resultado = document.getElementById('resultado');
    if (!resultado) return;
    resultado.innerHTML = '';
    // Mensaje encabezado
    const header = document.createElement('li');
    header.textContent = `Equipos de ${size} integrantes`;
    resultado.appendChild(header);
    grupos.forEach((equipo, idx) => {
        const li = document.createElement('li');
        li.textContent = `Equipo ${idx + 1}: ${equipo.join(', ')}`;
        resultado.appendChild(li);
    });
}