import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { baseURL } from '../utils/config.js';
export default function Orders() {

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [orders, setOrders] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a CSV file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
        let user = localStorage.getItem('user-info');
        user = JSON.parse(user);
        const {token} = user;
        console.log(token);
      const res = await axios.post(
        `${baseURL}/uploads/orders`, // Update endpoint as needed
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': token,
          },
        }
      );

      setMessage(res.data.message || 'File uploaded successfully.');
      alert("File uploaded successfully");
    } catch (err) {
      console.error(err);
      setMessage('Error uploading file.');
    } finally {
      setUploading(false);
    }
  };
    const fetchOrders = async () => {
    try {
        let user = localStorage.getItem('user-info');
        user = JSON.parse(user);
        const {token} = user;
        // console.log(token);
      const res = await axios.get(
        `${baseURL}/orders`,
        {
          headers: { 'x-access-token': token },
        }
      );
    //   console.log(res.data.data);

      setOrders(res.data.data);
    //   console.log(orders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className='flex flex-row'>
        <Sidebar/>

    {/* <div className="p-6 max-w-xl mx-auto bg-white rounded-lg ">
      <h2 className="text-2xl font-bold mb-4">Upload Orders CSV</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full mb-4"
      />

      <button
        onClick={handleUpload}
        className="btn btn-primary w-full"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload CSV'}
      </button>

      {message && (
        <div className="mt-4 text-center text-sm text-gray-700">{message}</div>
      )}


    </div> */}

    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>

      <div className="flex items-center gap-4 mb-6">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="file-input file-input-bordered file-input-sm w-full max-w-xs"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="btn btn-success btn-sm "
        >
          {uploading ? 'Uploading...' : 'Upload CSV'}
        </button>
      </div>

    <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200 text-sm">
              <th>#</th>
              <th>Order ID</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No orders uploaded yet.
                </td>
              </tr>
            ) : (
              orders.map((order, idx) => (
                <tr key={order._id || idx}>
                  <td>{idx + 1}</td>
                  <td>{order.customer_external_id || '-'}</td>
                  <td>{order.items || '-'}</td>
                  <td>{order.amount || '-'}</td>
                  <td>{new Date(order.createdAt).toLocaleString() || 'NA'}</td>
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
