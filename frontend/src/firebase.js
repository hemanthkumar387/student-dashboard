// Replace with your Firebase config
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBhw6mGvdEvH5U9i4EkrgVTmidubgzfqGQ",
    authDomain: "studentdashboard-bc472.firebaseapp.com",
    projectId: "studentdashboard-bc472",
    storageBucket: "studentdashboard-bc472.firebasestorage.app",
    messagingSenderId: "791852182703",
    appId: "1:791852182703:web:db1ec2a3408ec78d43f85a",
    measurementId: "G-5QB0H68S57"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
