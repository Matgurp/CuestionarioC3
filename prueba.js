import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js';
import { getDatabase, ref, child, runTransaction, get } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyBIHkL6KmU314P53hiAxanb0Gb5QMXnT5E",
    authDomain: "cuestionarioc3.firebaseapp.com",
    projectId: "cuestionarioc3",
    storageBucket: "cuestionarioc3.firebasestorage.app",
    messagingSenderId: "274948972390",
    appId: "1:274948972390:web:ccfda1f87d6c5809e4f2a7",
    measurementId: "G-4E8Q6W7W91",
    databaseURL: "https://cuestionarioc3-default-rtdb.europe-west1.firebasedatabase.app/"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


let menu = document.getElementById('menu');
let titulo = document.getElementsByClassName("titulo");
let subtitulo = document.getElementsByClassName("subtitulo");
let btnempezar = document.getElementById("btnempezar");
let txtpuntos = document.getElementById("txtpuntos");

let bounds = null

let i = 0;
let puntuacion = 0;
let relegida = 0;
let A = []
const listapreguntas = [
    '¿Cuánta agua crees que se ahorra al cerrar el grifo mientras te cepillas los dientes?',
    '¿Cómo te desplazas habitualmente a distancias cortas?',
    '¿Qué haces con las bolsas de plástico del supermercado?',
    '¿Con qué frecuencia compras ropa nueva?',
    '¿Cuántas horas al día utilizas el móvil?',
    '¿Te sueles interesar por el origen de los alimentos que compras?',
    '¿Qué haces con los aparatos electrónicos que ya no usas (como móviles, cargadores, etc.)?',
    '¿Cuántas veces a la semana comes productos ultra procesados (refrescos, comida rápida…)?',
    '¿Cómo eliges la temperatura del agua cuando te duchas?',
    '¿Qué tipo de alimentación sigues con más frecuencia?',
];
const listarespuestas = [
    ['1-2 litros','4-6 litros','10-12 litros','No se ahorra nada'],
    ['Coche privado','Bicicleta o caminar','Transporte público','Motocicleta'],
    ['Tirarlas al contenedor amarillo','Reutilizarlas para basura','Usar bolsas de tela siempre','Quemarlas en casa'],
    ['1 vez al mes','1 vez por semana','3 veces al mes','Menos de 1 vez al mes'],
    ['Entre 4 y 5 horas','1 hora o menos','Entre 2 y 3 horas','6 horas o más '],
    ['Siempre lo miro y trato de comprar alimentos locales','Sólo cuando me acuerdo, aunque a veces lo dejo pasar','Lo he hecho en casos muy excepcionales','Nunca me he interesado por ello'],
    ['Los tiro a la basura','Los llevo a un punto limpio o de reciclaje','Los guardo sin usarlos','Se los doy a alguien que los necesita'],
    ['Todos los días','3 a 4 veces por semana','1 a 2 veces por semana','Casi nunca o nunca'],
    ['Siempre muy caliente, aunque haya que esperar bastante','Templada, para evitar gastar demasiada energía','Fría, sin importar el clima','No me fijo, uso la que salga'],
    ['Basada mayormente en vegetales y productos locales','Mixta, pero trato de reducir la carne','Rica en carne y productos procesados','Como lo que sea, sin pensar mucho en el impacto '],
];
const valores = [
    [3,10,0,0],
    [0,10,7,3],
    [5,7,10,0],
    [7,0,5,10],
    [3,10,6,0],
    [10,5,2,0],
    [0,10,3,7],
    [0,3,7,10],
    [2,8,10,3],
    [10,7,2,0],
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
    animate('.floresizq',{
        translateX: "-2dvw",
        duration: 1000,
    })
    animate('.floresdcha',{
        translateX: "3dvw",
        duration: 1000,
    })
    animate('body',{
        'background-color': "rgb(21, 92, 65)",
        delay: 300,
        duration: 1000,
        onComplete: cambiarpregunta
    })
    
})





