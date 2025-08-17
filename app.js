// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// Cargar la lista de amigos desde localStorage si existe
let amigos = JSON.parse(localStorage.getItem('amigos')) || [];
let tamañoEquipo = null; // Tamaño del equipo seleccionado

function agregarAmigo() { // Esta función se ejecuta al hacer clic en el botón "Agregar Amigo"
    const input = document.getElementById("amigo");// Obtenemos el elemento de entrada del DOM
    const nombre = input.value.trim();
    if (nombre) {// Verificamos que el nombre no esté vacío
        amigos.push (nombre);
    // Guardar la lista actualizada en localStorage
    localStorage.setItem('amigos', JSON.stringify(amigos));
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

    // Mostrar la lista de amigos al cargar la página si hay datos
    if (amigos.length > 0) {
        mostrarLista();
    }

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
        li.classList.add('lista-amigos-item');
        li.textContent = amigo;
        // Botón eliminar
        const btnEliminar = document.createElement('button');
        
        btnEliminar.classList.add('button-delete');
        btnEliminar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

        btnEliminar.onclick = function() {
            eliminarAmigo(index);
        };
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
};

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    // Actualizar localStorage después de eliminar
    localStorage.setItem('amigos', JSON.stringify(amigos));
    mostrarLista();
}

function limpiarLista() {// Esta funcion limpia la lista de amigos y el dom
    amigos = []; // Reiniciamos el array de amigos
    localStorage.removeItem('amigos'); // Eliminar de localStorage
    const lista = document.getElementById("listaAmigos"); // Obtenemos el elemento de la lista del DOM
    lista.innerHTML = ''; // Limpiamos la lista en el DOM
};

actualizarTamañoEquipo = (nuevoTamaño) => {
    tamañoEquipo = nuevoTamaño;
    // const resultado = document.getElementById("resultado");
    // const textoSeleccion = document.createElement('li');
    // textoSeleccion.textContent = `Seleccionaste equipos de ${nuevoTamaño} integrantes`;
    // textoSeleccion.classList.add('texto-seleccion');
    
    // resultado.appendChild(textoSeleccion);

    // resultado.innerHTML = `<li style='color:limegreen;font-weight:bold;font-size:2em;'>Seleccionaste equipos de ${nuevoTamaño} integrantes</li>`;
    // Agrega también al HTML una referencia visual del tamaño seleccionado
    // const equipoInfo = document.getElementById("equipoInfo");

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
    renderizarGrupos(crearGrupos(tamañoEquipo), tamañoEquipo); 
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
    const resultadoCard = document.getElementById('resultado-card');
    if (!resultadoCard) return;
    resultadoCard.style.display = 'flex';

    const tituloResultado = document.getElementById('resultado-title');
    if (!tituloResultado) return;
    // Mensaje encabezado
    tituloResultado.textContent = `Equipos de ${size} integrantes`;

    // Lista de equipos
    const listaEquipos = document.getElementById('resultado');
    if (!listaEquipos) return;
    listaEquipos.innerHTML = '';

    grupos.forEach((equipo, idx) => {
        const li = document.createElement('li');
        li.classList.add('resultado-item');
        li.textContent = `${equipo.join(', ')}`;
        listaEquipos.appendChild(li);
    });
}