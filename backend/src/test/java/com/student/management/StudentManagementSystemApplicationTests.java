package com.student.management;

import com.student.management.entity.Student;
import com.student.management.repository.StudentRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class StudentManagementSystemApplicationTests {

	@Autowired
	private StudentRepository studentRepository;

	@Test
	void testSaveAndFindStudent() {

		// Create student object
		Student student = new Student(
				"Rahul",
				"rahul@gmail.com",
				"Information Technology",
				21
		);

		// Save student into database
		Student savedStudent = studentRepository.save(student);

		// Retrieve student using generated ID
		Student foundStudent = studentRepository.findById(savedStudent.getId())
				.orElse(null);

		// Verify student details
		assertNotNull(foundStudent);
		assertEquals("Rahul", foundStudent.getName());
		assertEquals("rahul@gmail.com", foundStudent.getEmail());
	}
}
