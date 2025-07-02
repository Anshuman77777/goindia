import React from "react";

const CollegeCard = ({ name, location, image, website, ideas, backImage }) => {
  return (
    <div className="w-96 h-64 perspective">
      <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-180">
        <div className="absolute inset-0 bg-white border rounded-xl shadow-md backface-hidden">
          <figure className="w-full h-32 overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </figure>
          <div className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-sm text-gray-600">{website}</p>
            <div className="pt-2">
              <button className="btn btn-primary">{ideas} Total Ideas</button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gray-900 text-white rounded-xl backface-hidden rotate-y-180">
          <img
            src={backImage}
            alt="Back"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
