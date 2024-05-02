"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import for Next.js 13.0.0+

const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [editableProduct, setEditableProduct] = useState(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/edit');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product.productid === productId);
    setEditableProduct(productToEdit);
  };

  const handleSave = async () => {
    try {
      const { productid, name, category, description, price, stock } = editableProduct;
      const updatedProductData = { name, category, description, price, stock };
  
      const response = await fetch(`/api/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productid,
          updatedProductData: updatedProductData,
        }),
      });
  
      if (response.ok) {
        const updatedProduct = await response.json();
        console.log('Product updated:', updatedProduct);
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
       const response = await fetch(`/api/delete/${productId}`, {
         method: 'DELETE',
       });
   
       if (response.ok) {
         const updatedProducts = products.filter(product => product.productid !== productId);
         setProducts(updatedProducts);
         console.log('Product deleted successfully');
       } else {
         console.error('Failed to delete product');
       }
    } catch (error) {
       console.error('Error deleting product:', error);
    }
   };
   

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProduct({
      ...editableProduct,
      [name]: value,
    });
  };

  const handleLogout = () => {
    // Perform any logout logic here, such as clearing user tokens
    // Then navigate to the home page
    router.push('/');
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mb-8">Products</h1>
      <button onClick={handleLogout} className="logout-button">Logout</button> {/* Logout button */}
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Id
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.productid}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.productid}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editableProduct && editableProduct.productid === product.productid ? (
                      <input
                        className="text-sm text-gray-900"
                        type="text"
                        name="name"
                        value={editableProduct.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="text-sm text-gray-900">{product.name}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editableProduct && editableProduct.productid === product.productid ? (
                      <input
                        className="text-sm text-gray-900"
                        type="text"
                        name="category"
                        value={editableProduct.category}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="text-sm text-gray-900">{product.category}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editableProduct && editableProduct.productid === product.productid ? (
                      <input
                        className="text-sm text-gray-900"
                        type="text"
                        name="description"
                        value={editableProduct.description}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="text-sm text-gray-900 truncate">{product.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editableProduct && editableProduct.productid === product.productid ? (
                      <input
                        className="text-sm text-gray-900"
                        type="number"
                        name="price"
                        value={editableProduct.price}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="text-sm text-gray-900">${product.price}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editableProduct && editableProduct.productid === product.productid ? (
                      <input
                        className="text-sm text-gray-900"
                        type="number"
                        name="stock"
                        value={editableProduct.stock}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="text-sm text-gray-900">{product.stock}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    {editableProduct && editableProduct.productid === product.productid ? (
                      <button onClick={handleSave} className="text-indigo-600 hover:text-indigo-900 mr-2">
                        Save
                      </button>
                    ) : (
                      <button onClick={() => handleEdit(product.productid)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                        Edit
                      </button>
                    )}
                    <button onClick={() => handleDelete(product.productid)} className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
