import { supabase } from "../../supabaseClient";
import { updatedAtTimeStampZ } from "../util/util";

// college = {college_name}
export async function createCollege(college) {
  const { data, error } = await supabase
    .from("colleges")
    .insert(college)
    .select()
    .single();
  if (error) {
    console.error("Error creating college:", error);
    return null;
  }
  return data;
}

export async function getAllColleges(page = 1, pageSize = 10) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error } = await supabase
    .from("colleges")
    .select("*")
    .eq("isDeleted", false)
    .order("college_name", { ascending: true })
    .range(from, to);

  if (error) {
    console.error("Error creating college:", error);
    return null;
  }
  return data;
}

export async function getCollegeById(collegeId) {
  const { data, error } = await supabase
    .from("colleges")
    .select("*")
    .eq("id", collegeId)
    .single();
  if (error) {
    console.error("Error creating college:", error);
    return null;
  }
  return data;
}

// college = {college_name}
export async function updateCollege(collegeId, college) {
  const { data, error } = await supabase
    .from("colleges")
    .update({
      ...college,
      updated_at: updatedAtTimeStampZ(),
    })
    .eq("id", collegeId)
    .select()
    .single();
  if (error) {
    console.error("Error creating college:", error);
    return null;
  }
  return data;
}

//soft delete college
export async function deleteCollege(collegeId) {
  const { data, error } = await supabase
    .from("colleges")
    .update({
      isDeleted: true,
      updated_at: updatedAtTimeStampZ(),
    })
    .eq("id", collegeId)
    .select()
    .single();
  if (error) {
    console.error("Error creating college:", error);
    return null;
  }
  return data;
}
