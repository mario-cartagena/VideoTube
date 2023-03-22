import { videos } from "./dataVideos.js";

//Escuchar el click de la imagen del logo de la página para que redireccione a la página principal.
const logo = document.querySelector(".header__image");
logo.addEventListener("click", () => {
  //Nos sirve para redireccionar una página a otra.
  window.location.href = "../index.html";
});

const listaVideos = JSON.parse(sessionStorage.getItem("videos")) || videos;

//Se agrega la información deseada del video: 1. Video, 2. Título, 3. Imagen del Canal, 4. Vistas y fecha, 5. Videos Sugeridos
const showInfoVideo = (container, video) => {
  const contenedorIFrame = document.querySelector(".container__iframe");

  //Creamos el elemento iframe
  const iframe = document.createElement("iframe");
  //Se agregan clases para darle estilos al iframe
  iframe.classList.add("iframe");
  //Actualizamos el src
  iframe.setAttribute("src", `${video.video}?autoplay=1`);
  iframe.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  );
  contenedorIFrame.appendChild(iframe);

  //Agregar el video al contenedor
  container.appendChild(contenedorIFrame);

  // Titulo, imagen del canal, nombre del canal, fecha y vistas.
  const datosAdicionales = document.createElement("article");
  datosAdicionales.classList.add("container__datos");
  datosAdicionales.innerHTML = 
  `
  <figure>
    <img src=${video.autorImage} alt=${video.name}>
  </figure>
  <div class="container__informacion">
  <div id="container_title">
    <h1>${video.name}</h1>
    </div>
    </span> <span>${video.viewers} - ${video.date}</span>
  </div> 
  `;
  container.appendChild(datosAdicionales);

  for (const key in video) {
    console.log(key, "----> ", video[key]);
  }
};

const printVideosSuggested = (
  contenedorVideosSugeridos,
  videoList,
  idVideo
) => {
  //1. Creamos el contenedor padre de la lista de videos sugeridos
  const sectionVideos = document.createElement("section");
  sectionVideos.classList.add("container__sugeridos");

  //Creamos el h1 para el apartado de videos sugeridos
  const titleVideoSugeridos = document.createElement("h2");
  titleVideoSugeridos.classList.add("title_sugerido");
  titleVideoSugeridos.innerHTML = "Videos Sugeridos";
  sectionVideos.appendChild(titleVideoSugeridos);

  //Necesitamos el array de video sugeridos: Todos los videos exceptuando el que se está repoduciendo
  const videosSugeridos = videoList.filter((item) => item.id !== idVideo);
  console.log(videosSugeridos);
  //Recorremos el array de videos sugeridos y mostramos
  videosSugeridos.forEach((element) => {
    sectionVideos.innerHTML += `
      <article class="cardVideo">
      <figure class="cardVideo__figure"><img data-card="cards" name=${element.id} img class="cardVideo__img" src=${element.image} alt=${element.name} /></figure>
      <section class="section">
          <div class="section__title">
            <h3 data-card="cards" name=${element.id} class="section__title">${element.name}</h3>
          </div>
          <div class="section__info">
              <span data-card="cards" name=${element.id}>${element.autorName}</span>
              <span data-card="cards" name=${element.id}>${element.viewers} - ${element.date}</span>
          </div>
      </section>
    </article>
      `;
  });
  contenedorVideosSugeridos.appendChild(sectionVideos);
};

document.addEventListener("DOMContentLoaded", () => {
  //Capturamos el id del video desde el session o localStorage
  const idVideoStg = JSON.parse(sessionStorage.getItem("idVideo")) || 0;
  const idVideo = Number(idVideoStg);
  console.log(idVideo);

  //Buscamos el video que corresponda con el id
  const video = listaVideos.find((item) => item.id === idVideo);
  const containerVideo = document.querySelector(".container");
  const containerVideoActual = document.querySelector(".container__actual");
  showInfoVideo(containerVideoActual, video);
  printVideosSuggested(containerVideo, listaVideos, idVideo);
});

