import { supabase } from "../../supabaseClient";
import { updatedAtTimeStampZ } from "../util/util";

// product = {title,hookLine,description,college_id,,user_id, product_link,yt_link,logo_url,category}
export async function createProduct(product) {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) {
    console.error("Error creating product:", error);
    return null;
  }
  return data;
}

export async function getAllProducts(page = 1, pageSize = 10) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("isDeleted", false)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data;
}

export async function getProductById(productId) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
  return data;
}

// product = {title,hookline,description,college_id,,user_id, product_link,yt_link,logo_url,category}
export async function updateProduct(productId, product) {
  const { data, error } = await supabase
    .from("products")
    .update({
      ...product,
      updated_at: updatedAtTimeStampZ(),
    })
    .eq("id", productId)
    .select()
    .single();

  if (error) {
    console.error("Error updating product:", error);
    return null;
  }
  return data;
}

// Soft delete product
export async function deleteProduct(productId) {
  const { data, error } = await supabase
    .from("products")
    .update({
      isDeleted: true,
      updated_at: updatedAtTimeStampZ(),
    })
    .eq("id", productId)
    .select()
    .single();

  if (error) {
    console.error("Error deleting product:", error);
    return null;
  }
  return data;
}

// Function to get products by college ID
export async function getProductsByCollegeId(collegeId, page = 1, pageSize = 10) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("college_id", collegeId)
    .eq("isDeleted", false)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching products by college ID:", error);
    return [];
  }
  return data;
}

// Function to get products by user ID
export async function getProductsByUserId(userId, page = 1, pageSize = 10) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("user_id", userId)
    .eq("isDeleted", false)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching products by user ID:", error);
    return [];
  }
  return data;
}

// Function to get products by category
export async function getProductsByCategory(category, page = 1, pageSize = 10) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .eq("isDeleted", false)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
  return data;
}
