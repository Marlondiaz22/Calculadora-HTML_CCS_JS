// Seleccionar elementos del DOM
const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

// Variables para almacenar los operandos y el operador
let operandoAnterior = '';
let operandoActual = '';
let operador = null;
let seMostroResultado = false; // Indica si se mostró el resultado recientemente

// Función para actualizar la pantalla
function actualizarPantalla(valor) {
    pantalla.textContent = valor;
}

// Función para limpiar la calculadora
function limpiar() {
    operandoActual = '';
    operandoAnterior = '';
    operador = null;
    actualizarPantalla('0');
}

// Función para borrar el último carácter
function borrar() {
    if (seMostroResultado) {
        limpiar();
        seMostroResultado = false;
        return;
    }
    operandoActual = operandoActual.slice(0, -1);
    if (operandoActual === '') {
        actualizarPantalla('0');
    } else {
        actualizarPantalla(operandoActual);
    }
}

// Función para manejar la entrada de números
function ingresarNumero(numero) {
    if (seMostroResultado) {
        operandoActual = '';
        seMostroResultado = false;
    }
    if (numero === '.' && operandoActual.includes('.')) return; // Evitar múltiples decimales
    operandoActual += numero;
    actualizarPantalla(operandoActual);
}

// Función para manejar la selección de operadores
function seleccionarOperador(op) {
    if (operandoActual === '' && operandoAnterior === '') return;
    if (operandoActual === '') {
        operador = op;
        return;
    }
    if (operandoAnterior !== '') {
        calcular();
    }
    operador = op;
    operandoAnterior = operandoActual;
    operandoActual = '';
}

// Función para calcular el resultado
function calcular() {
    let resultado;
    const anterior = parseFloat(operandoAnterior);
    const actual = parseFloat(operandoActual);

    if (isNaN(anterior) || isNaN(actual)) return;

    switch (operador) {
        case '+':
            resultado = anterior + actual;
            break;
        case '-':
            resultado = anterior - actual;
            break;
        case '*':
            resultado = anterior * actual;
            break;
        case '/':
            if (actual === 0) {
                actualizarPantalla('Error!');
                operandoActual = '';
                operandoAnterior = '';
                operador = null;
                seMostroResultado = true;
                return;
            }
            resultado = anterior / actual;
            break;
        default:
            return;
    }

    actualizarPantalla(resultado);
    operandoActual = resultado.toString();
    operador = null;
    operandoAnterior = '';
    seMostroResultado = true;
}

// Asignar eventos a los botones
botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const botonApretado = boton.textContent;

        switch (boton.id) {
            case 'c':
                limpiar();
                break;
            case 'borrar':
                borrar();
                break;
            case 'igual':
                calcular();
                break;
            case 'sum':
            case 'res':
            case 'multi':
            case 'dividir':
                seleccionarOperador(botonApretado);
                break;
            case 'deci':
                ingresarNumero('.');
                break;
            default: // Números
                if (/[0-9]/.test(botonApretado)) {
                    ingresarNumero(botonApretado);
                }
                break;
        }
    });
});

// Inicializar la pantalla
limpiar();