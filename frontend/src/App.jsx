
import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // Fetch students from backend
  useEffect(() => {
    fetchStudents();
  }, []);

  function fetchStudents() {
    fetch("http://localhost:8080/api/students")
      .then(response => response.json())
      .then(data => {
        setStudents(data);
      })
      .catch(error => {
        console.error("Error fetching students:", error);
      });
  }

  // Add student (will connect to POST next)
 function addStudent(student) {
  fetch("http://localhost:8080/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  })
    .then(response => response.json())
    .then(data => {
      setStudents([...students, data]);
    })
    .catch(error => {
      console.error("Error adding student:", error);
    });
}

  // Delete student (will connect to DELETE next)
  
function deleteStudent(index) {
  const student = students[index];

  fetch(`http://localhost:8080/api/students/${student.id}`, {
    method: "DELETE"
  })
    .then(() => {
      fetchStudents();
    })
    .catch(error => {
      console.error("Error deleting student:", error);
    });
}


  // Select student for editing
  function editStudent(index) {
    setEditingStudent({
      ...students[index],
      index: index
    });
  }

  // Update student (will connect to PUT next)
  
function updateStudent(updatedStudent) {
  fetch(`http://localhost:8080/api/students/${editingStudent.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedStudent)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to update student");
      }

      return response.json();
    })
    .then(data => {
      fetchStudents();
      setEditingStudent(null);
    })
    .catch(error => {
      console.error("Error updating student:", error);
    });
}


  return (
    <div className="app-container">
      <h1>Student Management System</h1>

      <StudentForm
        onAddStudent={addStudent}
        editingStudent={editingStudent}
        onUpdateStudent={updateStudent}
      />

      <StudentTable
        students={students}
        onDeleteStudent={deleteStudent}
        onEditStudent={editStudent}
      />
    </div>
  );
}

export default App;
