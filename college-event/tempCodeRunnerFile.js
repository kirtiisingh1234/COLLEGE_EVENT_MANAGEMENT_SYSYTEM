// Firebase App
import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

// Firebase Authentication
import { getAuth } 
from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

// Cloud Firestore
import { getFirestore } 
from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


const firebaseConfig = {

    apiKey: "AIzaSyBimd7eFJP4yiTnJebFU-Uj3OCSDP0QV7M",

    authDomain:
        "college-event-management-44000.firebaseapp.com",

    projectId:
        "college-event-management-44000",

    storageBucket:
        "college-event-management-44000.firebasestorage.app",

    messagingSenderId:
        "201079972072",

    appId:
        "1:201079972072:web:3e91231adc5a326ed6695d"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Initialize Authentication

const auth = getAuth(app);


// Initialize Firestore

const db = getFirestore(app);


// Export Firebase services

export {
    app,
    auth,
    db
};