function cambiarpregunta() {

    menu.innerHTML= 
    `<h1 class="pregunta">${listapreguntas[i]}</h1>
    <div class="respuestas-container">
    <div class='respuesta uno'>${listarespuestas[i][0]}</div>
    <div class='respuesta dos'>${listarespuestas[i][1]}</div>
    <div class='respuesta tres'>${listarespuestas[i][2]}</div>
    <div class='respuesta cuatro'>${listarespuestas[i][3]}</div>
    </div>
    <div class='botonsiguientepregunta'>Siguiente pregunta...</div>`;

    let b1 = document.querySelector('.uno')
    let b2 = document.querySelector('.dos')
    let b3 = document.querySelector('.tres')
    let b4 = document.querySelector('.cuatro')


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

function fadeout() {
    animate(document.getElementsByClassName('pregunta'),{
        opacity: 0,
        duration: 500
    })
    animate(document.getElementsByClassName('respuesta'),{
        opacity: 0,
        duration: 500
    })
    animate(document.getElementsByClassName('botonsiguientepregunta'),{
        opacity: 0,
        duration: 500,
        onComplete: cambiarpregunta
    })
};

function finpreguntas() {
    let media = 0
    let sumapuntuaciones = 0
    let totalcount = 0
    let puntuacionaprox = ''
    puntuacion = `${puntuacion}`
    let puntaproxfin = puntuacion.length-1
    if (puntuacion[puntaproxfin]<5) {
        puntuacionaprox = `${puntuacion.slice(0,puntaproxfin)}0`
    } else {
        puntuacionaprox = `${puntuacion.slice(0,puntaproxfin)}5`
    }

    console.log(puntuacion)
    console.log(puntuacionaprox)
    const puntuacionRef = ref(database, `Respuestas/${puntuacionaprox}/count`);
    const totalRef = ref(database, `Respuestas/Total/count`);
    const sumapuntuacionesRef = ref(database, `Respuestas/SumaPuntuaciones/count`);

    Promise.all([get(sumapuntuacionesRef), get(totalRef)])
    .then(([snapshot1, snapshot2]) => {
      if (snapshot1.exists() && snapshot2.exists()) {
        const value1 = snapshot1.val();
        const value2 = snapshot2.val();
  
        // Perform your calculation here
        media = value1 / value2;
  
        console.log("Result of calculation:", media);
        menu.innerHTML= 
        `
        <h1 class="titulofin">¡Los resultados!</h1>
        <div class='subtitulofin'>Has conseguido <b>${puntuacion}</b> puntos. ¡Felicidades!</div>
        <div class='subtitulofin'>La puntuación media total es de <b>${Math.round(media)}</b> puntos.</div>
        <div class='subtitulofin' id='comentario'></div>        
        <div class="barra fondo"></div>
        <div class="barra usuario"></div>
        <div class="barra media"></div>

        <div class="indicadorusuario"> Tú → </div>
        <div class="indicadormedia"> Media → </div>
        `
        if (puntuacion>media) {
            document.getElementById('comentario').innerHTML=`¡Eso son ${puntuacion-Math.round(media)} puntos más que la media total!`
        } else {
            document.getElementById('comentario').innerHTML=`¡Eso son ${Math.round(media)-puntuacion} puntos menos que la media total!`
        }
        animate(".usuario",{
            height: `${70*(puntuacion/100)}dvh`,
            duration: 1500,
            ease: "out(3)"});
        
        animate(".indicadorusuario",{
            height: `${70*(puntuacion/100)}dvh`,
            opacity: "100%",
            duration: 1500,
            ease: "out(3)"});
        
        animate(".media",{
            height: `${70*(media/100)}dvh`,
            delay: 1500,
            duration: 1000,
            ease: "out(3)"});

        animate(".indicadormedia",{
            height: `${70*(media/100)}dvh`,
            opacity: "100%",
            delay: 1500,
            duration: 1000,
            ease: "out(3)"});
        


      } else {
        console.log("One or both data paths do not exist.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });


    get(puntuacionRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
        console.log(`Personas: ${snapshot.val()}`);
        } else {
        console.log("No data available");
        }
    })
    .catch((error) => {
        console.error(error);
    });

    get(sumapuntuacionesRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
        sumapuntuaciones = 6969;
        } else {
        sumapuntuaciones = 4242;
        }
    })
    .catch((error) => {
        console.error(error);
    });

    get(totalRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
        totalcount = 69;
        } else {
        totalcount = 42;
        }
    })
    .catch((error) => {
        console.error(error);
    });

    runTransaction(puntuacionRef, (currentValue) => {
        return (currentValue || 0) + 1;
        })
        .then((transactionResult) => {
        if (!transactionResult.committed) {
            console.log("Transaction not committed")
        } else {
            console.log("Transaction committed")
        }
        })
        .catch((error) => {
        console.log("Transaction failed: ", error);
        });

    runTransaction(totalRef, (currentValue) => {
        return (currentValue || 0) + 1;
        })
        .then((transactionResult) => {
        if (!transactionResult.committed) {
            console.log("Transaction not committed")
        } else {
            console.log("Transaction committed")
        }
        })
        .catch((error) => {
        console.log("Transaction failed: ", error);
        });

    runTransaction(sumapuntuacionesRef, (currentValue) => {
        return (Number(currentValue) || 0) + Number(puntuacion);
        })
        .then((transactionResult) => {
        if (!transactionResult.committed) {
            console.log("Transaction not committed")
        } else {
            console.log("Transaction committed")
        }
        })
        .catch((error) => {
        console.log("Transaction failed: ", error);

    });
    animate(document.getElementsByClassName('pregunta'),{
        opacity: 0,
        duration: 500
    })
    animate(document.getElementsByClassName('respuesta'),{
        opacity: 0,
        duration: 500
    })
    animate(document.getElementsByClassName('botonsiguientepregunta'),{
        opacity: 0,
        duration: 500,
    })
    animate('path',{
        fill: '#262626',
        duration: 1000,
    })
    animate('body',{
        'background-color': "#d9e7eb",
        duration: 1000, 
    })



    menu.innerHTML= 
    `<h1 class="titulo">Tu puntuación</h1>
    <div class='subtitulo'>Has conseguido <b>${puntuacion}</b> puntos. ¡Felicidades!</div>
    `
}

