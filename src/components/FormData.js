// DisplayFormData.js
import React from 'react';

function DisplayFormData({ formData }) {
  return (
    <div className='flex fle-col justify-center align-middle '>
        <div className=' w-[50%] mt-2'>
      <h2 className="text-xl font-semibold mb-2 mx-auto">Submitted Data</h2>
      <div className="border p-4 rounded-md shadow-md">
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700">First Name:</span>
          <p className="text-lg font-medium">{formData.firstName}</p>
        </div>
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700">Last Name:</span>
          <p className="text-lg font-medium">{formData.lastName}</p>
        </div>
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700">Email:</span>
          <p className="text-lg font-medium">{formData.email}</p>
        </div>
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700">Country:</span>
          <p className="text-lg font-medium">{formData.country}</p>
        </div>
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700">State:</span>
          <p className="text-lg font-medium">{formData.state}</p>
        </div>
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700">City:</span>
          <p className="text-lg font-medium">{formData.city}</p>
        </div>
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700">Gender:</span>
          <p className="text-lg font-medium capitalize">{formData.gender}</p>
        </div>
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700">Date of Birth:</span>
          <p className="text-lg font-medium">{formData.dateOfBirth}</p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayFormData;
