import React, { useState } from 'react';
import CollegeCard from '../components/Collegecard';
import techobanner from '../assets/techobanner.png';
const College = () => {
  const [colleges, setColleges] = useState([
    {
      name: 'MSU',
      location: 'Vadodara',
      image: techobanner,
      website: 'https://www.ftemsu.com',
      ideas: 6,
      backImage: 'https://i.imgur.com/FZ0H3Yw.png',
    },
  ]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    website: '',
    backImage: '',
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const index = colleges.findIndex(
      (college) => college.name.toLowerCase().trim() === formData.name.toLowerCase().trim()
    );
    if (index !== -1) {
      const updated = [...colleges];
      updated[index].ideas += 1;
      setColleges(updated);
    } else {
      setColleges((prev) => [
        ...prev,
        {
          ...formData,
          ideas: 1,
          image: techobanner,
        },
      ]);
    }
    setFormData({ name: '', location: '', website: '', backImage: '' });
  };
  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Explore Your College Ideas Here
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {colleges.map((college, index) => (
          <CollegeCard key={index} {...college} />
        ))}
      </div>
    </div>
  );
};

export default College;
