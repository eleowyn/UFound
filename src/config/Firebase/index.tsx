// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBHe3xZ_JzjgYb-2l6l9hbfsrBI0QZ4AIc',
  authDomain: 'u-found-c0e9c.firebaseapp.com',
  projectId: 'u-found-c0e9c',
  storageBucket: 'u-found-c0e9c.firebasestorage.app',
  messagingSenderId: '685688591584',
  appId: '1:685688591584:web:25f0b109f2ab7231542c85',
  measurementId: 'G-180M4TPEEH',
  databaseURL: 'https://u-found-c0e9c-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
