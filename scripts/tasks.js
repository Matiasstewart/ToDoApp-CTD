// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.

if (!localStorage.jwt) {
  location.replace("./index.html");
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener("load", function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */

  const url = `http://todo-api.ctd.academy:3000/v1/`;
  const urlTareas = `${url}tasks`;
  const urlUsuario = `${url}users/getMe`;
  const urlCrearTarea = `${url}tasks`;
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
    const cerrarSesion = confirm("Desea cerrar sesión ?");

    if (cerrarSesion) {
      //limpiamos el localstorage y redireccioamos a login
      localStorage.clear();
      location.replace("./index.html");
    }
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
        console.log(tareas);
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
  function renderizarTareas(listado) {}

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {}

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {}
});