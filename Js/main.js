const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// Songs titles
const songs = [`NoSoyDicaprio`,`PorTi`,`Roto`];

// Keep track of songs
let songIndex = 0;

//Initially load song info DOM
loadSong(songs[songIndex]);

//Update song details
function loadSong(song){ // carga la lista de canciones
   
        title.innerText = song; 
        audio.src = `Audio/${song}.mp3`,
        cover.src =`Img/${song}.jpg`

}

function playSong(){
    musicContainer.classList.add(`play`); // crea la clase play, que tiene propiedades en stylos y en funciones a ejecutar
    playBtn.querySelector(`i.fas`).classList.remove(`fa-play`); // remueve la clase X para cambiar el icono 
    playBtn.querySelector(`i.fas`).classList.add(`fa-pause`);// agrega la clase X para cambiar el icono 
    audio.play() // ejecuta la cancion 


}

function pauseSong(){
    musicContainer.classList.remove(`play`); // remueve a clase play 
    playBtn.querySelector(`i.fas`).classList.add(`fa-play`); //agrega la clase X para cambiar el icono 
    playBtn.querySelector(`i.fas`).classList.remove(`fa-pause`);// remueve la clase X para cambiar el icono 
    audio.pause();
}

function prevSong(){
    songIndex--;    // le resta al indice uno 

    if(songIndex < 0){ // si indice en menor a 1 se le resta al indice de las canciones para q inicie en la ultima
        songIndex = songs.length -1;
    }

    loadSong(songs[songIndex]) // ejecutamos cargar lista enviando por parametro la lista con el indice
    playSong()
}
function nextSong(){
    songIndex++; // le suma uno al indice

    if(songIndex > songs.length - 1){   
        songIndex = 0;
    }

    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime/ duration)*100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e){ 
    const width = this.clientWidth;
    console.log(width)
    const clickX = e.offsetX;
    const duration = audio.duration;
s
    audio.currentTime = (clickX / width)* duration
}




// Event listener
playBtn.addEventListener(`click`, ()=>{
    const isPlaying = musicContainer.classList.contains(`play`);// evento que escucha un "click" en el btn play
    if(isPlaying){ // si la cancion esta corriendo, se ejecutara la pausa
        pauseSong();
    }else{
        playSong(); // sino se ejecutara play
    }

})

// Change songs events // eventos relacionados a los controles
prevBtn.addEventListener("click", prevSong); 
nextBtn.addEventListener("click", nextSong);


audio.addEventListener(`timeupdate`, updateProgress); // cuando vaya pasando la cancion, se ejecutara updateProgress

progressContainer.addEventListener("click",setProgress) // cuando se escuche "click" dentro de la barra de progreso, se ejecutara setProgress

audio.addEventListener(`ended`, nextSong)// cuando escuche que la cancion termine, se ejecuta la funcion nextSong




