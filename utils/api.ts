// // src/utils/api.ts
// import { DewantaraMuda, DewantaraMudaApiResponse } from 'custom';


// import axios from 'axios';

// const API_BASE_URL = 'https://example.com/api';

// export const getDewantaraMudaData = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/dewantaraMuda`);
//     return response.data as DewantaraMudaApiResponse;
//   } catch (error) {
//     throw new Error('Failed to fetch Dewantara Muda data');
//   }
// };

// // Tambahkan fungsi utilitas lainnya untuk operasi CRUD sesuai kebutuhan

import axios from 'axios';

// Fungsi untuk mengambil data dari API
export const fetchData = async () => {
  try {
    const response = await axios.get('https://my-json-server.typicode.com/typicode/demo/db');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk mengirim data baru ke API
export const insertData = async (newPost: any) => {
  try {
    const response = await axios.post('https://my-json-server.typicode.com/typicode/demo/posts', newPost);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk memperbarui data di API
export const updateData = async (postId: number, updatedPost: any) => {
  try {
    const response = await axios.put(`https://my-json-server.typicode.com/typicode/demo/posts/${postId}`, updatedPost);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk menghapus data di API
export const deleteData = async (postId: number) => {
  try {
    const response = await axios.delete(`https://my-json-server.typicode.com/typicode/demo/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
