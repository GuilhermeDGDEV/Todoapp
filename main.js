import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { getFirestore, collection, addDoc, query, where, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyAqYKaNRtVm5BIy1H-6iSJIGsH5jRMwnMg",
    authDomain: "todolist-8feff.firebaseapp.com",
    projectId: "todolist-8feff",
    storageBucket: "todolist-8feff.appspot.com",
    messagingSenderId: "178807814369",
    appId: "1:178807814369:web:971dae4d76f6cbb88f9fa0"
};

// Firebase variables
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Front variables
let user = null;
const formLogin = document.querySelector('#form-login');
const formCadastroTarefa = document.querySelector('#form-cadastro-tarefa');
const loginArea = document.querySelector('#login');
const logout = document.querySelector('#logout');
const containerLogado = document.querySelector('#container-login');

// Events
formLogin.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('[name=email]').value;
    const password = document.querySelector('[name=password]').value;
    
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => user = userCredential.user)
        .catch(error => alert(error.message));
});

formCadastroTarefa.addEventListener('submit', e => {
    e.preventDefault();
    const horario = document.querySelector('#form-cadastro-tarefa [name=datetime]').value;
    const tarefa = document.querySelector('#form-cadastro-tarefa [name=tarefa]').value;
    if (validaFormTarefa(horario, tarefa)) {
        addDoc(collection(db, 'Tarefas'), { horario, tarefa, userId: user.uid });
        alert('Tarefa adicionada!');
        formCadastroTarefa.reset();
    }
})

logout.addEventListener('click', e => {
    e.preventDefault();
    signOut(auth)
        .then(() => {
            loginArea.style.display = 'block';
            containerLogado.style.display = 'none';
        })
        .catch(error => alert(error.message));
});

onAuthStateChanged(auth, async res => {
    if (res) {
        user = res;
        loginArea.style.display = 'none';
        containerLogado.style.display = 'block';
        formLogin.reset();

        const q = query(collection(db, 'Tarefas'), where('userId', '==', user.uid));
        onSnapshot(q, querySnapshot => {
            let list = document.querySelector('#tarefas-usuario ul');
            querySnapshot.forEach(d => list.innerHTML += `<li>${d.data().tarefa}</li>`);
        });
    }
});

function validaFormTarefa(horario, tarefa) {
    if (!tarefa) {
        alert('Informe a tarefa!');
        return false;
    }

    if (!horario) {
        alert('Informe a data e hora da tarefa!');
        return false;
    }

    const agora = new Date().getTime();
    if (agora > new Date(horario).getTime()) {
        alert('Não é possível salvar uma tarefa no passado!');
        return false;
    }

    return true;
}