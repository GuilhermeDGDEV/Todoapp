import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyAqYKaNRtVm5BIy1H-6iSJIGsH5jRMwnMg",
    authDomain: "todolist-8feff.firebaseapp.com",
    projectId: "todolist-8feff",
    storageBucket: "todolist-8feff.appspot.com",
    messagingSenderId: "178807814369",
    appId: "1:178807814369:web:971dae4d76f6cbb88f9fa0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

var user = null;
const formLogin = document.querySelector('form');
const loginArea = document.querySelector('#login');
const logout = document.querySelector('#logout');
const containerLogado = document.querySelector('#container-login');

formLogin.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('[name=email]').value;
    const password = document.querySelector('[name=password]').value;
    login(email, password);
});

logout.addEventListener('click', e => {
    e.preventDefault();
    signOut(auth)
        .then(() => {
            alert('Deslogado')
            loginArea.style.display = 'block';
            containerLogado.style.display = 'none';
        })
        .catch(error => alert(error.message));
});

function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            user = userCredential.user;
            alert('Logado com sucesso!');
            loginArea.style.display = 'none';
            containerLogado.style.display = 'block';
            formLogin.reset();
        })
        .catch(error => alert(error.message));
}