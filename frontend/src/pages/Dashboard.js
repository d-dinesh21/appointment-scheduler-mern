import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [userName, setUserName] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    // Fetch user profile
    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUserName(res.data.name))
      .catch(() => console.log("Profile fetch failed"));

    fetchAppointments("");
    // eslint-disable-next-line
  }, []);

  const fetchAppointments = async (searchText) => {
    const res = await axios.get(
      `http://localhost:5000/api/appointments?search=${searchText}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setAppointments(res.data);
  };

  // ✅ Validation logic
  const validateForm = () => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!date) {
      newErrors.date = "Date is required";
    } else if (date < today) {
      newErrors.date = "Date cannot be in the past";
    }

    if (!time) {
      newErrors.time = "Time is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (!/[A-Za-z]/.test(description)) {
      newErrors.description =
        "Description must include at least one letter";
    } else if (description.length < 5) {
      newErrors.description =
        "Description must be at least 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addAppointment = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    await axios.post(
      "http://localhost:5000/api/appointments",
      { date, time, description },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setDate("");
    setTime("");
    setDescription("");
    setErrors({});
    fetchAppointments(search);
  };

  const deleteAppointment = async (id) => {
    await axios.delete(`http://localhost:5000/api/appointments/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAppointments(search);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Navbar userName={userName} onLogout={logout} />

      <div className="container mt-4">
        {/* Add Appointment */}
        <div className="card shadow-sm p-3 mb-4">
          <h5 className="mb-3">Add Appointment</h5>

          <form onSubmit={addAppointment} className="row g-2">
            <div className="col-md-3">
              <input
                type="date"
                className={`form-control ${
                  errors.date ? "is-invalid" : ""
                }`}
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
              />
              {errors.date && (
                <div className="invalid-feedback">{errors.date}</div>
              )}
            </div>

            <div className="col-md-3">
              <input
                type="time"
                className={`form-control ${
                  errors.time ? "is-invalid" : ""
                }`}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              {errors.time && (
                <div className="invalid-feedback">{errors.time}</div>
              )}
            </div>

            <div className="col-md-4">
              <input
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <div className="invalid-feedback">
                  {errors.description}
                </div>
              )}
            </div>

            <div className="col-md-2 d-grid">
              <button className="btn btn-primary">Add</button>
            </div>
          </form>
        </div>

        {/* Search */}
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Search appointments..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                fetchAppointments(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Appointment List */}
        <div className="table-responsive shadow-sm">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No appointments found
                  </td>
                </tr>
              ) : (
                appointments.map((a) => (
                  <tr key={a._id}>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                    <td>{a.description}</td>
                    <td>{a.status}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteAppointment(a._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
