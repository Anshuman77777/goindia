import React, { useState } from 'react';
import { createOrUpdateProductWithAssets } from './api/product_api';

const Demo = () => {
  const [logoFile, setLogoFile] = useState(null);
  const [displayFiles, setDisplayFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [product, setProduct] = useState({
    title: '',
    hookLine: '',
    description: '',
    // Add other fields as needed
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setDisplayFiles(files);
  };

  const handleSubmit = async () => {
    if (!product.title || !logoFile) {
      return alert('Please enter product title and select a logo.');
    }

    try {
      setLoading(true);
      setMessage('');

      const result = await createOrUpdateProductWithAssets({
        productData: product,
        logoFile,
        imageFiles: displayFiles,
      });

      if (result?.product?.id) {
        setMessage('✅ Product created successfully!');
        setImageUrls(result.uploadedImages);
        console.log('Created:', result);
      } else {
        setMessage('❌ Failed to create product.');
      }
    } catch (err) {
      console.error(err);
      setMessage('⚠️ An error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold">Create Product</h2>

      {/* Product fields */}
      <input
        name="title"
        placeholder="Title"
        value={product.title}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        name="hookLine"
        placeholder="HookLine"
        value={product.hookLine}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded"
      />

      {/* Upload logo */}
      <div>Logo</div>
      <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} />

      {/* Upload display images */}
      <div>Product images</div>
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Uploading...' : 'Create Product with Images'}
      </button>

      {message && <p className="text-sm mt-2 text-center">{message}</p>}

      {/* Display uploaded image previews */}
      {imageUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-4">
          {imageUrls.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Product Image ${index + 1}`}
              className="w-24 h-24 object-cover rounded border"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Demo;
