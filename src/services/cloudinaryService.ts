import axios from 'axios';

interface UploadResponse {
  url: string;
}

export const uploadImageToCloudinary = async (
  file: File
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'uwvdbwo');

  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dhhg0lnlq/image/upload',
      formData
    );
    const { secure_url } = response.data;
    return { url: secure_url };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
};
