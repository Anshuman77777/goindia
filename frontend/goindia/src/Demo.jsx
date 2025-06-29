//File Creating only for testing purpose

import { useEffect, useState } from "react";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./api/user_api";

import {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
} from "./api/college_api";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductsByCategory,
  getProductsByCollegeId,
  getProductsByUserId,
  updateProduct,
} from "./api/product_api";
import { getUpvotesByProductId, hasUserUpvotedProduct, removeUpvote } from "./api/upvote_api";

function Demo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // product = {title,hookLine,description,college_id,,user_id, product_link,yt_link,logo_url,category}
  useEffect(() => {
    async function fetchUsers() {
      const users = await getAllUsers();
      setData(users);
    }
    setLoading(false);
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Demo Component</h1>
      <button onClick={async () => setData(await getAllUsers())}>
        Get All Users
      </button>

      {/* Directly print the full array as JSON */}
      {loading ? <p>Loading...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default Demo;
