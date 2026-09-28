// ============================================
// FIREBASE IMPORTS
// ============================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    collection,
    addDoc,
    serverTimestamp,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// ============================================
// FIREBASE CONFIG
// ============================================

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


// ============================================
// INITIALIZE FIREBASE
// ============================================

const app =
    initializeApp(firebaseConfig);


// ============================================
// AUTHENTICATION
// ============================================

const auth =
    getAuth(app);


// ============================================
// FIRESTORE DATABASE
// ============================================

const db =
    getFirestore(app);


// ============================================
// STUDENT REGISTRATION
// ============================================

async function registerStudent() {

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const course =
        document.getElementById("course").value;

    const year =
        document.getElementById("year").value;

    const event =
        document.getElementById("event").value;

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // Check password

    if (password !== confirmPassword) {

        alert("❌ Passwords do not match!");

        return;
    }


    // Check password length

    if (password.length < 6) {

        alert(
            "❌ Password must be at least 6 characters!"
        );

        return;
    }


    try {

        // Create Firebase account

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;


        // Save student information

        await setDoc(
            doc(
                db,
                "students",
                user.uid
            ),
            {

                name: name,

                email: email,

                phone: phone,

                course: course,

                year: year,

                interestedEvent: event,

                createdAt:
                    new Date().toISOString()

            }
        );


        alert(
            "🎉 Registration Successful!\n\n" +
            "Welcome " + name
        );


        // Go to login

        window.location.href =
            "login.html";


    }

    catch (error) {

        console.error(error);


        alert(
            "❌ Registration Failed!\n\n" +
            "Error Code: " +
            error.code +
            "\n\n" +
            "Message: " +
            error.message
        );

    }

}


// ============================================
// STUDENT LOGIN
// ============================================

async function loginStudent() {

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();


    const password =
        document
            .getElementById("loginPassword")
            .value;


    // Check fields

    if (!email || !password) {

        alert(
            "⚠️ Please enter email and password."
        );

        return;
    }


    try {

        // Login

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        alert(
            "🎉 Login Successful!"
        );


        // Open events page

        window.location.href =
            "events.html";


    }

    catch (error) {

        console.error(error);


        alert(
            "❌ Login Failed!\n\n" +
            "Error Code: " +
            error.code +
            "\n\n" +
            "Message: " +
            error.message
        );

    }

}


// ============================================
// REGISTER FOR EVENT
// ============================================

async function registerForEvent(

    eventName,

    eventDate,

    eventVenue,

    eventCategory

) {

    // Get logged-in user

    const user =
        auth.currentUser;


    // Check login

    if (!user) {

        alert(
            "⚠️ Please login first to register for an event."
        );


        window.location.href =
            "login.html";


        return;
    }


    try {

        // ====================================
        // CREATE UNIQUE EVENT ID
        // ====================================

        const eventId =

            user.uid +
            "_" +

            eventName
                .toLowerCase()
                .replace(
                    /[^a-z0-9]/g,
                    "_"
                );


        // ====================================
        // FIRESTORE DOCUMENT REFERENCE
        // ====================================

        const eventRef =

            doc(
                db,
                "eventRegistrations",
                eventId
            );


        // ====================================
        // CHECK DUPLICATE REGISTRATION
        // ====================================

        const existingEvent =

            await getDoc(
                eventRef
            );


        if (existingEvent.exists()) {

            alert(
                "⚠️ You have already registered for this event!"
            );

            return;
        }


        // ====================================
        // SAVE EVENT REGISTRATION
        // ====================================

        await setDoc(

            eventRef,

            {

                userId:
                    user.uid,

                email:
                    user.email,

                eventName:
                    eventName,

                eventDate:
                    eventDate,

                eventVenue:
                    eventVenue,

                eventCategory:
                    eventCategory,

                registeredAt:
                    serverTimestamp()

            }

        );


        // ====================================
        // SUCCESS MESSAGE
        // ====================================

        alert(

            "🎉 Event Registration Successful!\n\n" +

            eventName

        );


    }

    catch (error) {

        console.error(error);


        alert(

            "❌ Event Registration Failed!\n\n" +

            "Error Code: " +
            error.code +

            "\n\n" +

            "Message: " +
            error.message

        );

    }

}


// ============================================
// EXPORT
// ============================================

export {

    app,

    auth,

    db,

    registerStudent,

    loginStudent,

    registerForEvent

};