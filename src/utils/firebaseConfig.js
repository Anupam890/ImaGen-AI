import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyB3OaG08aePivHbonD51Cu6dsn3hUMmrYc",
    authDomain: "imagen-429410.firebaseapp.com",
    projectId: "imagen-429410",
    storageBucket: "imagen-429410.appspot.com",
    messagingSenderId: "862850848353",
    appId: "1:862850848353:web:053a0df22d0ed16d63fc20",
    measurementId: "G-RD24SBEWXL"
};

const app = initializeApp(firebaseConfig);


export { app };