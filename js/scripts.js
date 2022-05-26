const mediaQuery = "(max-width:640px)";
const mediaQueryWatcher = window.matchMedia(mediaQuery);

var procesando = false;
var proceso = 0;
var numPacientes = 0;
var pacientes = [];
var pacienteElegido = 0;



function mostrarCargando(proc)
{
    //Muestra una barra de cargando previo a mostrar el resultado.
    //Coloca un blocker en la pantalla para fijarla.

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
    loading.addEventListener("animationend", mostrarResultado);
    document.body.appendChild(blocker);
    document.body.appendChild(container);
    return;
}
function mostrarResultado()
{
    // Muestra el resultado al finalizar la barra de animación cuyo unico objetivo es
    // meter suspenso, remueve el blocker y la barra de carga.

    if (proceso > 0)
    {
        switch (proceso)
        {
            case 1:
                document.querySelector("#calcOrinaRes").style.visibility = "visible";
                document.querySelector(".asave").style.visibility = "visible";
                break;
            case 2:
                document.querySelector("#schwartzRes").style.visibility = "visible";
                document.querySelector("#schwartzRes ~ .asave").style.visibility = "visible";
                break;
            case 3:
                document.querySelector("#schwartzmRes").style.visibility = "visible";
                document.querySelector("#schwartzmRes ~ .asave").style.visibility = "visible";
                break;
        }

    }
    procesando = false;
    proceso = 0;
    document.querySelector("#blocker").remove();
    document.querySelector("#loadingbar").remove();

    //Le mostramos el guardar resultado.
    

}
function mostrarAddPaciente()
{
    // Muestra un panel para agregar paciente con nombre y apellido.
    // genera un blocker para fijar la pantalla.

    //Creamos los elementos.
    const panel = document.createElement("div");
    panel.classList.add("panelAdd");

    const txtNombre = document.createElement("input");
    const txtApellido = document.createElement("input");
    txtApellido.name = "addApellido";
    txtNombre.name = "addNombre";
    const lblNombre = document.createElement("label");
    const lblApellido = document.createElement("label");
    lblNombre.htmlFor="addNombre";
    lblNombre.innerHTML = "Nombre:";
    lblApellido.htmlFor="addApellido";
    lblApellido.innerHTML = "Apellido:";
    const btnac = document.createElement("button");
    btnac.classList.add("btnAceptar");
    btnac.classList.add("btnAdd");
    btnac.innerHTML ="Aceptar";
    btnac.addEventListener("click",aceptarAdd);
    const btncan = document.createElement("button");
    btncan.innerHTML ="Cancelar";
    btncan.classList.add("btnAceptar");
    btncan.classList.add("btnAdd");
    btncan.addEventListener("click", cancelarAdd);
    //Agregamos los elementos.
    panel.appendChild(lblNombre);
    panel.appendChild(txtNombre);
    panel.appendChild(lblApellido);
    panel.appendChild(txtApellido);
    panel.appendChild(btncan);
    panel.appendChild(btnac);
    //Agregamos un blocker que fija la pantalla.
    const blocker = document.createElement("div");
    blocker.id = "blocker";

    document.body.appendChild(blocker);
    document.body.appendChild(panel);
}
function aceptarAdd()
{
    // Validamos y aceptamos la información del paciente.
    // Si esta todo ok cerramos el formulario.
    const txtApellido = document.querySelector("input[name='addApellido']");
    const txtNombre = document.querySelector("input[name='addNombre']");

    if (txtApellido && txtNombre)
    {
        var apellido = txtApellido.value;
        var nombre = txtNombre.value;

        if (apellido.length < 2)
        {
            mensajeError("Debes ingresar un apellido valido.");
            return;
        }
        if (nombre.length < 2)
        {
            mensajeError("Debes ingresar un nombre valido.");
            return;
        }
        
        addPaciente(apellido,nombre,0);
        blocker.remove();
        this.parentElement.remove();

    }
    else
    {
        mensajeError("Ha ocurrido un error.");
        return;
    }
}
function cancelarAdd()
{
    //Remueve el formulario y el blocker.
    this.parentElement.remove();
    blocker.remove();
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



// Funcionalidad del boton de calculo de clearence.
var cobtn = document.querySelector("#calcOrinabtn");
if (cobtn)
{
    cobtn.addEventListener("click", function(){
    //Cliqueo sobre el boton de calculo de clearence.
        var clCrlbl = document.querySelector("#calcOrinaRes");

        //Limpiamos el label de resultado por si da error.
        clCrlbl.innerHTML = "";
        clCrlbl.style.visibility="hidden";
        document.querySelector(".asave").visibility = "hidden";
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

// Funcionalidad del boton de calculo de Schwartz modificada.
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
            document.querySelector(".schwartzmFs > .asave").style.visibility = "hidden";
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

// Funcionalidad del boton de schwartz original.
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
                document.querySelector(".schwartzFs > .asave").style.visibility = "hidden";
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

    // Funcionalidad del boton de sugerencias.
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
                event.preventDefault();
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

    // LE damos funcionalidad al select de pacientes.
    var selPacientes = document.querySelector(".selpat");
    if (selPacientes)
    {
        selPacientes.addEventListener("click", function()
        {
            pacienteElegido = selPacientes.value;
            if (pacienteElegido > 0)
            {
                actualizarPacienteInfo();
                rellenarTallas();
            }
            else
            {
                ocultarPacienteInfo();
            }


        });
    }
    // Cargamos pacientes si los hubiera en el local storage.
    cargarPacientes()

    function actualizarSelects()
    {
        //Actualiza el select de pacientes cuando cargan o se eliminan.
        var selPacientes = document.querySelector(".selpat");
    
        if (selPacientes)
        {
            if (numPacientes > 0)
            {
    
                let option = document.createElement("option");
                option.text = "Seleccione un paciente...";
                option.value = 0;
                selPacientes.appendChild(option);
    
                pacientes.forEach( function(p)
                {
                    let option = document.createElement("option");
                    option.text = p.apellido + "," + p.nombre;
                    option.value = p.id;
                    selPacientes.appendChild(option);
                });
            }   
            else
            {
                for (var i = selPacientes.options.length - 1; i >= 0; i--)
                {
                    selPacientes.remove(i);
                }
            }
        }
    }

    function agregarOption(id)
    {
        // Agrega una opcion al select cuando se agrega un pacinete.
        var selPacientes = document.querySelector(".selpat");
        if (selPacientes)
        {
            if (numPacientes >= id)
            {
                let option = document.createElement("option");
                option.text = pacientes[id].apellido + "," + pacientes[id].nombre;
                option.value = pacientes[id].id;
                selPacientes.appendChild(option);
            }   
        }
    }

    function addPaciente(papellido, pnombre, ptalla)
    {
            //Agrega un paciente nuevo, lo actualiza en el select y lo guarda en storage.
            numPacientes++;
            let paciente =  {id:numPacientes, apellido:papellido, nombre:pnombre, talla:ptalla, ultimacuenta: new Date(Date.now()), numMediciones:0, mediciones:[]};
            pacientes.push(paciente);
            agregarOption(numPacientes-1);

            db_actualizarNumPacientes();
            db_guardarPaciente(numPacientes);
    }

    
    function obtenerTipoTexto(tipoMed)
    {
        // Devuelve el texto a mostrar segun el tipo de medicion.
        if (tipoMed > 0)
        {
            var resp = "";
            switch (parseInt(tipoMed))
            {
                case 1:
                    resp = "Orina 24 hs";
                    break;
                case 2:
                    resp =  "Schwartz";
                    break;
                case 3:
                    resp =  "Schwartz Modificada";
                    break;
            }
    
        }
        return resp;
    }
    
    function guardarMedicion(tipoMedicion)
    {
        //Guarda una nueva medicion para el paciente elegido.
        if (numPacientes > 0)
        {
            if (pacienteElegido > 0)
            {
                if (tipoMedicion > 0)
                {
                    var valor = 0;
                    var reslabeltxt = "";
                    switch(tipoMedicion)
                    {
                        case 1:
                            reslabeltxt = document.querySelector("#calcOrinaRes").innerHTML;
                            break;
                        case 2:
                            reslabeltxt = document.querySelector("#schwartzRes").innerHTML;
                            break;
                        case 3:
                            reslabeltxt = document.querySelector("#schwartzmRes").innerHTML;
                            break;

                    }
                    valor = parseInt(reslabeltxt.split(" ")[0]);
                    if (valor > 0)
                    {
                        //actualizamos la talla.
                        if (tipoMedicion == 2)
                        {
                            pacientes[pacienteElegido-1].talla = document.querySelector("#Talla").value;
                        }
                        else if (tipoMedicion == 3)
                        {
                            pacientes[pacienteElegido-1].talla = document.querySelector("#Talla").value;
                        }
                        //ACtualiza la fecha de ultima medicion en el paciente
                        pacientes[pacienteElegido-1].ultimacuenta = new Date(Date.now());
                        //Agrega la nueva medicion.
                        pacientes[pacienteElegido-1].numMediciones++;

                        db_guardarPaciente(pacienteElegido);
                        db_guardarMedicion(pacienteElegido, tipoMedicion, valor);
                        actualizarPacienteInfo();
                    }
                    else
                    {
                        mensajeError("Ha ocurrido un error.");
                    }
                }
                else
                {
                    mensajeError("Ha ocurrido un error.");
                }
            }
            else
            {
                mensajeError("Debés seleccionar un paciente para poder guardar la medición.");
            }

        }
        else
        {
            mensajeError("Debés agregar un paciente para poder guardar la medición.");
        }
        return;

    }






function cargarPacientes()
{

    // Prueba si esta habilitado el storage sino lo esta no muestra el select.
    db_probarStorage();

    // Cargamos los pacientes.
    db_cargarPacientes();
    
    // Actualizamos los selects si necesario.
    actualizarSelects();

}



function ocultarPacienteInfo()
{   
    var fieldsetp = document.querySelector(".pacientedatafs");
    if (fieldsetp)
    {
        fieldsetp.style.display = "none";
        ocultarMedicionesPrevias();
    }

}


function actualizarPacienteInfo()
{   
    // Actualiza la informacion del paciente si al seleccionarlo.
    var fieldsetp = document.querySelector(".pacientedatafs");
    if (fieldsetp)
    {
    fieldsetp.style.display = "block";

    document.querySelector(".pacientedatafs > h4").innerHTML = "Paciente: " + pacientes[pacienteElegido-1].apellido + ", " + pacientes[pacienteElegido-1].nombre;
    if (pacientes[pacienteElegido-1].talla > 0)
    {
        document.querySelector("#ptlbl").innerHTML = "Talla: " + pacientes[pacienteElegido-1].talla + " cm.";
    }
    else
    {
        document.querySelector("#ptlbl").innerHTML = "Talla: No registrada."
    }

    let s = pacientes[pacienteElegido-1].ultimacuenta.toLocaleDateString();
    document.querySelector("#ptum").innerHTML = "Ultima Medición: " + s;
    
    db_cargarMediciones(pacienteElegido);

    }
    if (pacienteElegido <= numPacientes && pacienteElegido > 0)
    {
        if (pacientes[pacienteElegido-1].numMediciones > 0)
        {
            mostrarMedicionesPrevias(pacienteElegido);
            return;
        }
    }
    //Si el elegido no tiene o si no se selecciono nadie... ocultamos.
    ocultarMedicionesPrevias();

}
function rellenarTallas()
{
    // Si el paciente tiene talla registrada, la ponemos en el box para ahorrar tiempo.
    const tallao = document.querySelector("#Talla");
    const tallam = document.querySelector("#Tallam");

    if (tallao && tallam)

    {
        if (pacienteElegido > 0)
        {
            tallam.value = pacientes[pacienteElegido-1].talla;
            tallao.value = pacientes[pacienteElegido-1].talla;
            

        }
    }


}

function ocultarMedicionesPrevias()
{
    // Oculta las mediciones previas del paciente si no corresponde mostrarlas.
    var fieldsetm = document.querySelector(".medicionespreviasfs");
    if (fieldsetm)
    {

        fieldsetm.style.display = "none";
    }

}
function mostrarMedicionesPrevias()
{
    // Muestra mediciones previas del paciente si las hubiera.
    var fieldsetm = document.querySelector(".medicionespreviasfs");
    if (fieldsetm)
    {

        fieldsetm.style.display = "block";

        var tabla = document.querySelector("#pmtable");
        for (var j = tabla.children.length - 1; j >= 1; j--)
        {
                tabla.children[j].remove();
        }
        
        for (var i = 0; i < pacientes[pacienteElegido-1].numMediciones; i++)
        {

            let tr =  document.createElement("tr");
            
            let tdFecha =  document.createElement("td");
            let tdtipo =  document.createElement("td");
            let tdValor =  document.createElement("td");
            
            tdFecha.innerHTML = pacientes[pacienteElegido-1].mediciones[i].fecha.toLocaleDateString();
            tdtipo.innerHTML = obtenerTipoTexto(pacientes[pacienteElegido-1].mediciones[i].tipo);
            tdValor.innerHTML= pacientes[pacienteElegido-1].mediciones[i].valor + " ml/min/1.73 m<sup>2</sup>";

            tr.appendChild(tdFecha);
            tr.appendChild(tdtipo);
            tr.appendChild(tdValor);

            tabla.appendChild(tr);
        }

    }

}
    function db_probarStorage()
    {
        if (!Storage || typeof(Storage) == undefined)
        {
            var pld = document.querySelectorAll(".pacienteListaDiv");
            if (pld)
            {
                pld.style.display = "none";

            }
            var sel = document.querySelector("#storageError");
            sel.innerHTML = "Tu navegador no es compatible o no tiene habilitado el Almacenamiento local."
            

        }
            
    }
    // FUNCIONES DE BASE DE DATOS //
    function db_actualizarNumPacientes()
    {
        if (typeof(Storage) !== undefined)
        {
            localStorage.setItem("numPacientes", numPacientes);
        }
    }
    function db_guardarPaciente(paciente)
    {
        if (typeof(Storage) !== undefined)
        {           
            localStorage.setItem("paciente" + paciente, pacientes[paciente-1].nombre + "|" + pacientes[paciente-1].apellido + "|" + pacientes[paciente-1].talla + "|" + pacientes[paciente-1].ultimacuenta.getTime() + "|" + pacientes[paciente-1].numMediciones );
        }
    }
    function db_guardarMedicion(paciente, tipoMedicion, valor)
    {
        if (typeof(Storage) !== undefined)
        {
            localStorage.setItem("paciente" + paciente + "med" + pacientes[paciente-1].numMediciones,Date.now() + "|" + tipoMedicion + "|" + valor);
        }
    }
    function db_cargarMediciones(paciente)
    {
        if (typeof(Storage) !== undefined)
        {
            if (pacientes[paciente-1].numMediciones > 0)
            {
                pacientes[paciente-1].mediciones = [];
                for (var i = 0; i < pacientes[paciente-1].numMediciones;i++)
                {
                    let med = localStorage.getItem("paciente" + paciente + "med" + (i+1));
                    let campos = med.split("|");
                    let medicion = {fecha: new Date(Number(campos[0])), tipo:campos[1], valor:campos[2] };
                    pacientes[paciente-1].mediciones.push(medicion);

                }
            }
        }
    }
    function db_deletePacientes()
    {
        if (typeof(Storage) !== undefined)
        {
            if (numPacientes > 0)
            {
                for (var i = 0; i < numPacientes; i++)
                {
                    if (pacientes[i].numMediciones > 0)
                    {
                        for (var j = 0;j < pacientes[i].numMediciones;j++)
                        {
                        localStorage.removeItem("paciente" + (i + 1) + "med" + (j + 1));
                        }
                    }
                    localStorage.removeItem("paciente"+(i+1));
                }
                localStorage.removeItem("numPacientes");
            }
            pacientes = [];
            numPacientes = 0;
            actualizarSelects();
        }

    }

function db_cargarPacientes()
{
    if (typeof(Storage) !== undefined)
    {
        // cargamos los pacientes.
        numPacientes = localStorage.getItem("numPacientes");
        if (!numPacientes)
        {
            numPacientes = 0;
        }

        if (numPacientes > 0)
        {
            for(var i = 0;i < numPacientes;i++)
            {
                let s = localStorage.getItem("paciente" + (i+1));
                if (s)
                {
                    let campos = s.split("|");
                    let paciente = { id:i+1,
                        nombre:campos[0],apellido:campos[1], talla:campos[2], ultimacuenta:new Date(Number(campos[3])), numMediciones:campos[4], mediciones:[]
                    }
                    pacientes.push(paciente);
                }
            }
        }
    }
}



