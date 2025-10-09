// import React, { useEffect, useState } from "react";
// import {
//   Edit,
//   Trash2,
//   MapPin,
//   CheckCircle,
//   XCircle,
//   PlusCircle,
// } from "lucide-react";
// import { getFacilities, saveFacility, deleteFacility } from "../../api/facilities";

// const FacilityManagement = () => {
//   const [facilities, setFacilities] = useState([]);
//   const [newFacility, setNewFacility] = useState({
//     name: "",
//     type: "",
//     location: "",
//     availabilityStatus: "Available",
//     image: "",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch all facilities from backend
//   const fetchFacilities = async () => {
//     setLoading(true);
//     try {
//       const res = await getFacilities();
//       setFacilities(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch facilities:", err);
//       alert("Failed to load facilities from server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFacilities();
//   }, []);

//   // Save or update facility
//   const handleSave = async () => {
//     if (!newFacility.name || !newFacility.type || !newFacility.location) {
//       alert("Please fill in all fields!");
//       return;
//     }

//     try {
//       // Map image to url for backend
//       const payload = editingId
//         ? { ...newFacility, facilityId: editingId, url: newFacility.image }
//         : { ...newFacility, url: newFacility.image };

//       // Remove image key to avoid confusion
//       delete payload.image;

//       await saveFacility(payload); // Call backend
//       await fetchFacilities();     // Refresh list
//       setEditingId(null);

//       // Reset form
//       setNewFacility({
//         name: "",
//         type: "",
//         location: "",
//         availabilityStatus: "Available",
//         image: "",
//       });
//     } catch (err) {
//       console.error("Save failed:", err);
//       alert("Failed to save facility.");
//     }
//   };

//   // Edit facility
//   const handleEdit = (facility) => {
//     setNewFacility({
//       name: facility.name,
//       type: facility.type,
//       location: facility.location,
//       availabilityStatus: facility.availabilityStatus,
//       image: facility.url || "", // load image URL from backend
//     });
//     setEditingId(facility.facilityId);
//   };

// // Delete facility
// const handleDelete = async (id) => {
// if (!window.confirm("Are you sure you want to delete this facility?")) return;

// try {
// await deleteFacility(id);
// await fetchFacilities(); // Refresh list
// } catch (err) {
// console.error("Delete failed:", err);
// alert("Failed to delete facility.");
// }
// };

// return (
// <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
// <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
// Facility Management
// </h1>

// {/* Add / Edit Form */}
// <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 mb-10">
// <h2 className="text-2xl font-semibold mb-4 text-gray-700">
// {editingId ? "Edit Facility" : "Add New Facility"}
// </h2>
// <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// <input
// type="text"
// placeholder="Facility Name"
// value={newFacility.name}
// onChange={(e) =>
// setNewFacility({ ...newFacility, name: e.target.value })
// }
// className="border border-gray-300 p-2 rounded-lg focus:outline-blue-500"
// />
// <input
// type="text"
// placeholder="Type (e.g. Turf, Pool)"
// value={newFacility.type}
// onChange={(e) =>
// setNewFacility({ ...newFacility, type: e.target.value })
// }
// className="border border-gray-300 p-2 rounded-lg focus:outline-blue-500"
// />
// <input
// type="text"
// placeholder="Location"
// value={newFacility.location}
// onChange={(e) =>
// setNewFacility({ ...newFacility, location: e.target.value })
// }
// className="border border-gray-300 p-2 rounded-lg focus:outline-blue-500"
// />
// <select
// value={newFacility.availabilityStatus}
// onChange={(e) =>
// setNewFacility({
// ...newFacility,
// availabilityStatus: e.target.value,
// })
// }
// className="border border-gray-300 p-2 rounded-lg focus:outline-blue-500"
// >
// <option>Available</option>
// <option>Unavailable</option>
// </select>
// <input
// type="text"
// placeholder="Image URL (optional)"
// value={newFacility.image}
// onChange={(e) =>
// setNewFacility({ ...newFacility, image: e.target.value })
// }
// className="border border-gray-300 p-2 rounded-lg focus:outline-blue-500 col-span-full"
// />
// </div>
// <button
// onClick={handleSave}
// className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
// >
// <PlusCircle size={18} />
// {editingId ? "Update Facility" : "Add Facility"}
// </button>
// </div>

// {/* Facility List */}
// {loading ? (
// <p className="text-center text-gray-600">Loading facilities...</p>
// ) : (
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// {facilities.length === 0 ? (
// <p className="col-span-3 text-center text-gray-600">
// No facilities found.
// </p>
// ) : (
// facilities.map((facility) => (
// <div
// key={facility.facilityId}
// className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
// >
// <img
// src={
// facility.url ||
// "https://img.freepik.com/free-photo/sport-background-with-football-ball-grass_1150-38412.jpg"
// }
// alt={facility.name}
// className="w-full h-56 object-cover rounded-t-2xl"
// />
// <div className="p-5">
// <h2 className="text-2xl font-semibold text-gray-800 mb-1">
// {facility.name}
// </h2>
// <p className="text-gray-600 text-sm mb-2">{facility.type}</p>
// <p className="flex items-center gap-2 text-gray-700 text-sm mb-3">
// <MapPin size={16} className="text-blue-600" />
// {facility.location}
// </p>
// <div className="flex items-center justify-between mb-3">
// <span
// className={`flex items-center gap-1 text-sm font-medium ${
// facility.availabilityStatus === "Available"
// ? "text-green-600"
// : "text-red-600"
// }`}
// >
// {facility.availabilityStatus === "Available" ? (
// <CheckCircle size={16} />
// ) : (
// <XCircle size={16} />
// )}
// {facility.availabilityStatus}
// </span>
// </div>
// <div className="flex gap-3">
// <button
// onClick={() => handleEdit(facility)}
// className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
// >
// <Edit size={16} /> Edit
// </button>
// <button
// onClick={() => handleDelete(facility.facilityId)}
// className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
// >
// <Trash2 size={16} /> Delete
// </button>
// </div>
// </div>
// </div>
// ))
// )}
// </div>
// )}
// </div>
// );
// };

