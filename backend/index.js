const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

const students = require('./data');

app.use(cors());
app.use(express.json());


app.get('/students', (req, res) => {
  setTimeout(() => {
    res.json(students);
  }, 1000); // simulate API delay
});

app.post('/students', (req, res) => {
  const { name, email, mobile, age, course } = req.body;
  const newStudent = { id: Date.now(), name, email, mobile, age, course };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
