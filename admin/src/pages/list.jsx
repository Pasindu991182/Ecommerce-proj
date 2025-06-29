import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const currency = "$";

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to fetch products.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error(error.response?.data?.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message || "Deletion failed.");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete product.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Product Management</h2>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-5 gap-4 bg-blue-50 text-blue-700 font-semibold px-6 py-4 border-b">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading products...</div>
        ) : list.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No products found.</div>
        ) : (
          list.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-5 gap-4 items-center px-6 py-4 border-b hover:bg-gray-50 transition"
            >
              <img
                src={item.image?.[0] || "/placeholder.jpg"}
                alt={item.name || "Product Image"}
                className="w-16 h-16 object-cover rounded-md border"
              />
              <p className="text-gray-800 font-medium truncate">{item.name}</p>
              <p className="text-gray-600">{item.category}</p>
              <p className="text-green-600 font-semibold">{currency}{item.price}</p>
              <button
                onClick={() => removeProduct(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
