import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
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