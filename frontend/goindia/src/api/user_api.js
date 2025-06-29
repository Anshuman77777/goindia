import { supabase } from "../../supabaseClient";
import { updatedAtTimeStampZ } from "../util/util";

export async function getAllUsers(page = 1, pageSize = 10) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("isDeleted", false)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return data;
}

// id = user uuid
export async function getUserById(id) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
  return data;
}

// id = user uuid  userData = { name, email, user_name, }
export async function updateUser(id, userData) {
  const updatedUserData = {
    ...userData,
    updated_at: updatedAtTimeStampZ(),
  };

  const { data, error } = await supabase
    .from("users")
    .update(updatedUserData)
    .eq("id", id)
    .select("*");

  if (error) {
    console.error("Error updating user:", error);
    return null;
  }
  return data;
}

// id = user uuid
export async function deleteUser(id) {
  const { data, error } = await supabase
    .from("users")
    .update({
      isDeleted: true,
      updated_at: updatedAtTimeStampZ(),
    })
    .eq("id", id)
    .select("*");

  if (error) {
    console.error("Error soft-deleting user:", error);
    return null;
  }

  console.log("User soft-deleted:", data);
  return data;
}
