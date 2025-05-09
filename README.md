# 📚 Student Dashboard

A full-stack web application built with **React** and **Firebase Authentication** for managing student data. This dashboard allows users to **log in**, **view**, **filter**, **search**, **add**, and **paginate** student records by course.

---

## 🚀 Features

- 🔐 Firebase Authentication-based login  
- 📄 List of students with:
  - Course-based filtering
  - Search by name
  - Pagination (for >10 entries)
- ➕ Add new student with form validation
- 🧭 Client-side routing with React Router
- 🎨 Clean, responsive UI with custom CSS
- 🔄 Loading state with animated spinner

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router  
- **Backend**: Node.js + Express (for `/students` API)  
- **Auth**: Firebase Authentication  
- **Styling**: Custom CSS

---

## 📁 Project Structure

\`\`\`
/src
├── components
│   ├── Login/
│   ├── Navbar/
│   ├── studentForm/
│   ├── studentList/
│   └── Main/
├── App.js
├── App.css
└── firebase.js
\`\`\`

---

## 🔧 Setup Instructions

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/hemanthkumar387/student-dashboard.git
   cd student-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure Firebase**
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com/)
   - Enable **Email/Password** authentication
   - Replace the config in \`firebase.js\` with your Firebase credentials:

   \`\`\`js
   // src/firebase.js
   import { initializeApp } from "firebase/app";
   import { getAuth } from "firebase/auth";

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     ...
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   node index.js
   \`\`\`

5. **Backend Setup** (Optional)  
   Ensure a local server is running at \`http://localhost:5000/students\` or modify the fetch URL accordingly.

---

## ✅ Usage

- Login with a registered Firebase user  
- Navigate to \`/students\` to view and filter students  
- Click **Add** to create a new student  
- Logout using the top navigation bar

---

## 🧪 Future Improvements

- Edit and delete student entries  
- Server-side pagination  
- Role-based access control (admin/user)  
- Improved input validation

---
