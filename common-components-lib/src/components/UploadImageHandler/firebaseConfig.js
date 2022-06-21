import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";

const app = initializeApp({
    apiKey: "AIzaSyAIkzwcZorjqD6ktGscjc_EmU4A2gkZfYU",
    authDomain: "swe-team1.firebaseapp.com",
    projectId: "swe-team1",
    storageBucket: "swe-team1.appspot.com",
    messagingSenderId: "450588451971",
    appId: "1:450588451971:web:06afbf16b3851d6ffaa7b6",
    measurementId: "G-RWBJ3JBWNR"
});

const storage = getStorage(app);
export {storage};

