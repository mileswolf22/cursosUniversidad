// variables

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
const eliminarElemCarrito = document.querySelector('.eliminar-elemento');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    carrito.addEventListener('click', eliminarElemento);
}

//Funciones
function agregarCurso(e){
    //preventDefault previene la recarga de la pagina al clickear sobre el elemento "a"
    // el cual hace referencia a si mismo
    e.preventDefault();

    //La funcion se ejecutara unicamente si el elemento en donde se esta haciendo click
    //contenga la clase agregar-carrito
    if(e.target.classList.contains('agregar-carrito')){
        //contiene todos los elementos desde su primer parent hasta el ultimo
        const cursoSeleccionado = e.target.parentElement.parentElement;
        // Resultado obtenido: 
        // <div class="card">
        //             <img src="img/curso1.jpg" class="imagen-curso u-full-width">
        //             <div class="info-card">
        //                 <h4>HTML5, CSS3, JavaScript para Principiantes</h4>
        //                 <p>Juan Pedro</p>
        //                 <img src="img/estrellas.png">
        //                 <p class="precio">$200  <span class="u-pull-right ">$15</span></p>
        //                 <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="1">Agregar Al Carrito</a>
        //             </div>
        //         </div> 
        
        leerDatosCurso(cursoSeleccionado);
    }
}


function leerDatosCurso(curso){
    console.log(curso)

    // Crear objeto con el contenido del curso actual
    // Recordatorio: querySelector actua como CSS al seleccionar un elemento
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Agrega elelemtnos al arreglo de carrito
    // for(let i = 0; i<articulosCarrito.length; i++){
    //     if(articulosCarrito.length === 0){
    //         articulosCarrito = [...articulosCarrito, infoCurso]
    //     }
    //     else if(articulosCarrito[i].id == infoCurso.id){
    //         console.log("curso previamente agregado")
    //     }else{
    //         articulosCarrito = [...articulosCarrito, infoCurso]
    //     }
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    // console.log(curso);
    // console.log(infoCurso.id)
    // console.log(existe);
    if (existe) {
        
        articulosCarrito = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                //incrementa la cantidad si ya existe
                curso.cantidad++;
                return curso; //Retorna el curso actualizado
            }else {
                return curso; // lo retorna sin cambios
            }
        });
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
        // Es importante el uso del spread operator (...) para generar una copia del objeto que
        //estamos seleccionado, por lo cual 
    

    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML(){
    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src= ${curso.imagen} height = "100" width = "150">
            </td>
            <td>    
                 ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                ${curso.cantidad}
            </td>
            <td>
                <a href="#" class="button u-full-width eliminar-elemento" data-id="${curso.id}">Eliminar</a>
            </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })

}

function vaciarCarrito(){
    articulosCarrito = [];
    limpiarHTML();
}


function eliminarElemento(e){
    e.preventDefault();

    if(e.target.classList.contains('eliminar-elemento')){
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        console.log(articulosCarrito)
        // Actualizar el HTML
        carritoHTML();
    }
}

//Elimina los cursos del tbody
function limpiarHTML() {
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

