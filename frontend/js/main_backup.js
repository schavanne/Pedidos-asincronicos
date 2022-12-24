function favorita(element,id){
  let listaFavoritas = JSON.parse(localStorage.getItem("favoritas")) ?? [];
    if(!listaFavoritas.includes(id)){
      listaFavoritas.push(id);
      localStorage.setItem("favoritas",JSON.stringify(listaFavoritas));
      element.classList.add("disabled");
      
    }
}
window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  
  // Aqui debemos agregar nuestro fetch
  let  lista = document.getElementById("lista");
  fetch("http://localhost:3031/api/movies")
  .then((respuesta)=>{
      return respuesta.json();
  })
  .then((peliculas)=>{
      let filas = "";

      let data = peliculas.data;
      let listaFavoritas = JSON.parse(localStorage.getItem("favoritas")) ?? [];
      data.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;
        const estrella = document.createElement("i");
        if(listaFavoritas.includes(movie.id)){
          estrella.classList.add("fa-solid","fa-star","fa-2x","disabled");
        }
        else{
          estrella.classList.add("fa-solid","fa-star","fa-2x");
          estrella.setAttribute("onClick","favorita(this,"+movie.id+")");
        }
        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);
        card.appendChild(estrella)
        
      });
  })


  /** Codigo que debemos usar para mostrar los datos en el frontend
    let data = peliculas.data;

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
    });
  */
};
