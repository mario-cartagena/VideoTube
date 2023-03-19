import { videos } from "./dataVideos.js";

console.log(videos)
//Escuchar el click de la imagen del logo de la página para que redireccione a la página principal.
const logo = document.querySelector(".header__image");
logo.addEventListener("click", () => {
  //Nos sirve para redireccionar una página a otra.
  window.location.href = "../index.html";
});

//Escuchamos el form
const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const formChildren = Array.from(form.children);
    //Traigo un arreglo con los campos inputs y el select necesarios.
    const arrayCampos = formChildren.filter(
        (item) => item.localName === "input" || item.localName === "select"
    );
    // console.log(arrayCampos);

    const newVideo = {
        name: "",
        video: "",
        autorImage: "",
        autorName: "",
        image: "",
        viewers: "",
        date: "",
        category: ""
    };

    for (const key in newVideo) {
        if(typeof newVideo[key] === "object"){
            for(const propertyName in newVideo[key]){
                const input = arrayCampos.find(item => item.id === propertyName);
                newVideo[key][propertyName] = input.value;
            }
        }else{
            const input = arrayCampos.find(item => item.id === key);
            newVideo[key] = input.value;
        }
    }
    console.log(newVideo);

    const validarCampos = validateFields(newVideo);
    if(validarCampos){
        newVideo.id = videos.length + 1;
        videos.push(newVideo);
    }
    console.log(videos);
});

const validateFields = (objetoVideo) => {
    let camposVacios = "";
    for (const key in objetoVideo) {
        if(typeof objetoVideo[key] === "object"){
            for (const propertyName in objetoVideo[key]) {
                const valueProperty = objetoVideo[key][propertyName];
                camposVacios += !valueProperty ? `${propertyName}` : "";
            }
        }else{
            const valueProperty = objetoVideo[key];
            camposVacios += !valueProperty ? `${key}` : "";
        }
    }
    if(camposVacios){
        alert(`Faltan campos por agregar: ${camposVacios}`);
        return false;
    }else{
        return true;
    }
}