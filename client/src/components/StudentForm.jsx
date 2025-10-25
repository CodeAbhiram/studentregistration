import { useState } from "react";
import "./StudentForm.css";

export default function StudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    dob: "",
    address: "",
    gender: "",
    bloodGroup: "",
    course: "",
    semester: "",
    guardianName: "",
    guardianPhone: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validations
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/; // 10-digit phone number
    const guardianPhonePattern = /^\d{10}$/;

    if (!emailPattern.test(formData.email)) {
      return alert("Please enter a valid email address");
    }

    if (!phonePattern.test(formData.phone)) {
      return alert("Please enter a valid 10-digit phone number");
    }

    if (!guardianPhonePattern.test(formData.guardianPhone)) {
      return alert("Please enter a valid 10-digit guardian phone number");
    }

    if (!formData.gender) {
      return alert("Please select gender");
    }

    try {
      const response = await fetch("http://localhost:5000/api/students/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          department: "",
          year: "",
          dob: "",
          address: "",
          gender: "",
          bloodGroup: "",
          course: "",
          semester: "",
          guardianName: "",
          guardianPhone: ""
        });
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Student Registration Form</h2>

      {Object.keys(formData).map((key) => {
        // Skip gender for now
        if (key === "gender") return null;

        let type = "text";
        if (key === "dob") type = "date";
        if (key === "email") type = "email";
        if (key === "phone" || key === "guardianPhone") type = "tel";

        return (
          <div key={key} className="form-group">
            <label>{key}</label>
            <input
              type={type}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        );
      })}

      {/* Gender Radio Buttons */}
      <div className="form-group">
        <label>Gender</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}
          /> Male
        </label>
        <label style={{ marginLeft: "20px" }}>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
          /> Female
        </label>
      </div>

      <button type="submit" className="submit-btn">Register</button>
    </form>
  );
}
