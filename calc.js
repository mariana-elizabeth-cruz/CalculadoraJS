//-----------elementos de DOM-----------------
/*se crea const para guardar los datos de los numeros */
//cada DATA son arreglos
const botonNumeros = document.getElementsByName('data-numero');
//console.log(botonNumeros); de esta forma muestro por consola

/* se crea const para las operaciones, lo mismo para el signo igual y el de borrar*/
const botonOpera = document.getElementsByName('data-opera');

/*para que no me arroje un arreglo en el boton =, y solo queremos el boton usamos [0] y se coloca en el indice 0*/
const botonIgual = document.getElementsByName('data-igual')[0];
const botonDelete = document.getElementsByName('data-delete')[0];

//console.log(botonDelete); comprobamos que funciona

var result = document.getElementById('resultado');
//console.log(result); se compruebo que funciona

//creamos otras variables para implementar metodos
var opeActual = '';
var opeAnterior = ''; // guarda la operacion anterior
var operacion = undefined;

//-----------------------------------------------

//--------------agregamos los eventos--------------

/*forEach es para recorrer el arreglo. Dentro llamamos a una funcion que por parametro tiene boton que llama al boton que estoy obteniendo*/

botonNumeros.forEach(function(boton){
    boton.addEventListener('click', function () {
        agregarNumero(boton.innerText); //para escribir en la pantalla
        //alert(boton.innerText);  compruebo que funciona
    })
});

//para utilizar los botones de operacion
botonOpera.forEach(function (boton) {
    boton.addEventListener('click', function () {
        selectOperacion(boton.innerText);
       // alert(boton.innerText);  compruebo que funciona
    })
});

//creamos 2 metodos para esta funcion
botonIgual.addEventListener('click', function () {
    calcular();
    actualizarDisplay();
});

botonDelete.addEventListener('click', function () {
    clear();
    actualizarDisplay();
})

//---------------------------------------------

//----------------------Implementamos metodos----------

function selectOperacion(op) {
    if (opeActual === '') return;
    if (opeAnterior !== '') {
        calcular();
    }
    operacion = op.toString();
    opeAnterior = opeActual;
    opeActual = '';
}

function calcular() {
    var calculo;
    //los valores en string se pasan a numero para hacer los calcuclos
    const anterior = parseFloat(opeAnterior);
    const actual = parseFloat(opeActual);
    if (isNaN(anterior) || isNaN(actual)) return;
    switch (operacion) {
        case '+':
            calculo = anterior + actual;
            break;
        case '-':
            calculo = anterior - actual;
            break;
        case 'x':
            calculo = anterior * actual;
            break;
        case '/':
            calculo = anterior / actual;
            break;
        default:
            return;
    }
    opeActual = calculo;
    operacion = undefined;
    opeAnterior = '';
}



//empezamos con el metodo de agregar
function agregarNumero(num) {
    // usamos toString para convertir los numeros en cadena de texto
    opeActual = opeActual.toString() + num.toString(); //concatenamos los numeros que van seleccionando en el display
    actualizarDisplay();
}

//definimos un metodo para limpiar la pantalla
function clear() {
    opeActual = '';
    opeAnterior = '';
    operacion = undefined;
    //con esta funcion inicializamos las viarebles nuervamente
}  
    
function actualizarDisplay() {
    result.value = opeActual;
}

clear();
