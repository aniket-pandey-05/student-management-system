
import { useState, useEffect } from "react";

function StudentForm({ onAddStudent, editingStudent, onUpdateStudent }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setEmail(editingStudent.email);
      setCourse(editingStudent.course);
      setAge(editingStudent.age);
    }
  }, [editingStudent]);

  function handleSubmit(e) {
    e.preventDefault();

    const student = {
      name,
      email,
      course,
      age: Number(age)
    };

    if (editingStudent) {
      onUpdateStudent(student);
    } else {
      onAddStudent(student);
    }

    setName("");
    setEmail("");
    setCourse("");
    setAge("");
  }

  return (
    <div>
      <h2>{editingStudent ? "Update Student" : "Add New Student"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <button type="submit">
          {editingStudent ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
