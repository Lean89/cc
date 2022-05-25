const mediaQuery = "(max-width:640px)";
const mediaQueryWatcher = window.matchMedia(mediaQuery);


function mensajeError(mensaje)
{
    //Función global que muestra un error en la pantalla.
    const cartel = document.createElement("div");
    cartel.style.position = "absolute";
    cartel.style.backgroundColor = "red";
    cartel.style.width = "30%";
    cartel.style.maxWidth = "25rem";
    cartel.style.height = "20%";
    cartel.style.maxHeight="8rem";
    cartel.style.top = "50%";
    cartel.style.left = "35%";
    cartel.style.zIndex="999";
    cartel.innerHTML = mensaje;
    cartel.style.opacity = 1;


    const boton = document.createElement('button');
    boton.innerHTML="Aceptar";

    boton.onclick = (function(){
        alert(boton.parentElement.innerHTML);
        document.removeChild(boton.parentElement);
    });

    cartel.appendChild(boton);
    document.body.appendChild(cartel);
    console.error("Error: " + mensaje);
    return;
}

//Desaparece la imagen del riñon para ser reemplazada por el menu cuando es tamaño cel.
mediaQueryWatcher.addEventListener('change', event => {
    if (event.matches)
    {
        // Mide menos de 640, nos aseguramos de no mostrar la nav.
        document.querySelector('nav').style.display="none";
        document.querySelector('.logo').style.display="none";
    }
    else
    {
        document.querySelector('nav').style.display="inline";
        document.querySelector('.logo').style.display="block";        
    }

});
//Realiza el manejo del boton menu del navbar en pantallas moviles.
document.querySelector(".nav-btn").addEventListener("click", function()
{
    var nav = document.querySelector('nav');
    if (nav.style.display == 'block')
    {
        nav.style.display = "none";
    }
    else
    {
        nav.style.display = "block";

    }
});

var cobtn = document.querySelector("#calcOrinabtn");
if (cobtn)
{
    cobtn.addEventListener("click", function(){
    //Cliqueo sobre el boton de calculo de clearence.
        var clCrlbl = document.querySelector("#calcOrinaRes");

        //Limpiamos el label de resultado por si da error.
        clCrlbl.innerHTML = "";
        clCrlbl.style.backgroundImage="";
        //Validamos los datos.
        var crU = document.querySelector("#CrU").value;
        console.log(crU);

        if (!isFinite(crU) || crU <= 0 || isNaN(crU))
        {
            mensajeError("Debes ingresar un valor de Creatinina Urinaria valido en mg/dl.")
            return;
        }
        var crP = document.querySelector("#CrP").value;
        if (!isFinite(crP) || crP <= 0 || isNaN(crP))
        {
            mensajeError("Debes ingresar un valor de Creatinina Plasmática valido en mg/dl.")
            return;
        }

        var volUrinario = document.querySelector("#VolU").value;
        if (!isFinite(volUrinario) || volUrinario <= 0 || isNaN(volUrinario))
        {
            mensajeError("Debes ingresar un valor de volumen urnario valido en ml.")
            return;
        }
        var supC = document.querySelector("#SupC").value;
        if (!isFinite(supC) || supC <= 0 || isNaN(supC))
        {
            mensajeError("Debes ingresar un valor de superficie corporal valido en m2.")
            return;
        }

        //Todos los datos correctos, calculamos el ClCr.
        // Creatinina Urinaria en mg/dl * (VolumenUrinario de 24 horas ml / 1440 min en 24 horas)
        //Todo eso lo dividimos por crP y obtenemos cuantos ml de plasma por minuto
        //aclara nuestro paciente de creatinina.
        var clCr = (crU * (volUrinario / 1440)) / crP;
        console.log(clCr);

        //Lo dividimos por la superficie corporal del paciente para tenerlo en ml/min/m2
        //y despues lo multiplicamos por 1.73 para estandarizarlo.
        clCr /=  supC * 1.73;

        clCr = Math.round(clCr);

        //Mostramos el resultado.

        clCrlbl.innerHTML = clCr + " ml/min/1.73m" + "<sup>2</sup>";
        clCrlbl.style.backgroundImage = "url('../static/fondoh6.png')";
        clCrlbl.style.backgroundRepeat = "no-repeat";
        clCrlbl.style.backgroundSize = "70% 100%";
        clCrlbl.style.backgroundPosition = "center";

    });
}
var sobtn = document.querySelector("#schwartzbtn");
if (sobtn)
{
    sobtn.addEventListener("click", function(){
        //Cliqueo sobre el boton de calculo de clearence.
        console.log("lllega");
            var swlbl = document.querySelector("#schwartzRes");
        
            //Limpiamos el label de resultado por si da error.
            swlbl.innerHTML = "";
            swlbl.style.backgroundImage="";

            //Validamos los datos.
            var k = 0;
            var kl = document.querySelectorAll("input[name='sok']");
            for (var i in kl)
            {
                if (kl[i].checked)
                {
                    k = kl[i].value;
                    break;
                }
            }

            if (k == 0)
            {
                mensajeError("Debes seleccionar la edad de tu paciente.")
                return;
            }
            console.log(k);

            var talla = document.querySelector("#Talla").value;
            console.log(talla);
        
            if (!isFinite(talla) || talla <= 0 || isNaN(talla))
            {
                mensajeError("Debes ingresar un valor de Talla valido en cm.")
                return;
            }
            var crP = document.querySelector("#CrPso").value;
            if (!isFinite(crP) || crP <= 0 || isNaN(crP))
            {
                mensajeError("Debes ingresar un valor de Creatinina Plasmática valido en mg/dl.")
                return;
            }
            console.log(crP);

         
            //Todos los datos correctos, calculamos el ClCr.
            var clCr = (talla * k) / crP;
            console.log(clCr);

        
            clCr = Math.round(clCr);
        
            //Mostramos el resultado.
        
            swlbl.innerHTML = clCr + " ml/min/1.73m" + "<sup>2</sup>";
            swlbl.style.backgroundImage = "url('../static/fondoh6.png')";
            swlbl.style.backgroundRepeat = "no-repeat";
            swlbl.style.backgroundSize = "70% 100%";
            swlbl.style.backgroundPosition = "center";
        
        });
    }