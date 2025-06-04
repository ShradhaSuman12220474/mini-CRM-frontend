import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { baseURL } from '../utils/config.js';
function Customers() {
  const [csvFile, setCsvFile] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  let user = localStorage.getItem('user-info');
  user = JSON.parse(user);

  const {token} = user;


  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!csvFile) return alert('Please select a file.');

    const formData = new FormData();
    formData.append('file', csvFile);
    // formData.append('user', JSON.stringify({ id: 'dummy-user-id' })); // Replace with real user info

    try {
      setLoading(true);
      await axios.post(`${baseURL}/uploads/customers`, formData, {
        headers: {
          'x-access-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded!');
      fetchCustomers();
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error uploading file.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${baseURL}/customers`, {
        headers: {
          'x-access-token': token,
        },
      });
      setCustomers(res.data.data|| []);
    } catch (err) {
      console.error('Fetching error:', err);
      alert('Could not fetch customers.');
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className='flex flex-row'>
        <Sidebar/>

    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Customers</h2>

      <div className="flex items-center gap-4 mb-6">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="file-input file-input-bordered file-input-sm w-full max-w-xs"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="btn btn-success btn-sm"
        >
          {loading ? 'Uploading...' : 'Upload CSV'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">No customers found.</td>
              </tr>
            ) : (
              customers.map((cust, idx) => (
                <tr key={idx}>
                  <td>{cust.name || 'N/A'}</td>
                  <td>{cust.email || 'N/A'}</td>
                  <td>{cust.phone || 'N/A'}</td>
                  <td>{cust.location || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default Customers;
