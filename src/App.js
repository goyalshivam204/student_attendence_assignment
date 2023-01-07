import React, { useState, useEffect } from 'react';

function App() {
  // Declare a state variable called "students" and set it to an empty array
  const [students, setStudents] = useState([]);
  const [rollNumber,setRollNumber] = useState("");
  const [name,setName] = useState("");
  // Use the useEffect hook to fetch the list of students from the backend when the component mounts
  

  const handleChangeRollNumber = (event) => {
    console.log(event.target.value);
    setRollNumber(event.target.value);
  }

  const handleChangeName = (event) => {
    setName(event.target.value);
  }
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // submit the form
  // }

  // useEffect(() => {
  //   async function fetchStudents() {
  //     const response = await fetch('/api/students');
  //     const data = await response.json();
  //     setStudents(data);
  //   }
  //   fetchStudents();
  // }, []);

  // Function to handle checking a student in
  const checkInStudent = () => {
    // Add the new student to the list of students
    console.log(rollNumber,name);
    setStudents([...students, { rollNumber, name, checkInTime: new Date().toUTCString()}]);
  }

  // Function to handle checking a student out
  const checkOutStudent = (rollNumber) => {
    // Find the student with the matching roll number and update their checkout time
    setStudents(students.map(student => {
      if (student.rollNumber === rollNumber) {
        return { ...student, checkOutTime: new Date().toUTCString() };
      }
      return student;
    }));
  }

  // Calculate the number of students currently in the school by checking if they have a checkout time
  const numStudentsInSchool = students.filter(student => !student.checkOutTime).length;

  return (
    <div className='container'>
      <h1 className='text-center'>Student Attendance</h1>
      <form>
      <div className="form-group">
          <label htmlFor="rollNumber">Roll Number:</label>
          <input type="text" className='form-control' id="rollNumber" value={rollNumber} onChange={handleChangeRollNumber} />
      </div>
      <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" className='form-control' id="name" value={name} onChange={handleChangeName} />
      </div>
        <button type="button" onClick={() => checkInStudent()}>Check In</button>
      </form>
      <table className='table'>
        <thead>
          <tr>
            <th scope= 'col'>Roll Number</th>
            <th scope= 'col'>Name</th>
            <th scope= 'col'>Check In Time</th>
            <th scope= 'col'>Check Out Time</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.rollNumber}>
              <td>{student.rollNumber}</td>
              <td>{student.name}</td>
              <td>{student.checkInTime}</td>
              <td>{student.checkOutTime || 'N/A'}</td>
              <td><button type="button" onClick={() => checkOutStudent(student.rollNumber)}>Check Out</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className='text-center'>Number of students in school: {numStudentsInSchool}</h3>
    </div>
  );
}

export default App;
