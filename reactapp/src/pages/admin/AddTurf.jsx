import React, { useState } from "react";
import axios from "axios";

const AddTurf = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "turf",
    location: "",
    availabilityStatus: "available",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://8080-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io/api/facilities/add",
        formData
      );
      if (res.status === 200 || res.status === 201) {
        alert("✅ Turf added successfully!");
        setFormData({ name: "", type: "turf", location: "", availabilityStatus: "available" });
      }
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add turf.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Turf</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Turf Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="availabilityStatus"
          value={formData.availabilityStatus}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Turf
        </button>
      </form>
    </div>
  );
};

export default AddTurf;
