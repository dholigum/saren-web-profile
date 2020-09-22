import { firebase } from "@firebase/app";
import "@firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDb4noOXmdSSej50xr2RS-EBFoIa2TYcls",
    authDomain: "web-dusun-saren.firebaseapp.com",
    databaseURL: "https://web-dusun-saren.firebaseio.com",
    projectId: "web-dusun-saren",
    storageBucket: "web-dusun-saren.appspot.com",
    messagingSenderId: "1028690836225"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore();