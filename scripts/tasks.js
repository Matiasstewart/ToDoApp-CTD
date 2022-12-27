// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.

if (!localStorage.jwt) {
  location.replace("./index.html");
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener("load", function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */

  const url = `http://todo-api.ctd.academy:3000/v1`;
  const urlTareas = `${url}/tasks`;
  const urlUsuario = `${url}/users/getMe`;
  const urlCrearTarea = `${url}/tasks`;
  const token = JSON.parse(localStorage.jwt);

  const formCrearTarea = document.querySelector(".nueva-tarea");
  const nuevaTarea = document.querySelector("#nuevaTarea");
  const btnCerrarSesion = document.querySelector("#closeApp");

  obtenerNombreUsuario();
  consultarTareas();

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener("click", function () {
    /* const cerrarSesion = confirm("Desea cerrar sesión ?");

    if (cerrarSesion) {
      //limpiamos el localstorage y redireccioamos a login
      localStorage.clear();
      location.replace("./index.html");
    } */

    Swal.fire({
      title: "¿Desea cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      }).then((result)=>{
        if(result.isConfirmed){
          Swal.fire({
            title: "¡Hasta luego!",
            text: "Te esperamos pronto.",
            icon: "success",
            showConfirmButton: false,});
          localStorage.clear();
          location.replace("../index.html")
        }
      });
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    const settings = {
      method: "GET",
      headers: {
        authorization: token,
      },
    };

    console.log("Consultamos mi usuario");

    fetch(urlUsuario, settings)
      .then((ress) => ress.json())
      .then((data) => {
        console.log("nombre del usuario");
        console.log(data);
        const nombreUsuario = document.querySelector(".user-info p");
        nombreUsuario.innerText = data.firstName;
      })
      .catch((err) => console.log(err));
  }

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    const settings = {
      method: "GET",
      headers: {
        authorization: token,
      },
    };

    console.log("Consultamos mis tareas...");

    fetch(urlTareas, settings)
      .then((ress) => ress.json())
      .then((tareas) => {
        console.log("tareas del usuario");
        console.table(tareas);

        renderizarTareas(tareas)
        botonesCambioEstado()
        botonBorrarTarea();
        removerSkeleton(".tareas-pendientes")
        removerSkeleton(".tareas-terminadas")
      })
      .catch((err) => console.log(err));

    //limpiamos el form
    formCrearTarea.reset();
  }

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener("submit", function (event) {

    const nuevaTarea = document.querySelector("#nuevaTarea")

    event.preventDefault()

    const payload ={
      description : nuevaTarea.value,
      completed : false,
    }

    const settings = {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    };

    crearTarea(settings);
    consultarTareas();

  });

  function crearTarea(settings){

    fetch(urlCrearTarea, settings)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      });

  }

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    // obtengo listados y limpio cualquier contenido interno
    const tareasPendientes = document.querySelector('.tareas-pendientes');
    const tareasTerminadas = document.querySelector('.tareas-terminadas');
    const numeroFinalizadas = document.querySelector("#cantidad-finalizadas");
    let contador = 0;

    // limpiamos siempre las cajas
    tareasPendientes.innerHTML = "";
    tareasTerminadas.innerHTML = "";

    listado.forEach(tarea => {

      let fecha = new Date(tarea.createdAt);

      // chequear si la tarea está terminada o no
      if (tarea.completed) {
        contador++;
        tareasTerminadas.innerHTML += `
        <li class="tarea">
          <div class="hecha">
            <i class="fa-regular fa-circle-check"></i>
          </div>
          <div class="descripcion">
            <p class="nombre">${tarea.description}</p>
            <div class="cambios-estados">
              <button class="change completa" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
              <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
            </div>
          </div>
        </li>
        `
      } else {
        // tareas pendientes
        tareasPendientes.innerHTML += `
        <li class="tarea">
          <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
          <div class="descripcion">
            <p class="nombre">${tarea.description}</p>
            <p class="timestamp">${fecha.toLocaleDateString()}</p>
          </div>
        </li>
        `
      }
      
      })

    numeroFinalizadas.innerText = contador

  }

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {

    const btnCambioEstado = document.querySelectorAll('.change');

    btnCambioEstado.forEach(boton => {
      //a cada boton le asignamos una funcionalidad
      boton.addEventListener('click', function (event) {

        console.log("Cambiando estado de tarea...");

        const id = event.target.id;
        const url = `${urlTareas}/${id}`
        const payload = {};

        //segun el tipo de boton que fue clickeado, cambiamos el estado de la tarea
        if (event.target.classList.contains('completa')) {
          // si está completada, la paso a pendiente
          payload.completed = false;
        } else {
          // sino, está pendiente, la paso a completada
          payload.completed = true;
        }


        const settingsCambio = {
          method: 'PUT',
          headers: {
            "Authorization": token,
            "Content-type": "application/json"
          },
          body: JSON.stringify(payload)
        }
        fetch(url, settingsCambio)
          .then(response => {
            console.log(response.status);
            //vuelvo a consultar las tareas actualizadas y pintarlas nuevamente en pantalla
            consultarTareas();
          })
      })
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
    const deleteBtns = document.querySelectorAll('.borrar')

    deleteBtns.forEach(btn =>{

      btn.addEventListener("click",(e)=>{

        const id = e.target.id;
        const url = `${urlTareas}/${id}`

        const deleteSettings = {
          method: 'DELETE',
          headers: {
            "Authorization": token,
          }
        }

        fetch(url, deleteSettings)
          .then(response => {
            console.log(response.status);
            //vuelvo a consultar las tareas actualizadas y pintarlas nuevamente en pantalla
            consultarTareas();
          })

      })

    })
  }
});