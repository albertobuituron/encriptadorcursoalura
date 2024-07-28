const botonModoClaroOscuro = document.getElementById('modoClaroOscuro');
const entradaTexto = document.getElementById('entradaTexto');
const resultadoTexto = document.getElementById('resultadoTexto');
const botonEncriptar = document.getElementById('encriptarBtn');
const botonDesencriptar = document.getElementById('desencriptarBtn');
const botonCopiar = document.getElementById('copiarBtn');
const botonBorrar = document.getElementById('borrarBtn');
const header = document.querySelector('header');
const footer = document.querySelector('footer');

let modoOscuro = false;

// Función para encriptar el texto
function encriptarTexto(texto) {
    return texto
        .replace(/a/g, 'ai')
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
}

// Función para desencriptar el texto
function desencriptarTexto(texto) {
    // Usar expresiones regulares con global y case-insensitive flag para evitar errores
    return texto
        .replace(/ufat/g, 'u')
        .replace(/ober/g, 'o')
        .replace(/imes/g, 'i')
        .replace(/enter/g, 'e')
        .replace(/ai/g, 'a');
}

// Función para validar el texto
function validarTexto(texto) {
    const caracteresInvalidos = /[A-ZÁÉÍÓÚÑáéíóú´]/;
    if (caracteresInvalidos.test(texto)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se aceptan mayúsculas, acentos ni caracteres especiales.',
        });
        return false;
    }
    return true;
}

// Función para mostrar alerta si no hay texto
function mostrarAlertaSinTexto() {
    Swal.fire({
        icon: 'warning',
        title: 'Aviso',
        text: 'No hay nada para encriptar o desencriptar, por favor ingrese el texto.',
    });
}

// Event listeners
botonEncriptar.addEventListener('click', () => {
    const texto = entradaTexto.value;
    if (texto.trim() === '') {
        mostrarAlertaSinTexto();
    } else if (validarTexto(texto)) {
        resultadoTexto.value = encriptarTexto(texto);
    }
});

botonDesencriptar.addEventListener('click', () => {
    const texto = entradaTexto.value;
    if (texto.trim() === '') {
        mostrarAlertaSinTexto();
    } else if (validarTexto(texto)) {
        resultadoTexto.value = desencriptarTexto(texto);
    }
});

botonCopiar.addEventListener('click', () => {
    navigator.clipboard.writeText(resultadoTexto.value).then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Copiado',
            text: 'Texto copiado al portapapeles.',
        });
    });
});

botonBorrar.addEventListener('click', () => {
    entradaTexto.value = '';
    resultadoTexto.value = '';
});

botonModoClaroOscuro.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');
    header.classList.toggle('modo-oscuro');
    footer.classList.toggle('modo-oscuro');
    modoOscuro = !modoOscuro;
    botonModoClaroOscuro.textContent = modoOscuro ? '🌜' : '🌞';
});
