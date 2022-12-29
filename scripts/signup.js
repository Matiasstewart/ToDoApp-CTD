window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0]
    const name = document.querySelector("#inputNombre")
    const lastName = document.querySelector("#inputApellido")
    const email = document.querySelector("#inputEmail")
    const password = document.querySelector("#inputPassword")
    const confirmPassword = document.querySelector("#inputPasswordRepetida")
    const url = "http://todo-api.ctd.academy:3000/v1/"

    const listaErrores = document.querySelector("#listErroresSingup")

    const submitBtn = document.querySelector("#submitBtn")


    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const datos = capturarDatosForm();

        const datosValidados = validacionCompleta(datos)

        const payload = {
            firstName: datos.firstName,
            lastName: datos.lastName,
            email: datos.email,
            password: datos.password,
        }

        console.log(payload)

        console.log(datosValidados)

        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        };

        if (datosValidados.length > 0) {
            renderizarErrores(datosValidados)
        } else {
            realizarRegister(settings)
            form.reset();
        }

    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {

        fetch(`${url}users`, settings)
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
                    localStorage.setItem("jwt", JSON.stringify(data.jwt)); //<- Seria redundante ya que de por si ya es un string

                    //redireccionamos a la página
                    location.replace("./mis-tareas.html");
                }
            })
            .catch((err) => {
                console.log("Promasa rechazada !");
                console.log(err);
            });

    };

    /* --------- Funcion creada para validar todos los datos del SingUp --------- */

    function validacionCompleta(obj) {
        const errores = []

        if (!validarTexto(obj.firstName)) {
            errores.push("Ingrese un nombre valido")
            name.classList.add("inputError")
        } else {
            name.classList.remove("inputError")
        }

        if (!validarTexto(obj.lastName)) {
            errores.push("Ingrese un apellido valido")
            lastName.classList.add("inputError")
        } else {
            lastName.classList.remove("inputError")
        }

        if (!validarEmail(obj.email)) {
            errores.push("Ingrese un email valido")
            email.classList.add("inputError")
        } else {
            email.classList.remove("inputError")
        }

        if (!validarContrasenia(obj.password)) {
            errores.push("ingrese una contraseña valida")
            password.classList.add("inputError")
        } else {
            password.classList.remove("inputError")
        }

        if (compararContrasenias(obj.password, obj.confirmPassword)) {
            errores.push("Las contraseñas no coinciden")
            confirmPassword.classList.add("inputError")
        } else {
            confirmPassword.classList.remove("inputError")
        }

        return errores
    }

    /* ----------------- Funcion para capturar datos del usuario ---------------- */

    function capturarDatosForm() {
        const datos = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        }

        datos.firstName = name.value;
        datos.lastName = lastName.value;
        datos.email = email.value;
        datos.password = password.value;
        datos.confirmPassword = confirmPassword.value;

        return datos
    }

    /* ----------------- Funcion creada para renderizar errores ----------------- */

    function renderizarErrores(arr) {

        listaErrores.innerHTML = ""

        arr.forEach((element, index) => {
            listaErrores.innerHTML += `<li id="error-${index}" class="error"> ${element} </li>`;
        });
    }


});