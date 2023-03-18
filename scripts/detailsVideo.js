import { videos } from "./dataVideos.js";

//Escuchar el click de la imagen del logo de la página para que redireccione a la página principal.
const logo = document.querySelector(".header__image");
logo.addEventListener("click", () => {
  //Nos sirve para redireccionar una página a otra.
  window.location.href = "../index.html";
});



//Se agrega la información deseada del video: 1. Video, 2. Título, 3. Imagen del Canal, 4. Vistas y fecha, 5. Videos Sugeridos
const showInfoVideo = (container, video) => {
  //1. Video
  //Creamos el elemento iframe
  const iframe = document.createElement("iframe");
  //Se agregan clases para darle estilos al iframe
  iframe.classList.add("playVideo");
  //Actualizamos el src
  iframe.setAttribute("src", `${video.video}?autoplay=1`);
  iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
  //Agregar el video al contenedor
  container.appendChild(iframe);

  //Inserto la otra información
  const list = document.createElement("ul");
  list.classList.add("main__list");

  for (const key in video) {
    console.log(key, "----> ", video[key]);
  }

};


const printVideosSuggested = (contenedorVideosSugeridos, videoList, idVideo) => {
   //1. Creamos el contenedor padre de la lista de videos sugeridos
   const sectionVideos = document.createElement("section");
   sectionVideos.classList.add("contenedorVideos");

   //Necesitamos el array de video sugeridos: Todos los videos exceptuando el que se está repoduciendo
   const videosSugeridos = videoList.filter(item => item.id !== idVideo);
   console.log(videosSugeridos)
   //Recorremos el array de videos sugeridos y mostramos
   videosSugeridos.forEach(element => {
      sectionVideos.innerHTML += `
      <article class="cardVideo">
      <figure><img src=${element.image} alt=${element.name} /></figure>
      <section>
          <h3 class="section__title">${element.name}</h3>
          <div class="general__info">
              <span>${element.autorName}</span>
              <span>${element.viewers} - ${element.date}</span>
          </div>
      </section>
    </article>
      `;
   });
   contenedorVideosSugeridos.appendChild(sectionVideos);
};

document.addEventListener('DOMContentLoaded', () => {
  //Capturamos el id del video desde el session o localStorage
  const idVideoStg = JSON.parse(sessionStorage.getItem("idVideo")) || 0;
  const idVideo = Number(idVideoStg);
  console.log(idVideo);

  //Buscamos el video que corresponda con el id
  const video = videos.find(item => item.id === idVideo);
  const containerVideo = document.querySelector(".containerInfoVideo");
  showInfoVideo(containerVideo, video);
  printVideosSuggested(containerVideo, videos, idVideo);

});