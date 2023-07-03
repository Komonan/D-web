// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCS_A0CVcb2uWCXBewSKCgWzWZjYKWuYss",
    authDomain: "registroweb-9b91b.firebaseapp.com",
    projectId: "registroweb-9b91b",
    storageBucket: "registroweb-9b91b.appspot.com",
    messagingSenderId: "710871734990",
    appId: "1:710871734990:web:34b5ca6c4c8533a659ce9f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

//LLAMANDO ELEMENTOS HTML
let btnregistrar = document.getElementById('btnregistrar');
let btningresar = document.getElementById('btningresar');
let contenidodelaweb = document.getElementById('contenidodelaweb');
let formulario = document.getElementById('formulario');
const btngoogle = document.getElementById('btngoogle');
const btnfacebook = document.getElementById('btnfacebook');

//funcion registrar
btnregistrar.addEventListener('click',()=> {
    let email = document.getElementById('txtemail').value;
    let password = document.getElementById('txtpassword').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            console.log('inicio de sesion correcta')
            cargarJSON();
            contenidodelaweb.classList.replace('ocultar','mostrar')
            formulario.classList.replace('mostrar','ocultar')
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(error - message)
            // ..
        });
})

//funcion ingresar

btningresar.addEventListener('click',()=>{
let email = document.getElementById('txtemail').value;
let password = document.getElementById('txtpassword').value;

firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log ("inicio sesion correctamente");
    cargarJSON();
    contenidodelaweb.classList.replace('ocultar','mostrar')
    formulario.classList.replace('mostrar','ocultar')
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
})
//funcion cerrar sesion
btncerrar.addEventListener('click',()=> {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log ("cierre de3 sesion correctamente");
        contenidodelaweb.classList.replace('mostrar','ocultar')
        formulario.classList.replace('ocultar','mostrar')
      }).catch((error) => {
        // An error happened.
        console.log ("error con el cierre de sesion")
      });
})
//funcion estado de usuario
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      cargarJSON();
      contenidodelaweb.classList.replace('ocultar','mostrar')
      formulario.classList.replace('mostrar','ocultar')
    } else {
        contenidodelaweb.classList.replace('mostrar','ocultar')
        formulario.classList.replace('ocultar','mostrar')
    }
  });
  //funcion loggin con google
  btngoogle.addEventListener('click',()=>{
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    console.log("inicio sesion con google correctamente")
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log ("error de loggin con google")
  });
  })
//funcion con facebook
btnfacebook.addEventListener('click',()=>{
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    var user = result.user;
    var accessToken = credential.accessToken;
    console.log ("inicio con facebook correctamente")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("error al iniciar con facebook")
  });
})
//funcion cargar jeison
function cargarJSON (){
  fetch('archivo.json')
  .then(function(res){
    return res.json();
  })
  .then((data) =>{
    console.log(data);
    let html = '';
    data.forEach((producto) => {
      html += `
      
      <img src="${producto.img}" alt=""  ">
      <P class="rojo">${producto.nombre}</p>
      <P class="blue">${producto.tipo}</p>

      `;
    });
    document.getElementById('resultado').innerHTML = html;
    })
}