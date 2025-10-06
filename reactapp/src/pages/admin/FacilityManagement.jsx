import React, { useEffect, useState } from 'react';
import { getFacilities, deleteFacility } from '../../api/facilities';

const FacilityManagement = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all facilities
  const fetchFacilities = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getFacilities();
      setFacilities(res.data || []);
    } catch (err) {
      console.error('Fetch failed:', err.response || err.message);
      setError('Failed to fetch facilities.');
    } finally {
      setLoading(false);
    }
  };

  // Delete facility
  const handleDelete = async (facilityId) => {
    if (!facilityId) {
      alert('Facility ID is invalid. Cannot delete.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this facility?')) return;

    try {
      console.log('Deleting facility ID:', facilityId);
      await deleteFacility(facilityId);
      alert('Facility deleted successfully!');
      fetchFacilities(); // refresh list
    } catch (err) {
      console.error('Delete failed:', err.response || err.message);
      alert('Failed to delete facility. Please try again.');
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  return (
<div className="p-8 bg-gray-100 min-h-screen">
<h1 className="text-3xl font-bold mb-6">Facility Management</h1>

{loading && <p className="text-blue-600 mb-4">Loading facilities...</p>}
{error && <p className="text-red-600 mb-4">{error}</p>}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{facilities.length === 0 && !loading && (
<p className="col-span-3 text-center text-gray-600">No facilities found.</p>
)}

{facilities.map((facility) => (
<div key={facility.facilityId} className="bg-white rounded-xl shadow overflow-hidden">
<img
src={
facility.image ||
'https://5.imimg.com/data5/WL/OD/LK/SELLER-24553700/maverick-turf-football-grass-monofilament-pe-moon-500x500.jpg'
}
alt={facility.name}
className="w-full h-48 object-cover"
/>
<div className="p-4">
<h2 className="text-xl font-semibold">{facility.name || 'Unnamed Facility'}</h2>
<p className="text-gray-600">{facility.type || 'Unknown Type'}</p>
<p className="text-gray-500 text-sm">{facility.location || ''}</p>
<p className="text-gray-500 text-sm">Status: {facility.availabilityStatus || 'N/A'}</p>
<div className="mt-4 flex gap-2">
<button className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700">
Edit
</button>
<button
onClick={() => handleDelete(facility.facilityId)}
className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700"
>
Delete
</button>
</div>
</div>
</div>
))}
</div>
</div>
);
};

export default FacilityManagement;