// export default FacilityManagement;
import React, { useEffect, useState } from "react";
import {
  Edit,
  Trash2,
  MapPin,
  CheckCircle,
  XCircle,
  PlusCircle,
} from "lucide-react";
import { getFacilities, saveFacility, deleteFacility } from "../../api/facilities";

const FacilityManagement = () => {
  const [facilities, setFacilities] = useState([]);
  const [newFacility, setNewFacility] = useState({
    name: "",
    type: "",
    location: "",
    availabilityStatus: "Available",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all facilities from backend
  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const res = await getFacilities();
      setFacilities(res.data || []);
    } catch (err) {
      console.error("Failed to fetch facilities:", err);
      alert("Failed to load facilities from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  // Save or update facility
  const handleSave = async () => {
    if (!newFacility.name || !newFacility.type || !newFacility.location) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const payload = {
        ...newFacility,
        facilityId: editingId || undefined, // Include ID for edit
        url: newFacility.image,            // Map image to url
      };
      delete payload.image;

      await saveFacility(payload);
      await fetchFacilities(); // Refresh list

      // Reset form
      setNewFacility({
        name: "",
        type: "",
        location: "",
        availabilityStatus: "Available",
        image: "",
      });
      setEditingId(null);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save facility.");
    }
  };

  // Edit facility
  const handleEdit = (facility) => {
    setNewFacility({
      name: facility.name,
      type: facility.type,
      location: facility.location,
      availabilityStatus: facility.availabilityStatus,
      image: facility.url || "",
    });
    setEditingId(facility.facilityId);
  };

  // Delete facility
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this facility?")) return;

    try {
      await deleteFacility(id);
      await fetchFacilities();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete facility.");
    }
  };

return (
<div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
<h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
Facility Management
</h1>

{/* Add / Edit Form */}
<div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 mb-10">
<h2 className="text-2xl font-semibold mb-4 text-gray-700">
{editingId ? "Edit Facility" : "Add New Facility"}
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<input
type="text"
placeholder="Facility Name"
value={newFacility.name}
onChange={(e) => setNewFacility({ ...newFacility, name: e.target.value })}
className="border border-gray-300 p-2 rounded-lg focus:outline-blue-500"
/>
<input
type="text"
placeholder="Type (e.g. Turf, Pool)"
value={newFacility.type}
onChange={(e) => setNewFacility({ ...newFacility, type: e.target.value })}
className="border border-gray-300 p-2 rounded-lg focus:outline-blue-500"
/>
<input
type="text"
placeholder="Location"
value={newFacility.location}
onChange={(e) => setNewFacility({ ...newFacility, location: e.target.value })}
className="border border-gray-300 p-2 rounded-lg focus:outline-blue-500"
/>
<select
value={newFacility.availabilityStatus}
onChange={(e) => setNewFacility({ ...newFacility, availabilityStatus: e.target.value })}
className="border border-gray-300 p-2 rounded-lg focus:outline-blue-500"
>
<option>Available</option>
<option>Unavailable</option>
</select>
<input
type="text"
placeholder="Image URL (optional)"
value={newFacility.image}
onChange={(e) => setNewFacility({ ...newFacility, image: e.target.value })}
className="border border-gray-300 p-2 rounded-lg focus:outline-blue-500 col-span-full"
/>
</div>
<button
onClick={handleSave}
className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
>
<PlusCircle size={18} />
{editingId ? "Update Facility" : "Add Facility"}
</button>
</div>

{/* Facility List */}
{loading ? (
<p className="text-center text-gray-600">Loading facilities...</p>
) : (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
{facilities.length === 0 ? (
<p className="col-span-3 text-center text-gray-600">
No facilities found.
</p>
) : (
facilities.map((facility) => (
<div
key={facility.facilityId}
className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
>
<img
src={
facility.url ||
"https://img.freepik.com/free-photo/sport-background-with-football-ball-grass_1150-38412.jpg"
}
alt={facility.name}
className="w-full h-56 object-cover rounded-t-2xl"
/>
<div className="p-5">
<h2 className="text-2xl font-semibold text-gray-800 mb-1">
{facility.name}
</h2>
<p className="text-gray-600 text-sm mb-2">{facility.type}</p>
<p className="flex items-center gap-2 text-gray-700 text-sm mb-3">
<MapPin size={16} className="text-blue-600" />
{facility.location}
</p>
<div className="flex items-center justify-between mb-3">
<span
className={`flex items-center gap-1 text-sm font-medium ${
facility.availabilityStatus === "Available"
? "text-green-600"
: "text-red-600"
}`}
>
{facility.availabilityStatus === "Available" ? (
<CheckCircle size={16} />
) : (
<XCircle size={16} />
)}
{facility.availabilityStatus}
</span>
</div>
<div className="flex gap-3">
<button
onClick={() => handleEdit(facility)}
className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
>
<Edit size={16} /> Edit
</button>
<button
onClick={() => handleDelete(facility.facilityId)}
className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
>
<Trash2 size={16} /> Delete
</button>
</div>
</div>
</div>
))
)}
</div>
)}
</div>
);
};

export default FacilityManagement;