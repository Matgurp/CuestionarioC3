

let menu = document.getElementById('menu');
let titulo = document.getElementsByClassName("titulo");
let subtitulo = document.getElementsByClassName("subtitulo");
let btnempezar = document.getElementById("btnempezar");

let i = 0;
let puntuacion = 0;
let relegida = 0;
const listapreguntas = [
    'Pregunta número 1',
    'Pregunta numero 2',
];
const listarespuestas = [
    ['respuesta 1','respuesta2','respuesta3','respuesta4'],
    ['respuesta 5','respuesta6','respuesta7','respuesta8'],
];
const valores = [
    [2,7,10,0],
    [2,7,10,0]
]

btnempezar.addEventListener("mousedown",function(){
    animate(btnempezar,
        {
            scale: 1.2,
            duration: 50,
            ease: "linear"
        })
    
})
btnempezar.addEventListener("mouseup",function(){

    animate(btnempezar,
        {
            scale: 0,
            duration: 200,
            ease: "inQuad"
        }
    )
    animate(titulo,
        {
            scale: 0,
            duration: 200,
            ease: "inQuad"
        }
    )
    animate(subtitulo,
        {
            scale: 0,
            duration: 200,
            ease: "inQuad"
        }
    )
    animate('path',{
        fill: '#ffffff',
        delay: 300,
        duration: 1000,
    })
    animate('body',{
        'background-color': "#1d1d1d",
        delay: 300,
        duration: 1000,
        onComplete: cambiarpregunta
    })
    
})





function cambiarpregunta() {

    menu.innerHTML= 
    `<h1 class="pregunta">${listapreguntas[i]}</h1>
    <div class='respuesta 1' onclick='relegida = 1'>${listarespuestas[i][0]}</div>
    <div class='respuesta 2' onclick='relegida = 3''>${listarespuestas[i][1]}</div>
    <div class='respuesta 3' onclick='relegida = 4''>${listarespuestas[i][2]}</div>
    <div class='respuesta 4' onclick='relegida = 2''>${listarespuestas[i][3]}</div>
    <div class='botonsiguientepregunta'>Siguiente pregunta...</div>`;

    animate(document.getElementsByClassName('pregunta'),{
        opacity: '0%',
        duration: 800
    })
    animate(document.getElementsByClassName('respuesta'),{
        opacity: '0%',
        duration: 800
    })
    animate(document.getElementsByClassName('botonsiguientepregunta'),{
        opacity: '0%',
        duration: 800,
    })


    animate(document.getElementsByClassName('pregunta'),{
        opacity: '100%',
        duration: 800
    })
    animate(document.getElementsByClassName('respuesta'),{
        opacity: '100%',
        delay: 800,
        duration: 800
    })
    animate(document.getElementsByClassName('botonsiguientepregunta'),{
        opacity: '100%',
        delay: 2000,
        duration: 1000
    })
};

function querespuestahasidoelegida (e) {
    let element = e.target;
    if(element.classList.contains('respuesta')) {
        console.log('respuesta')
        if(element.classList.contains('1')){
            console.log('1')
            relegida = 1;
        }
        if(element.classList.contains('2')){
            relegida = 2;
        }
        if(element.classList.contains('3')){
            relegida = 3;
        }
        if(element.classList.contains('4')){
            relegida = 4;
        }
    }
};
document.addEventListener('click',querespuestahasidoelegida);

function pulsasiguientepregunta(e) {
    let element = e.target;
    if(element.classList.contains("botonsiguientepregunta")){
        console.log(relegida)
        if (relegida != 0) {
            puntuacion += valores[i][relegida-1]
            console.log(puntuacion)
            i += 1
            
            cambiarpregunta()
        }
    }
};

document.addEventListener('click',pulsasiguientepregunta);
