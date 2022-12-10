window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0]
    const name = document.querySelector("#inputNombre")
    const lastName = document.querySelector("#inputApellido")
    const email = document.querySelector("#inputEmail")
    const password = document.querySelector("#inputPassword")
    const confirmPassword = document.querySelector("#inputPasswordRepetida")
    const url = "http://todo-api.ctd.academy:3000/v1/"




    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const playload = {
            firstName: name.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
        }

        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(playload),
        };

        realizarRegister(settings)

        form.reset();

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
                localStorage.setItem("jwt", JSON.stringify(data.jwt));

                //redireccionamos a la página
                location.replace("./mis-tareas.html");
            }
        })
        .catch((err) => {
            console.log("Promasa rechazada !");
            console.log(err);
        });

    };


});