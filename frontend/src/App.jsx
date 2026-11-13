
import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // Add student
  function addStudent(student) {
    setStudents([...students, student]);
  }

  // Delete student
  function deleteStudent(index) {
    const updatedStudents = students.filter(
      (_, i) => i !== index
    );

    setStudents(updatedStudents);

    if (editingStudent === students[index]) {
      setEditingStudent(null);
    }
  }

  // Select student for editing
  function editStudent(index) {
    setEditingStudent({
      ...students[index],
      index: index
    });
  }

  // Update student
  function updateStudent(updatedStudent) {
    const updatedStudents = [...students];

    updatedStudents[editingStudent.index] = updatedStudent;

    setStudents(updatedStudents);
    setEditingStudent(null);
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
