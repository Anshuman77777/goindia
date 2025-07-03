import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import react from '../assets/react.svg';
import MediaDisplay from '../components/MediaDisplay';
import { UserContext } from '../App';

function ViewProduct() {
  const project = useLocation().state;
  const { session, setSession } = useContext(UserContext);
  const likeProduct = async () => {};
  return (
    <div className="h-full my-2 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-y-auto">
      <img src={react} className="w-10 h-10" />
      <h2 className="text-2xl font-bold text-gray-800">{project.title}</h2>
      <p className="italic text-gray-600 mt-1">{project.hookLine}</p>

      <p className="text-gray-700 mt-4">{project.description}</p>
      <MediaDisplay />
      <div className="mt-4 space-y-1 text-sm text-gray-700">
        <p>
          <span className="font-medium">Author:</span> {project.author}
        </p>
        <p>
          <span className="font-medium">College:</span> {project.college}
        </p>
        {project.isCollegeStartup && (
          <span className="inline-block mt-1 px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full font-semibold">
            🎓 College Startup
          </span>
        )}
      </div>

      <p className="mt-4 font-semibold text-indigo-600">
        {' '}
        <button onClick={likeProduct}>⬆️</button> {project.upvotes} Upvotes
      </p>

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 px-4 py-2 bg-india-green text-white rounded-lg hover:bg-green-500 transition"
      >
        Visit
      </a>
    </div>
  );
}

export default ViewProduct;
