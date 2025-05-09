import { useState } from 'react';
import './studentForm.css';

const AddStudent = ({ students, onAddStudent, user }) => {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', age: '', course: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const courses = [...new Set(students.map((s) => s.course))];

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!form.mobile.match(/^\d{10}$/)) newErrors.mobile = 'Enter a valid 10-digit mobile number';
    if (!form.age.match(/^\d+$/) || parseInt(form.age) <= 0) newErrors.age = 'Enter a valid age';
    if (!form.course) newErrors.course = 'Course is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (!user) {
      setMessage('You must be logged in to add a student');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to add student');
      const newStudent = await res.json();
      onAddStudent(newStudent);
      setForm({ name: '', email: '', mobile: '', age: '', course: '' });
      setErrors({});
      setMessage('Student added successfully!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Student</h2>
      {message && <div className="form-message">{message}</div>}
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Mobile"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="input-field"
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="input-field"
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>

        <div className="form-group">
          <select
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
            className="select-field"
          >
            <option value="" disabled>Select Course</option>
            {courses.map((course, idx) => (
              <option key={idx} value={course}>{course}</option>
            ))}
          </select>
          {errors.course && <span className="error">{errors.course}</span>}
        </div>

        <button type="submit" className="submit-btn">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