function querespuestahasidoelegida (e) {
    let element = e.target;
    if(element.classList.contains('respuesta')) {
        if(element.classList.contains('uno')){
            relegida = 1;
            document.querySelector('.uno').style.borderColor = "white";
            document.querySelector('.dos').style.borderColor = "#42a36bff";
            document.querySelector('.tres').style.borderColor = "#42a36bff";
            document.querySelector('.cuatro').style.borderColor = "#42a36bff";

            bounds = document.querySelector('.uno').getBoundingClientRect();

        }
        if(element.classList.contains('dos')){
            relegida = 2;
            document.querySelector('.uno').style.borderColor = "#42a36bff";
            document.querySelector('.dos').style.borderColor = "white";
            document.querySelector('.tres').style.borderColor = "#42a36bff";
            document.querySelector('.cuatro').style.borderColor = "#42a36bff";

            bounds = document.querySelector('.dos').getBoundingClientRect();
        }
        if(element.classList.contains('tres')){
            relegida = 3;
            document.querySelector('.uno').style.borderColor = "#42a36bff";
            document.querySelector('.dos').style.borderColor = "#42a36bff";
            document.querySelector('.tres').style.borderColor = "white";
            document.querySelector('.cuatro').style.borderColor = "#42a36bff"

            bounds = document.querySelector('.tres').getBoundingClientRect();
        }
        if(element.classList.contains('cuatro')){
            relegida = 4;
            document.querySelector('.uno').style.borderColor = "#42a36bff";
            document.querySelector('.dos').style.borderColor = "#42a36bff";
            document.querySelector('.tres').style.borderColor = "#42a36bff";
            document.querySelector('.cuatro').style.borderColor = "white";

            bounds = document.querySelector('.cuatro').getBoundingClientRect();
        }
    }
};

document.addEventListener('click',querespuestahasidoelegida);

function pulsasiguientepregunta(e) {
    let element = e.target;
    if(element.classList.contains("botonsiguientepregunta")){
        console.log(relegida)
        if (relegida != 0) {
            


            txtpuntos.innerHTML = `+${valores[i][relegida-1]}`
            txtpuntos.style.top = bounds.top + (bounds.height/2) + "px"
            txtpuntos.style.left = bounds.left + (bounds.width/2) + "px"

            animate(txtpuntos,{
                scale: [1, 1.5],
                opacity: [100, 0],
                duration: 1000,
                ease: "out(3)",
            })

            puntuacion += valores[i][relegida-1]
            A.push(relegida)
            relegida = 0
            console.log(puntuacion)
            console.log(i)

            if (i < 9) {
            i += 1
            fadeout()
            } else {
            finpreguntas()
            }
        }

    }
};

document.addEventListener('click',pulsasiguientepregunta);


