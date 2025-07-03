import { supabase } from "../../supabaseClient";
import { updatedAtTimeStampZ } from "../util/util";

//create and update product logo
// product-images/logo.png
export const createOrUpdateProductLogo = async (productId, logoFile) => {
  const logoPath = `product_${productId}/logo.png`;

  // 1. Upload logo to storage
  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(logoPath, logoFile, { upsert: true });

  if (uploadError) {
    console.error("Error uploading logo:", uploadError);
    return null;
  }

  // 2. Get public URL
  const { data: logoURLData } = supabase.storage
    .from("product-images")
    .getPublicUrl(logoPath);

  const logoUrl = logoURLData?.publicUrl;

  if (!logoUrl) {
    console.error("Error getting logo public URL");
    return null;
  }

  // 3. Update product record
  const { data, error: updateError } = await supabase
    .from("products")
    .update({
      logo_url: logoUrl,
      updated_at: updatedAtTimeStampZ?.() || new Date().toISOString(),
    })
    .eq("id", productId)
    .select()
    .single();

  if (updateError) {
    console.error("Error updating logo URL in DB:", updateError);
    return null;
  }

  return data; // Updated product object
};


export const createOrUpdateProductImages = async (productId, files) => {
  if (!files || files.length === 0) return [];

  const uploadedImages = [];

  const folder = `product_${productId}/images`;


  const { data: existingEntries, error: fetchError } = await supabase
    .from("product_images")
    .select("image_url");

  if (fetchError) {
    console.error("Failed to fetch existing images:", fetchError);
  }

  // 2. Delete all rows from `product_images` for the product
  const { error: deleteDbError } = await supabase
    .from("product_images")
    .delete()
    .eq("product_id", productId);

  if (deleteDbError) {
    console.error("Failed to delete old DB images:", deleteDbError);
  }

  // 3. Delete old images from storage
  const { data: storageList, error: listError } = await supabase.storage
    .from("product-images")
    .list(folder);

  if (listError) {
    console.error("Failed to list storage files:", listError);
  } else {
    const fileNames = storageList.map((file) => `${folder}/${file.name}`);
    const { error: deleteError } = await supabase.storage
      .from("product-images")
      .remove(fileNames);

    if (deleteError) {
      console.error("Failed to delete storage files:", deleteError);
    }
  }

  // 4. Upload new files and store in DB
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const imagePath = `${folder}/${i + 1}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(imagePath, file, { upsert: true });

    if (uploadError) {
      console.error(`Error uploading image ${i + 1}:`, uploadError);
      continue;
    }

    const { data: publicURLData } = supabase.storage
      .from("product-images")
      .getPublicUrl(imagePath);

    if (!publicURLData || !publicURLData.publicUrl) {
      console.error(`Failed to retrieve public URL for image ${i + 1}`);
      continue;
    }

    const publicUrl = publicURLData.publicUrl;
    uploadedImages.push(publicUrl);

    const { error: dbInsertError } = await supabase
      .from("product_images")
      .insert({
        product_id: productId,
        image_url: publicUrl,
        order: i + 1,
      });

    if (dbInsertError) {
      console.error(`DB insert failed for image ${i + 1}:`, dbInsertError);
      continue;
    }
  }

  return uploadedImages; 
};

export const fetchProductImages = async (productId) => {
  const { data, error } = await supabase
    .from("product_images")
    .select("image_url, order")
    .eq("product_id", productId)
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching images:", error);
    return [];
  }

  return data; // array of { image_url, order }
};
