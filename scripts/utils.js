/* -------------------------- Expresiones regulares ------------------------- */
const exRegTexto =   /^[a-zA-Z ]{2,30}$/;
const exRegEmail =  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

/* Minimum eight characters, at least one uppercase letter, one lowercase letter and one number: */

const exRegPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;


/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
    if(!exRegTexto.test(texto)){
        return false;
    }else{
        return true;
    }
}

function normalizarTexto(texto) {
    
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    if(!exRegEmail.test(email)){
        return false;
    }else{
        return true;
    }
}

function normalizarEmail(email) {
    
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(password) {
    if(!exRegPassword.test(password)){
        return false 
    } else {
        return true
    }
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
    
}

