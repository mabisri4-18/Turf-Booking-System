// import React, { useEffect, useState } from 'react';
// import { getFacilities } from '../../api/facilities';
// import { Link } from 'react-router-dom';

// const TurfList = () => {
//   const [facilities, setFacilities] = useState([]);

//   const fetchFacilities = async () => {
//     const res = await getFacilities();
//     setFacilities(res.data || []);
//   };

//   useEffect(() => { fetchFacilities(); }, []);

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">Available Turfs</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {facilities.map(facility => (
//           <div key={facility.id} className="bg-white rounded-xl shadow overflow-hidden">
//             <img
//               src={facility.image || 'https://png.pngtree.com/thumb_back/fh260/background/20240525/pngtree-artificial-grass-sport-field-cover-with-soccer-goal-image_15730619.jpg'}
//               alt={facility.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold">{facility.name}</h2>
//               <p className="text-gray-600">{facility.type}</p>
//               <Link to={`/customer/booking/${facility.id}`}>
//                 <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
//                   Book Now
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import { getFacilities } from "../../api/facilities";
import { Link } from "react-router-dom";

const TurfList = () => {
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const fetchFacilities = async () => {
    try {
      const res = await getFacilities();
      setFacilities(res.data || []);
      setFilteredFacilities(res.data || []);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  useEffect(() => {
    let filtered = facilities;

    if (search) {
      filtered = filtered.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(
        (f) => f.type.toLowerCase() === typeFilter.toLowerCase()
      );
    }

    setFilteredFacilities(filtered);
  }, [search, typeFilter, facilities]);

return (
<div className="p-8 bg-gray-50 min-h-screen">
<h1 className="text-3xl font-bold mb-6 text-green-700">Available Turfs</h1>

{/* Filters */}
<div className="flex flex-col md:flex-row gap-4 mb-6">
<input
type="text"
placeholder="🔍 Search by name..."
value={search}
onChange={(e) => setSearch(e.target.value)}
className="p-2 border rounded w-full md:w-1/3 focus:ring-2 focus:ring-green-500 outline-none"
/>
<select
value={typeFilter}
onChange={(e) => setTypeFilter(e.target.value)}
className="p-2 border rounded w-full md:w-1/4 focus:ring-2 focus:ring-green-500 outline-none"
>
<option value="">All Types</option>
<option value="Turf">Turf</option>
<option value="Court">Court</option>
<option value="Pool">Pool</option>
</select>
</div>

{filteredFacilities.length === 0 ? (
<div className="text-center py-20 text-gray-500">
<p className="text-xl">No facilities found 😕</p>
</div>
) : (
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
{filteredFacilities.map((facility) => (
<div
key={facility.facilityId}
className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden flex flex-col"
>
<img
src={
facility.image ||
"https://png.pngtree.com/thumb_back/fh260/background/20240525/pngtree-artificial-grass-sport-field-cover-with-soccer-goal-image_15730619.jpg"
}
alt={facility.name}
className="w-full h-48 object-cover"
/>
<div className="p-4 flex flex-col justify-between flex-grow">
<div>
<h2 className="text-xl font-semibold text-green-700 mb-1">
{facility.name}
</h2>
<p className="text-gray-600 mb-2">{facility.type}</p>
<p className="text-gray-500 mb-2">📍 {facility.location}</p>
<p
className={`font-medium ${
facility.availabilityStatus === "available"
? "text-green-600"
: "text-red-500"
}`}
>
{facility.availabilityStatus === "available"
? "Available ✅"
: "Unavailable ❌"}
</p>
<p className="mt-2 text-yellow-500">⭐⭐⭐⭐☆</p>
</div>

<Link to={`/customer/booking/${facility.facilityId}`}>
<button
className={`mt-4 w-full py-2 rounded-lg font-medium text-white transition-colors ${
facility.availabilityStatus === "available"
? "bg-green-600 hover:bg-green-700"
: "bg-gray-400 cursor-not-allowed"
}`}
disabled={facility.availabilityStatus !== "available"}
>
{facility.availabilityStatus === "available"
? "Book Now"
: "Unavailable"}
</button>
</Link>
</div>
</div>
))}
</div>
)}
</div>
);
};

export default TurfList;