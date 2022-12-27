/*
Nuestra función recibirá dos argumentos:

1) En primer lugar, la cantidad de skeletons que queremos mostrar;
2) En segundo lugar, el contenedor dentro del cual queremos incluir los skeletons
Por ejemplo, si queremos mostrar 5 skeletons dentro del siguiente contenedor:

<ul class="tareas-pendientes"></ul>

al invocar la función le podremos pasar los siguientes argumentos:

renderizarSkeletons(5, ".tareas-pendientes")

  */

function renderizarSkeletons(cantidad, contenedor) {
    // Seleccionamos el contenedor
    const contenedorTareas = document.querySelector(contenedor);

    // Creamos un array que tendrá un lenght igual a la cantidad de
    //skeletons que queremos renderizar
    const skeletons = Array.from({ length: cantidad });

    // Iteramos sobre el array accediendo a cada elemento
    skeletons.forEach(() => {
        // Guardamos el HTML de cada skeleton. Agregamos una clase con el selector del contenedor
        // Esto nos permitirá luego poder eliminar los skeletons de dicho contenedor
        const template = `
                <li class="skeleton-container ${contenedor.replace(".", "")}-child">
                    <div class="skeleton-card">
                    <p class="skeleton-text"></p>
                    <p class="skeleton-text"></p>
                    </div>
                </li>
                `;

        // Insertamos el HTML dentro del contenedor
        contenedorTareas.innerHTML += template;
    });
}

window.addEventListener("load", () => {
    renderizarSkeletons(3, ".tareas-pendientes");
    renderizarSkeletons(3, ".tareas-terminadas");
})

/*
Esta función recibirá el nombre del contenedor dentro del cual se encuentran los skeletons que deseamos remover
*/
function removerSkeleton(contenedor) {
    // Seleccionamos el contenedor
    const contenedorTareas = document.querySelector(contenedor);

    // Seleccionamos todos los skeletons dentro de ese contenedor
    const skeletons = document.querySelectorAll(`${contenedor}-child`);

    // Iteramos sobre la lista de skeletons y removemos cada uno de ellos
    // de dicho contenedor
    skeletons.forEach((skeleton) => contenedorTareas.removeChild(skeleton));
}