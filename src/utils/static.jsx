import axios from "axios";

export const getUserImage = async (imageName) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/static/show_image/uploads/${imageName}`, {
        responseType: 'blob', // Agar gambar dikembalikan dalam bentuk file
      });
  
      // Mengonversi Blob menjadi URL yang dapat digunakan di <img src="">
      const imageURL = URL.createObjectURL(response.data);
      return imageURL;
    } catch (error) {
      console.error('Error fetching event image:', error);
      return null; // Kembalikan null jika terjadi kesalahan
    }
  };