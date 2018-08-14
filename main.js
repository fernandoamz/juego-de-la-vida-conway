/*
 * 
 * 
 * @Created by: Fernando Amezcua Alcantar 
 * 
 * 
 */

var pobladores = 15
const comunidad = muestras(pobladores)    

function nuevaGeneracion(){
    dibujarArreglo(generaciones(comunidad))
}

function muestras(){
    var celulas = new Array(pobladores)
    
    for(x = 0; x < pobladores; x++){ 
        celulas[x] = new Array(pobladores)
        for(y = 0; y < celulas.length; y++){
			celulas[x][y] = (Math.random()>0.5) ? 1 : 0
        }
    }

    console.log(celulas)
    return celulas  
}

function generaciones(comunidad){
    for (let x = 0; x < comunidad.length; x++) {
        for (let y = 0; y < comunidad[x].length; y++) {
            
            var valor = comunidad[x][y];
            var contador = buscarVecinos(x,y);
            var result = 0;

            // evaluacion de las condiciones

            // Si esta viva y tiene menos de dos vecinos muere
            if (valor && contador < 2){
                result = 0;
            }

            // si tiene valor y tiene 2 o tres vecinos vive 
            if (valor && (contador == 2 || contador == 3)){
                result = 1;
            }

            // si tiene mas de tres vecinos muere
            if (valor && contador > 3){
                result = 0;
            }
            
            // Si no tiene valor y tiene tres vecinos vivos Nace
            if (!valor && contador == 3){
                result = 1;
            }

            comunidad[x][y] = result;
        }
    }

    console.log(comunidad)
    return comunidad
}

/*
 * 
 * TODO: Agregar interface con canvas
 * 
 */

function dibujarArreglo(comunidad){
    var textArea = document.getElementById("results")

    for(x = 0; x < comunidad.length; x++){
        for(y = 0; y < comunidad.length; y++){
            textArea.innerHTML += comunidad[x][y]+",";
        }
    }

    textArea.innerHTML += "--------------"

}

function buscarVecinos(x,y){
    var contador = 0;

    // Revisar celda izquierda de la posición actual
    if(estado(x-1, y)){
        contador++;
    }

    // Revisar superior izquierda
    if(estado(x-1, y-1)){
        contador++;
    } 

    // Revisar inferior izquierda
    if(estado(x-1, y+1)){
        contador++;
    }

    // Revisar celda de arriba del posicion actual
    if(estado(x  , y-1)){
        contador++;
    }

    // celda derecha de la posicion actual
    if(estado(x  , y+1)){
        contador++;
    }

    //  Esquina superior izquierda de la posicion actual
    if(estado(x+1, y-1)){
        contador++;
    }

    // Revisar esquina inferior derecha
    if(estado(x+1, y+1)){
        contador++;
    } 

    // Revisar celda de abajo de la posicion actual
    if(estado(x+1, y)){
        contador++;
    }
    
    return contador;
}

/*
* 
* Esta funcion evalua el estado de la posicion de 
* donde esta siendo llamada
*
*/

function estado(x,y) {
    if(comunidad[x]) {
        if(comunidad[x][y] == 1) 
        {
            return true;
        }else{
            return false;
        }
    }
}