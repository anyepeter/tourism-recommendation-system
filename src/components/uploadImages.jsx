import { createClient } from '@supabase/supabase-js';



const supabaseUrlImage = "https://rblngypspezkbpbzeauk.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibG5neXBzcGV6a2JwYnplYXVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTMxMjAwNywiZXhwIjoyMDM2ODg4MDA3fQ.ol6qpz08YZR3zylvNPf6yZVc5nNTkJEl_hTDZKAwbO8"
const supabase = createClient(supabaseUrlImage, supabaseKey);

export const uploadImagesAndGetUrls = async (images, bucket) => {
  const uploadedUrls = [];

  for (const image of images) {
    const fileName = `${new Date().getTime()}-${image.name}`;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, image);

    if (error) {
      console.error('Error uploading image:', error);
      continue;
    }

    const { data: publicURL, error: urlError } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    let imageUrl = publicURL.publicUrl;


    if (urlError) {
      console.error('Error getting public URL:', urlError);
      continue;
    }

    uploadedUrls.push(imageUrl);
  }


  return uploadedUrls;
};