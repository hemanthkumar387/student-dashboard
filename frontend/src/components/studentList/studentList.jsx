import { useState } from 'react';
import './studentList.css';

const StudentList = ({ students, filter, setFilter, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // reset to page 1 on filter change
  };

  const courses = ['All', ...new Set(students.map((s) => s.course))];

  const filteredStudents = students
    .filter(student => filter === 'All' || !filter || student.course === filter)
    .filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIdx = (currentPage - 1) * studentsPerPage;
  const currentStudents = filteredStudents.slice(startIdx, startIdx + studentsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="student-list-wrapper">
      <h1 className='table-title'>List of Students</h1>

      <div className="filter-container">
        <select value={filter} onChange={handleFilterChange} className="filter-dropdown">
          {courses.map((course, index) => (
            <option key={index} value={course}>{course}</option>
          ))}
        </select>

        <input
          type="text"
          className="search-input"
          placeholder="Search by name"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to page 1 on search
          }}
        />
      </div>

      <div className="student-list-container">
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : currentStudents.length > 0 ? (
          <>
            <table className="student-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Age</th>
                  <th>Course</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.mobile}</td>
                    <td>{student.age}</td>
                    <td>{student.course}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="no-data-message">No data found</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              className={`page-button ${currentPage === idx + 1 ? 'active' : ''}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
