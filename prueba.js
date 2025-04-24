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

let i = 0;
let puntuacion = 0;
let relegida = 0;
let A = []
const listapreguntas = [
    'Pregunta número 1',
    'Pregunta numero 2',
    'Pregunta número 3',
    'Pregunta numero 4',
    'Pregunta número 5',
    'Pregunta numero 6',
    'Pregunta número 7',
    'Pregunta numero 8',
    'Pregunta número 9',
    'Pregunta numero 10',
];
const listarespuestas = [
    ['respuesta 1','respuesta2','respuesta3','respuesta4'],
    ['respuesta 5','respuesta6','respuesta7','respuesta8'],
    ['respuesta 1','respuesta2','respuesta3','respuesta4'],
    ['respuesta 5','respuesta6','respuesta7','respuesta8'],
    ['respuesta 1','respuesta2','respuesta3','respuesta4'],
    ['respuesta 5','respuesta6','respuesta7','respuesta8'],
    ['respuesta 1','respuesta2','respuesta3','respuesta4'],
    ['respuesta 5','respuesta6','respuesta7','respuesta8'],
    ['respuesta 1','respuesta2','respuesta3','respuesta4'],
    ['respuesta 5','respuesta6','respuesta7','respuesta8'],
];
const valores = [
    [2,7,10,0],
    [2,7,10,0],
    [2,7,10,0],
    [2,7,10,0],
    [2,7,10,0],
    [2,7,10,0],
    [2,7,10,0],
    [2,7,10,0],
    [2,7,10,0],
    [2,7,10,0],
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
    <div class='respuesta uno'>${listarespuestas[i][0]}</div>
    <div class='respuesta dos'>${listarespuestas[i][1]}</div>
    <div class='respuesta tres'>${listarespuestas[i][2]}</div>
    <div class='respuesta cuatro'>${listarespuestas[i][3]}</div>
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
        <div class='subtitulofin'>La puntuacion media total es de <b>${Math.round(media)}</b> puntos.</div>
        <div class='subtitulofin comentario'></div>        
        <div class="barra fondo"></div>
        <div class="barra usuario"></div>
        <div class="barra media"></div>

        <div class="indicadorusuario"> Tú → </div>
        <div class="indicadormedia"> Media → </div>
        `
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
        'background-color': "#ffffff",
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
            document.querySelector('.uno').style.border = "2px solid white";
            document.querySelector('.dos').style.border = "2px solid rgba(0, 0, 0, 0)";
            document.querySelector('.tres').style.border = "2px solid rgba(0, 0, 0, 0)";
            document.querySelector('.cuatro').style.border = "2px solid rgba(0, 0, 0, 0)";

        }
        if(element.classList.contains('dos')){
            relegida = 2;
            document.querySelector('.uno').style.border = "2px solid rgba(0, 0, 0, 0)";
            document.querySelector('.dos').style.border = "2px solid white";
            document.querySelector('.tres').style.border = "2px solid rgba(0, 0, 0, 0)";
            document.querySelector('.cuatro').style.border = "2px solid rgba(0, 0, 0, 0)";
        }
        if(element.classList.contains('tres')){
            relegida = 3;
            document.querySelector('.uno').style.border = "2px solid rgba(0, 0, 0, 0)";
            document.querySelector('.dos').style.border = "2px solid rgba(0, 0, 0, 0)";
            document.querySelector('.tres').style.border = "2px solid white";
            document.querySelector('.cuatro').style.border = "2px solid rgba(0, 0, 0, 0)"
        }
        if(element.classList.contains('cuatro')){
            relegida = 4;
            document.querySelector('.uno').style.border = "2px solid rgba(0, 0, 0, 0)";
            document.querySelector('.dos').style.border = "2px solid rgba(0, 0, 0, 0)";
            document.querySelector('.tres').style.border = "2px solid rgba(0, 0, 0, 0)";
            document.querySelector('.cuatro').style.border = "2px solid white"
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




/*
var ref = firebase.database().ref("Respuestas"); // Reemplaza "tu_ruta" con la ubicación de tus datos
ref.orderByKey().limitToLast(1).get().then((snapshot) => {
  snapshot.forEach((childSnapshot) => {
    // Aquí puedes acceder a los datos del último elemento
    var ultimoElemento = childSnapshot.val();
    console.log("Último elemento:", ultimoElemento);
  });
}).catch((error) => {
  console.error("Error al obtener el último elemento:", error);
});*/

get(ref(database, `Respuestas/100/count`))
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