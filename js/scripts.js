const mediaQuery = "(max-width:640px)";
const mediaQueryWatcher = window.matchMedia(mediaQuery);

var procesando = false;
var proceso = 0;

function mostrarProceso()
{
    if (proceso > 0)
    {
        switch (proceso)
        {
            case 1:
                document.querySelector("#calcOrinaRes").style.visibility = "visible";
                break;
            case 2:
                document.querySelector("#schwartzRes").style.visibility = "visible";
                break;
            case 3:
                document.querySelector("#schwartzmRes").style.visibility = "visible";
                break;
        }

    }
    procesando = false;
    proceso = 0;
    document.querySelector("#blocker").remove();
    document.querySelector("#loadingbar").remove();


}
function mostrarCargando(proc)
{
    //Registra que estamos haciendo para visibilizar el resultado despues.
    proceso = proc;
    //bloquea los demas procesos.
    procesando = true;
    const blocker = document.createElement("div");
    blocker.id = "blocker";
    const container = document.createElement("div");
    container.classList.add("container-bar");
    container.id = "loadingbar";
    const loading = document.createElement("div");
    loading.classList.add("loading-bar");

    container.appendChild(loading);
    loading.addEventListener("animationend", mostrarProceso);
    document.body.appendChild(blocker);
    document.body.appendChild(container);
    return;
}
function mensajeError(mensaje)
{
    //Función global que muestra un error en la pantalla.
    const blocker = document.createElement("div");
    blocker.id = "blocker";

    const cartel = document.createElement("div");
    cartel.id = "errorCartel";
    cartel.innerHTML = mensaje;


    const boton = document.createElement('button');
    boton.innerHTML="Aceptar";
    boton.id = "errorBoton";

    boton.onclick = (function(){
        boton.parentElement.remove();
        blocker.remove();
    });

    cartel.appendChild(boton);
    document.body.appendChild(blocker);
    document.body.appendChild(cartel);
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
        clCrlbl.style.visibility="hidden";
        //Validamos los datos.
        var crU = document.querySelector("#CrU").value;

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


        //Lo dividimos por la superficie corporal del paciente para tenerlo en ml/min/m2
        //y despues lo multiplicamos por 1.73 para estandarizarlo.
        clCr /=  supC * 1.73;

        clCr = Math.round(clCr);

        //Mostramos el resultado.

        clCrlbl.innerHTML = clCr + " ml/min/1.73m" + "<sup>2</sup>";
        mostrarCargando(1);

    });
}

var smbtn = document.querySelector("#schwartzmbtn");

if (smbtn)
{
    smbtn.addEventListener("click", function()
    {
        //Cliqueo sobre el boton de calculo de clearence.
        if (!procesando)
        {
            var smlbl = document.querySelector("#schwartzmRes");
        
            //ocultamos el label de resultado por si da error.
            smlbl.innerHTML="";
            smlbl.style.visibility = "hidden";

            var talla = document.querySelector("#Tallam").value;
        
            if (!isFinite(talla) || talla <= 0 || isNaN(talla))
            {
                mensajeError("Debes ingresar un valor de Talla valido en cm.")
                return;
            }
            var crP = document.querySelector("#CrPsm").value;
            if (!isFinite(crP) || crP <= 0 || isNaN(crP))
            {
                mensajeError("Debes ingresar un valor de Creatinina Plasmática valido en mg/dl.")
                return;
            }

        
            //Todos los datos correctos, calculamos el ClCr.
            var clCr = (talla * 0.41) / crP;

        
            clCr = Math.round(clCr);
        
            //Mostramos el resultado.
        
            smlbl.innerHTML = clCr + " ml/min/1.73m" + "<sup>2</sup>";
            mostrarCargando(3);
        }

    });
}

var sobtn = document.querySelector("#schwartzbtn");
if (sobtn)
{
    sobtn.addEventListener("click", function(){
        //Cliqueo sobre el boton de calculo de clearence.
            if (!procesando)
            {
                var swlbl = document.querySelector("#schwartzRes");
            
                //ocultamos el label de resultado por si da error.
                swlbl.innerHTML="";
                swlbl.style.visibility = "hidden";

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

                var talla = document.querySelector("#Talla").value;
            
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

            
                //Todos los datos correctos, calculamos el ClCr.
                var clCr = (talla * k) / crP;

            
                clCr = Math.round(clCr);
            
                //Mostramos el resultado.
            
                swlbl.innerHTML = clCr + " ml/min/1.73m" + "<sup>2</sup>";
                mostrarCargando(2);
            }
        });
    }

    var sugerenciasbtn = document.querySelector("#sugebtn");

    if (sugerenciasbtn)
    {
        sugerenciasbtn.addEventListener("click", function()
        {
            
            //Validamos

            var nombre = document.sugeform.nombre.value;
            if (nombre.length < 2)
            {
                mensajeError("Debes ingresar un nombre valido en el formulario.");
                preventDefault();
                return;
            }

            var sugerencia = document.sugeform.sugerencia.value;

            if (sugerencia.length < 20)
            {
                mensajeError("Debes ingresar una sugerencia valida con al menos 20 caracteres.");
                event.preventDefault();
                return;
            }


        });
    }