/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

const app = createApp(App);

registerPlugins(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbxjFgd3NLFEeGP1ZABkqaoD9KkgbuMg0",
  authDomain: "recipiesappvuetify.firebaseapp.com",
  projectId: "recipiesappvuetify",
  storageBucket: "recipiesappvuetify.appspot.com",
  messagingSenderId: "1023232618417",
  appId: "1:1023232618417:web:303045515cecbd361c5790",
};

initializeApp(firebaseConfig);

app.mount("#app");
