 import { initializeApp } from "firebase/app";
   import { getAuth } from "firebase/auth";

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);

   // For security I have removed my KEY and All Other