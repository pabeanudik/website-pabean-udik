import { supabase } from "./supabase";

export async function uploadImage(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `produk/${fileName}`;

  const { data, error } = await supabase.storage
    .from('pabean-assets') // Nama bucket yang kamu buat di Supabase
    .upload(filePath, file);

  if (error) throw error;

  // Ambil URL Publik
  const { data: { publicUrl } } = supabase.storage
    .from('pabean-assets')
    .getPublicUrl(filePath);

  return publicUrl;
}
