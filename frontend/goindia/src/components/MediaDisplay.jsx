import React from 'react';
import demopreview from '../assets/demopreview.jpg';
function MediaDisplay() {
  return (
    <div className="my-3 overflow-x-auto whitespace-nowrap ">
      <img src={demopreview} className="card inline-block mx-1" />
      <img src={demopreview} className="card inline-block" />
      <img src={demopreview} className="card inline-block mx-1" />
    </div>
  );
}

export default MediaDisplay;
