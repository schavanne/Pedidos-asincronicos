window.onload = () => {
    let form = document.querySelector(".formulario");
    let btnEditar = document.querySelector(".botonEditar");
    let btnAgregar = document.querySelector(".botonAgregar");
    let botonBorrar = document.querySelector(".botonBorrar");
    let id = 58;
    //llamada de api traer Generos para llenar la lista de generos en el select
    fetch("http://localhost:3031/api/genres")
    .then((respuesta)=>{
        return respuesta.json();
    })
    .then((data)=>{
        //Creo una variable que empieza con una opcion placeholder(vacia)
        let generos = "<option value='-1' hidden>Elegir genero</option>";
        //recorro todo lo que me trae la api 
        data.data.forEach((data)=>{
            //voy poniendo en la variable generos una opcion por cada genero(1 option por cada iteracion)
            generos += `<option value='${data.id}'>${data.name}</option>`;
        })
        //lo pega adentro del select
        form.querySelector("#genre_id").innerHTML = generos;
    })

    //Llamada api para traer una pelicula, por defecto la que tiene el id = 6
    fetch("http://localhost:3031/api/movies/"+id)
    .then((respuesta)=>{
        return respuesta.json();
    })
    .then((data)=>{
        //Va insertando cada dato que viene de la pelicula de la api (id:6) en los inputs
        form.querySelector("#title").value = data.data.title;
        form.querySelector("#rating").value = data.data.rating;
        form.querySelector("#awards").value = data.data.awards;
        //Para la fecha la sacamos la hora 2022-03-21T00:00:00S -> 2022-03-21
        let release_date = data.data.release_date.split("T");
        form.querySelector("#release_date").value = release_date[0];

        form.querySelector("#length").value = data.data.length;
        //Traemos todas las opciones del select genero del formulario
        let generos = form.querySelector("#genre_id").options;
        //Convertimos en un array para poder usar foreach
        generos = Array.from(generos);
        //Recorremos cada option del select Genero
        generos.forEach((element,index)=>{
            //Comparamos la valor de la <option> actual == el genero id que viene de la api
            if(element.value == data.data.genre_id){
                //agarra el <option> que coincide y lo pone select 
                //para que ya venga seleccionado el genero apenas carga el html
                form.querySelector("#genre_id").selectedIndex = index;
            }
        })
        
    })


    //Capturamos cuando envia el formulario
    btnEditar.addEventListener("click",(event)=>{
        let data = {
            title:form.querySelector("#title").value,
            rating:form.querySelector("#rating").value,
            awards:form.querySelector("#awards").value,
            genre_id:form.querySelector("#genre_id").options[form.querySelector("#genre_id").selectedIndex].value,
            length:form.querySelector("#length").value,
            release_date:form.querySelector("#release_date").value,
        }
        //lo enviamos a la api con metodo PUT
        fetch(`http://localhost:3031/api/movies/update/${id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}, 
            body: JSON.stringify(data)
        }).then(res => {
            //Si funciona , responde con esto.
            console.log("Request complete! response:", res);
        });
    })
    btnAgregar.addEventListener("click",(event)=>{
        let data = {
            title:form.querySelector("#title").value,
            rating:form.querySelector("#rating").value,
            awards:form.querySelector("#awards").value,
            genre_id:form.querySelector("#genre_id").options[form.querySelector("#genre_id").selectedIndex].value,
            length:form.querySelector("#length").value,
            release_date:form.querySelector("#release_date").value,
        }
        fetch(`http://localhost:3031/api/movies/create/`, {
            method: "POST",
            headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}, 
            body: JSON.stringify(data)
        }).then(res => {
            console.log("Request complete! response:", res);
        });
    })
    botonBorrar.addEventListener("click",(event)=>{
        
    fetch(`http://localhost:3031/api/movies/delete/${id}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}, 
        }).then(res => {
            console.log("Request complete! response:", res);
        });
    });
}