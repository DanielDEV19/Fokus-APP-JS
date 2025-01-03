const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const titulo = document.querySelector('.app__title');
const banner = document.querySelector('.app__image');
const botones = document.querySelectorAll('.app__card-button');
const inputMusicaEnfoque = document.querySelector('#alternar-musica');
const textoIniciarPausar = document.querySelector('#start-pause span')
const icoPlayPause = document.querySelector('.app__card-primary-butto-icon')
const tiempoEnPantalla = document.querySelector('#timer')

const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const musicaPlay = new Audio('./sonidos/play.wav');
const musicaFin = new Audio('./sonidos/beep.mp3');
const musicaPause = new Audio('./sonidos/pause.mp3');

const botonIniciarPausar = document.querySelector('#start-pause')

let tiempoTranscurridoEnSegundos= 1500;   
let idIntervalo = null;

musica.loop = true;
musica.volume -=0.7;

inputMusicaEnfoque.addEventListener('change', () =>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();

    }
})

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500;
    CambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
    mostrarTiempo();
})

botonCorto.addEventListener('click', () => {
    CambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
    tiempoTranscurridoEnSegundos = 300;
    mostrarTiempo();
})

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900;
    CambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
    mostrarTiempo();
})

function CambiarContexto(contexto){

    html.setAttribute('data-contexto' , contexto );
    banner.setAttribute('src', `./imagenes/${contexto}.png`);

    botones.forEach(function(contexto){
        contexto.classList.remove('active');
    })

    mostrarTiempo();
    switch (contexto) {
        case "enfoque":
            titulo.innerHTML=`
            Optimiza tu productividad,<br>
                <strong class=".app__title-strong">¡Haz una pausa corta!</strong>
                `
            break;
        case "descanso-corto":
            titulo.innerHTML=`
            ¿Qué tal tomar un respiro?,<br>
                <strong class=".app__title-strong">sumérgete en lo que importa.</strong>
                `
            break;
        case "descanso-largo":
            titulo.innerHTML=`
            Hora de volver a la superficie,<br>
                <strong class=".app__title-strong">Haz una pausa larga.</strong>
                `
            break;
        default:
            break;
    }
}

const cuentaRegresiva = () => {
    if (tiempoTranscurridoEnSegundos <= 0){
        musicaFin.play();
        reiniciar()
        return;
    }
    tiempoTranscurridoEnSegundos -=1;
    textoIniciarPausar.textContent = "Pausar";
    icoPlayPause.setAttribute('src', `./imagenes/pause.png`)
    mostrarTiempo()
}

botonIniciarPausar.addEventListener('click', iniciarPausar)

function iniciarPausar(){
    if(idIntervalo){
        musicaPause.play();
        reiniciar();
        return;
    }
    musicaPlay.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000);

}

function reiniciar(){
    clearInterval(idIntervalo);
    textoIniciarPausar.textContent = "Comenzar";
    icoPlayPause.setAttribute('src', `./imagenes/play_arrow.png`)
    idIntervalo = null;
}

function mostrarTiempo(){
    const tiempo =  new Date(tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormateado  = tiempo.toLocaleTimeString('es-PE', {minute: '2-digit', second: '2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}
mostrarTiempo()
