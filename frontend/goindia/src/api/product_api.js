import { supabase } from '../supabaseClient';
import { updatedAtTimeStampZ } from '../util/util';

// product = {title,hookLine,description,college_id,,user_id, product_link,yt_link,logo_url,category}
export const createOrUpdateProductWithAssets = async ({ productData, logoFile, imageFiles }) => {
  let productId = productData?.id || null;
  const uploadedImages = [];

  // 1. Insert or update product
  let product;
  if (productId) {
    const { data, error } = await supabase
      .from('products')
      .update({ ...productData, updated_at: updatedAtTimeStampZ?.() || new Date().toISOString() })
      .eq('id', productId)
      .select()
      .single();

    if (error) {
      console.error('Failed to update product:', error);
      return null;
    }
    product = data;
  } else {
    const { data, error } = await supabase.from('products').insert(productData).select().single();

    if (error || !data?.id) {
      console.error('Failed to create product:', error);
      return null;
    }
    product = data;
    productId = data.id;
  }

  // 2. Upload logo
  if (logoFile) {
    const logoPath = `product_${productId}/logo.png`;
    const { error } = await supabase.storage
      .from('product-images')
      .upload(logoPath, logoFile, { upsert: true });

    if (error) {
      console.error('Error uploading logo:', error);
    } else {
      const { data: logoURLData } = supabase.storage.from('product-images').getPublicUrl(logoPath);

      const logoUrl = logoURLData?.publicUrl;

      if (logoUrl) {
        await supabase
          .from('products')
          .update({ logo_url: logoUrl, updated_at: updatedAtTimeStampZ?.() })
          .eq('id', productId);
      }
    }
  }

  // 3. Handle images
  const folder = `product_${productId}/images`;

  // Clear old DB rows and storage files
  await supabase.from('product_images').delete().eq('product_id', productId);

  const { data: oldFiles } = await supabase.storage.from('product-images').list(folder);

  if (oldFiles?.length > 0) {
    const paths = oldFiles.map((file) => `${folder}/${file.name}`);
    await supabase.storage.from('product-images').remove(paths);
  }

  // Upload new images
  for (let i = 0; i < (imageFiles?.length || 0); i++) {
    const file = imageFiles[i];
    const path = `${folder}/${i + 1}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(path, file, { upsert: true });

    if (uploadError) {
      console.error(`Image ${i + 1} upload failed:`, uploadError);
      continue;
    }

    const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(path);

    const imageUrl = urlData?.publicUrl;
    if (!imageUrl) continue;

    uploadedImages.push(imageUrl);

    await supabase.from('product_images').insert({
      product_id: productId,
      image_url: imageUrl,
      order: i + 1,
    });
  }

  return {
    product,
    id: productId,
    uploadedImages,
    message: productData.id ? 'Product updated.' : 'Product created.',
  };
};

// Soft delete product
export async function deleteProduct(productId) {
  if (!productId) {
    console.error('Invalid product ID');
    return null;
  }

  const { data: product, error: dbError } = await supabase
    .from('products')
    .update({
      isDeleted: true,
      updated_at: updatedAtTimeStampZ?.() || new Date().toISOString(),
    })
    .eq('id', productId)
    .select()
    .single();

  if (dbError) {
    console.error('Error soft-deleting product:', dbError);
    return null;
  }

  const logoPath = `product_${productId}/logo.png`;
  const imageFolder = `product_${productId}/images`;

  const { data: imageFiles, error: listError } = await supabase.storage
    .from('product-images')
    .list(imageFolder);

  if (listError) {
    console.error('Error listing product images:', listError);
  } else {
    const imagePaths = imageFiles.map((file) => `${imageFolder}/${file.name}`);
    if (imagePaths.length > 0) {
      const { error: deleteImagesError } = await supabase.storage
        .from('product-images')
        .remove(imagePaths);

      if (deleteImagesError) {
        console.error('Failed to delete image files:', deleteImagesError);
      }
    }
  }

  const { error: deleteLogoError } = await supabase.storage
    .from('product-images')
    .remove([logoPath]);

  if (deleteLogoError) {
    console.error('Failed to delete logo file:', deleteLogoError);
  }

  return product;
}

export async function getAllProducts(page = 1, pageSize = 10) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('isDeleted', false)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data;
}

export async function getProductById(productId) {
  const { data, error } = await supabase.from('products').select('*').eq('id', productId).single();

  if (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
  return data;
}

// Function to get products by college ID
export async function getProductsByCollegeId(collegeId, page = 1, pageSize = 10) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('college_id', collegeId)
    .eq('isDeleted', false)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching products by college ID:', error);
    return [];
  }
  return data;
}

// Function to get products by user ID
export async function getProductsByUserId(userId, page = 1, pageSize = 10) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', userId)
    .eq('isDeleted', false)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching products by user ID:', error);
    return [];
  }
  return data;
}

// Function to get products by category
export async function getProductsByCategory(category, page = 1, pageSize = 10) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .eq('isDeleted', false)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
  return data;
}
