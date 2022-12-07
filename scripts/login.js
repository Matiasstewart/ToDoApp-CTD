window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const form = document.forms[0];
  const email = this.document.querySelector("#inputEmail");
  const password = this.document.querySelector("#inputPassword");
  const url = "http://todo-api.ctd.academy:3000/v1/";

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    //creamos el cuerpo de la request
    const playload = {
      email: email.value,
      password: password.value,
    };

    //configuramos la request del Fetch

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playload),
    };

    //lanzamos la consulta de login a la API
    realizarLogin(settings);

    //limpio los campos del formulario
    form.reset();
  });

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 2: Realizar el login [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarLogin(settings) {
    console.log("Lanzando la consulta a la API...");

    fetch(`${url}users/login`, settings)
      .then((response) => {
        console.log(response);

        if (!response.ok) {
          alert("Alguno de los datos es incorrecto.");
        }

        return response.json();
      })
      .then((data) => {
        console.log("promesa cumplida!");
        console.log(data);

        if (data.jwt) {
          //guardo en LocalStorage el objeto con el token
          localStorage.setItem("jwt", JSON.stringify(data.jwt));

          //redireccionamos a la página
          location.replace("./mis-tareas.html");
        }
      })
      .catch((err) => {
        console.log("Promasa rechazada !");
        console.log(err);
      });
  }
});
