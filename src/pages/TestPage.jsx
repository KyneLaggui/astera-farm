import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signUpWithEmailAndPassword } from "@src/supabase/actions";
import FetchUserProfile from '@src/custom-hooks/fetchUserProfile';
import { supabase } from '@src/supabase/config';
import FetchAllProduct from '@src/custom-hooks/fetchAllProduct';

const TestPage = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    logo: null,
    sellMethod: "",
    attributes: [],
  });

  const [attributeInput, setAttributeInput] = useState("");

  const { products } = FetchAllProduct();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setProduct({ ...product, logo: files[0] });
    } else if (name === "attribute") {
      setAttributeInput(value);
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const addAttribute = (e) => {
    if (e.key === 'Enter' && attributeInput.trim()) {
      setProduct({ ...product, attributes: [...product.attributes, attributeInput] });
      setAttributeInput("");
    }
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    const { logo, ...productData } = product;

    const logoFileExt = logo.name.split('.').pop();

    const productInsertion = await supabase
      .from('product')
      .insert({
        name: productData.name,
        price: productData.price,
        description: productData.description,
        sell_method: productData.sellMethod,
        attributes: productData.attributes,
      })
      .select()
      .single()

    console.log(productInsertion.data.id)
    // if (data) {
    //   console.log(data) 
    // }  else {
    //   console.log(error)
    // }

    const iconUpload = await supabase.storage
      .from("products")
      .upload(`public/2.${logoFileExt}`, logo, {
        cacheControl: "3600",
        upsert: true,
      });
  };

  FetchUserProfile();

  const handleRegister = async () => {
    signUpWithEmailAndPassword(
      'josephbuhain27@Gmail.com',
      'hellowws',
      'hellowws',
      'joseph',
      'supelario',
      'buhain',
      '03293929392932'
    );
  };

  const handleLogin = async () => {
    signInWithEmailAndPassword('josephbuhain27@Gmail.com', 'hellowws');
  };

  useEffect(() => {
    console.log(products)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Create a New Product</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Product Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description:</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Price:</label>
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Sell Method:</label>
            <input
              type="text"
              name="sellMethod"
              value={product.sell_method}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Logo:</label>
            <input
              type="file"
              name="logo"
              onChange={handleChange}
              className="w-full text-gray-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Attributes:</label>
            <input
              type="text"
              name="attribute"
              value={attributeInput}
              onChange={handleChange}
              onKeyDown={addAttribute}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Press Enter to add"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Current Attributes:</label>
            <ul className="list-disc list-inside space-y-1">
              {product.attributes.map((attr, index) => (
                <li key={index} className="text-gray-600">{attr}</li>
              ))}
            </ul>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold rounded-lg p-3 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={submitProduct} 
          >
            Submit Product
          </button>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleRegister}
          className="mr-4 bg-green-500 text-white font-semibold rounded-lg p-3 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Test Register
        </button>
        <button
          onClick={handleLogin}
          className="bg-yellow-500 text-white font-semibold rounded-lg p-3 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default TestPage;
