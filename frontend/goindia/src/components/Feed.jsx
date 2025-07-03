import React from 'react';
import demodata from '../assets/demodata.json';
import SingleProduct from './SingleProduct';
function Feed() {
  return (
    <div>
      {demodata.map((product) => (
        <SingleProduct product={product} />
      ))}
    </div>
  );
}

export default Feed;
