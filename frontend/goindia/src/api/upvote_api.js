import { supabase } from "../../supabaseClient";

//duplicate not allowed
// composite key: product_id, user_id
export async function upvoteProduct(productId, userId) {
  const { data, error } = await supabase
    .from("upvotes")
    .insert({
      product_id: productId,
      user_id: userId,
    })
    .select()
    .single();

  if (error) {
    console.error("Error upvoting product:", error);
    return null;
  }
  return data;
}

export async function getUpvotesByProductId(productId) {
    //just count rows
const { count, error } = await supabase
  .from("upvotes")
  .select("*", { count: "exact", head: true }) // head: true = don't return rows
  .eq("product_id", productId)
  .eq("isDeleted", false); // optional if you're soft-deleting


  if (error) {
    console.error("Error fetching upvotes by product ID:", error);
    return [];
  }
  return count;
}

//how to check if that user has already upvoted that product
export async function hasUserUpvotedProduct(productId, userId) {
  const { data, error } = await supabase
    .from("upvotes")
    .select("*")
    .eq("product_id", productId)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error checking if user has upvoted product:", error);
    return false;
  }
  return data !== null;
}

//someone can remove their upvote
export async function removeUpvote(productId, userId) {
  const { data, error } = await supabase
    .from("upvotes")
    .delete()
    .eq("product_id", productId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error removing upvote:", error);
    return null;
  }
  return data;
}