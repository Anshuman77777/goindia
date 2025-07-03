import React, { useState } from "react";
import {
  createOrUpdateProductLogo,
  createOrUpdateProductImages,
} from "./api/product_images_api";

const Demo = () => {
  const [logoFile, setLogoFile] = useState(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [displayFiles, setDisplayFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const productId = "01bed98f-cc84-4bfa-a18b-e9ae035d5972";

  async function handleUpload () {
    if (!logoFile) return setError("Please select a logo image.");

    try {
      setLoading(true);
      setError("");
      setUrl("");

      const logoUrl = await createOrUpdateProductLogo(productId, logoFile);
      console.log("Uploaded logo URL:", logoUrl);
      setUrl(logoUrl.logo_url);

    } catch (err) {
      console.error("Upload failed:", err.message);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setDisplayFiles(files);

    // const previews = files.map((file) => URL.createObjectURL(file));
    // setPreviewUrls(previews);
  };

  const handleUploadImages = async () => {
    if (!displayFiles.length) return alert("No images selected.");
    const uploaded = await createOrUpdateProductImages(productId, displayFiles);
    setImageUrls(uploaded);

    if (uploaded.length > 0) {
      console.log("Successfully uploaded images:", uploaded);
      alert("Images uploaded ✅");
    } else {
      console.warn("No images uploaded.");
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      {/* Upload logo */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setLogoFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Logo"}
      </button>

      {error && <p className="text-red-600">{error}</p>}

      {url && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Uploaded Logo:</h3>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 break-all underline"
          >
            {url}
          </a>
          <img
            src={`${url}?t=${Date.now()}`}
            alt="logo"
            className="mt-2 w-32 h-32 object-cover border rounded"
          />
        </div>
      )}

      <hr className="my-4" />

      {/* Upload product images */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <button
        onClick={handleUploadImages}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Upload Product Images
      </button>

      {imageUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-4">
          {imageUrls.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index + 1}`}
              className="w-24 h-24 object-cover rounded border"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Demo;
