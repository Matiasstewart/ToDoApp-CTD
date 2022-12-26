window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const form = document.forms[0];
  const email = this.document.querySelector("#inputEmail");
  const password = this.document.querySelector("#inputPassword");
  const url = "http://todo-api.ctd.academy:3000/v1/";

  const btnIngreso = document.querySelector("#btnIngreso")
  const btnImg = this.document.querySelector("#spinnerImg")
  const textoBtnIngreso = this.document.querySelector("#textoBtnIngreso")

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    //creamos el cuerpo de la request
    const payload = {
      email: email.value,
      password: password.value,
    };

    //configuramos la request del Fetch

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    //lanzamos la consulta de login a la API
    realizarLogin(settings);

    //Desactivamos el boton al hacer submit para que no se pueda clickear nuevamente y se vea el Spinner
    btnIngreso.setAttribute("disabled", "");

    //Llamamos a esta funcion para que desaparesca el texto del boton y aparezca el gif del spinner
    invertirClases()

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
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese correctamente sus datos!',
            footer: '<a href="../signup.html"> ¿No tienes una cuenta? Regístrate aquí <a>'
          })
          btnIngreso.removeAttribute("disabled", "");
          invertirClases()
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
    
    /* -------------------------------------------------------------------------- */
    /*                           FUNCION: SPINNER CARGA                           */
    /* -------------------------------------------------------------------------- */
    
    function invertirClases() {
      btnImg.classList.toggle("oculto");
      textoBtnIngreso.classList.toggle("oculto");
    }

  });
  
  