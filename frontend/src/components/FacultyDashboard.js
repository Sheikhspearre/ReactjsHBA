import React, { useState, useEffect } from "react";

function FacultyDashboard({ user }) {
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({
    name: "",
    credits: "",
    date: "",
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/faculty/programs",
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

  const handleCreateProgram = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/faculty/programs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newProgram),
        }
      );
      if (response.ok) {
        setNewProgram({ name: "", credits: "", date: "" });
        fetchPrograms();
      }
    } catch (error) {
      console.error("Error creating program:", error);
    }
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <h3>Create New Program</h3>
      <form onSubmit={handleCreateProgram}>
        <input
          type="text"
          value={newProgram.name}
          onChange={(e) =>
            setNewProgram({ ...newProgram, name: e.target.value })
          }
          placeholder="Program Name"
          required
        />
        <input
          type="number"
          value={newProgram.credits}
          onChange={(e) =>
            setNewProgram({ ...newProgram, credits: e.target.value })
          }
          placeholder="Credits"
          required
        />
        <input
          type="date"
          value={newProgram.date}
          onChange={(e) =>
            setNewProgram({ ...newProgram, date: e.target.value })
          }
          required
        />
        <button type="submit">Create Program</button>
      </form>
      <h3>Your Programs</h3>
      <ul>
        {programs.map((program) => (
          <li key={program._id}>
            {program.name} - Credits: {program.credits}, Date:{" "}
            {new Date(program.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FacultyDashboard;
