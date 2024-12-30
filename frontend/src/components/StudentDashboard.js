import React, { useState, useEffect } from "react";

function StudentDashboard({ user }) {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/student/programs",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const handleRegisterProgram = async (programId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/student/register/${programId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        fetchPrograms();
      }
    } catch (error) {
      console.error("Error registering for program:", error);
    }
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Your Credits: {user.credits}</p>
      <h3>Available Programs</h3>
      <ul>
        {programs.map((program) => (
          <li key={program._id}>
            {program.name} - Credits: {program.credits}, Date:{" "}
            {new Date(program.date).toLocaleDateString()}
            <button onClick={() => handleRegisterProgram(program._id)}>
              Register
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentDashboard;
