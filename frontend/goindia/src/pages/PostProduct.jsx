import React, { useState } from 'react';
import Select from 'react-select';
const colleges = [
  "Maharaja Sayajirao University of Baroda (MSU)",
  "Navrachana University (NUV)",
  "Ahmedabad University",
  "Gujarat University",
  "Gujarat Technological University (GTU)",
  "Gujarat Vidyapith",
  "Nirma University",
  "CEPT University",
  "Dhirubhai Ambani Institute of Information and Communication Technology (DAIICT)",
  "Pandit Deendayal Energy University (PDEU)",
  "Charotar University of Science and Technology (CHARUSAT)",
  "Marwadi University",
  "Ganpat University",
  "Parul University",
  "Indus University",
  "RK University",
  "ITM Vocational University",
  "Anand Agricultural University",
  "Junagadh Agricultural University",
  "Sardar Patel University",
  "Saurashtra University",
  "Veer Narmad South Gujarat University",
  "Krantiguru Shyamji Krishna Verma Kachchh University",
  "Bhakta Kavi Narsinh Mehta University",
  "Dr. Babasaheb Ambedkar Open University",
  "Uka Tarsadia University",
  "Silver Oak University",
  "Swarnim Startup and Innovation University",
  "TeamLease Skills University",
  "Indian Institute of Technology Gandhinagar (IITGN)",
  "Indian Institute of Management Ahmedabad (IIMA)",
  "National Institute of Design (NID) Ahmedabad",
  "National Forensic Sciences University (NFSU)",
  "Institute of Infrastructure Technology Research and Management (IITRAM)",
  "Indian Institute of Information Technology Vadodara (IIIT-V)",
  "Central University of Gujarat (CUG)",
  "Children’s University, Gandhinagar",
  "None"
];

// Convert to react-select format
const collegeOptions = colleges.map(college => ({ value: college, label: college }));
function PostProduct() {
  const [formData, setFormData] = useState({
    title: '',
    hookLine: '',
    description: '',
    author: '',
    college: '',
    upvotes: 0,
    link: '',
    logo: '',
    images: [],
    youtubelink: '',
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
 const handleCollegeChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, college: selectedOption.value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const logoURL = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, logo: logoURL }));
    }
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, images: imageURLs }));
    setImagePreviews(imageURLs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Submit a Startup</h2>
      <form onSubmit={handleSubmit} className="space-y-3">

        <input name="title" type="text" placeholder="Title" required value={formData.title}
          onChange={handleChange} className="w-full border px-3 py-2 rounded" />

        <input name="hookLine" type="text" placeholder="Hook Line" required value={formData.hookLine}
          onChange={handleChange} className="w-full border px-3 py-2 rounded" />

        <textarea name="description" placeholder="Description" required value={formData.description}
          onChange={handleChange} className="w-full border px-3 py-2 rounded" />

        <input name="author" type="text" placeholder="Author" required value={formData.author}
          onChange={handleChange} className="w-full border px-3 py-2 rounded" />
 
 <label className="block mb-1 font-medium">Select College</label>
      <Select
        options={collegeOptions}
        onChange={handleCollegeChange}
        className="mb-3"
        placeholder="Select your college"
        isSearchable
      />

        <input name="link" type="url" placeholder="Website Link" value={formData.link}
          onChange={handleChange} className="w-full border px-3 py-2 rounded" />

        <input name="youtubelink" type="url" placeholder="YouTube Link" value={formData.youtubelink}
          onChange={handleChange} className="w-full border px-3 py-2 rounded" />

        <label className="block">
          <span className="text-sm">Upload Logo:</span>
          <input type="file" accept="image/*" onChange={handleLogoUpload} className="mt-1" />
        </label>
        {formData.logo && <img src={formData.logo} alt="Logo" className="h-20 mt-2" />}

        <label className="block">
          <span className="text-sm">Upload Images (Max 3):</span>
          <input type="file" accept="image/*" multiple onChange={handleImagesUpload} className="mt-1" />
        </label>

        <div className="flex space-x-2 mt-2">
          {imagePreviews.map((src, i) => (
            <img key={i} src={src} alt={`img-${i}`} className="h-20 w-auto rounded" />
          ))}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4">Submit</button>
      </form>
    </div>
  );
}

export default PostProduct