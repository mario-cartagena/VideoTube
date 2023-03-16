import { videos } from "./dataVideos.js";

console.log(videos);

//1. Capturamos el contenedor donde vamos a pintar todos los videos
const containerVideos = document.querySelector(".main__videos");
console.log(containerVideos);

//2. Construir una función que nos permita pintar los videos dentro de un elemento contenedor.
const printVideos = (container, videoList) => {
    //Vaciar el contenedor
    container.innerHTML = "";
    //Recorrer el array de personajes
    videoList.forEach(video => {
        container.innerHTML += `
        <article class="cardVideo">
            <figure>
                <img name=${video.id} src=${video.image}>
            </figure>
            <section class="cardInformation">
                <img src=${video.autorImage}>
                <div class="general">
                    <div>
                        <h3>${video.name}</h3>
                    </div>
                    <div class="general__info">
                        <span>${video.autorName}</span>
                        <span>${video.viewers} - ${video.date}</span>
                    </div>
                </div>
            </section>
        </article>
        `;
    });
};

//Escuhcmaos el evento DOMContentLoaded y cuando suene que pinte los videos
document.addEventListener("DOMContentLoaded", () => {
    printVideos(containerVideos, videos);
});