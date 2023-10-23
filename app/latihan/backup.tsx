"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ApiResponse {
  posts: { id: number; title: string }[];
  comments: { id: number; body: string; postId: number }[];
  profile: { name: string };
}

const PuraPuraPage = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [selectedPost, setSelectedPost] = useState<{ id: number; title: string } | null>(null);
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState('');
  const [showDeleteButton, setShowDeleteButton] = useState(false); // State untuk menampilkan tombol Delete
  const [newPostTitle, setNewPostTitle] = useState(''); // State untuk menyimpan judul post yang akan dimasukkan

  useEffect(() => {
    // Lakukan pemanggilan API di sini
    axios.get('https://my-json-server.typicode.com/typicode/demo/db')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handlePostClick = (post: { id: number; title: string }) => {
    setSelectedPost(post);
  };

  const handleDeletePost = (postId: number) => {
    if (data) {
      const updatedPosts = data.posts.filter((post) => post.id !== postId);
      setData({ ...data, posts: updatedPosts });

      // Kirim permintaan penghapusan ke API (gantilah dengan kode sesuai API Anda)
      axios
        .delete(`https://my-json-server.typicode.com/typicode/demo/posts/${postId}`)
        .then((response) => {
          // Proses respons API jika diperlukan
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const handleCheckboxChange = (postId: number) => {
    if (selectedPosts.includes(postId)) {
      // Hapus postId dari selectedPosts
      setSelectedPosts(selectedPosts.filter((id) => id !== postId));
    } else {
      // Tambahkan postId ke selectedPosts
      setSelectedPosts([...selectedPosts, postId]);
    }

    // Tampilkan tombol Delete jika ada yang terpilih
    setShowDeleteButton(selectedPosts.length > 0);
  };

  const handleEditPost = (editedPost: { id: number; title: string }) => {
    if (data) {
      // Temukan post yang akan diubah dalam data
      const updatedPosts = data.posts.map((post) =>
        post.id === editedPost.id ? editedPost : post
      );

      // Update data dengan judul post yang telah diubah
      setData({ ...data, posts: updatedPosts });

      // Kirim perubahan ke API (gantilah dengan kode sesuai API yang Anda gunakan)
      axios
        .put(`https://my-json-server.typicode.com/typicode/demo/posts/${editedPost.id}`, {
          title: editedPost.title,
        })
        .then((response) => {
          // Proses respons API jika diperlukan
          // Anda mungkin ingin menambahkan log atau perbarui data berdasarkan respons API
          // console.log('Response:', response);
          // setData(updatedData); // Perbarui data jika diperlukan
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle error jika diperlukan
        });

      // Reset selectedPost
      setSelectedPost(null);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      // Deselect all
      setSelectedPosts([]);
    } else {
      // Select all
      setSelectedPosts(data ? data.posts.map((post) => post.id) : []);
    }
    setSelectAll(!selectAll);

    // Tampilkan tombol Delete jika ada yang terpilih
    setShowDeleteButton(selectedPosts.length > 0);
  };

  const handleDeleteSelectedPosts = () => {
    // Tambahkan kode untuk menghapus post yang dipilih
    selectedPosts.forEach((postId) => {
      handleDeletePost(postId);
    });
    setSelectedPosts([]); // Kosongkan selectedPosts setelah dihapus
    setShowDeleteButton(false); // Sembunyikan tombol Delete
  };

  const filteredPosts = data ? data.posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  ) : [];

  const handleInsertData = () => {
    if (newPostTitle.trim() === '') {
      alert('Judul tidak boleh kosong.');
      return;
    }

    if (data) {
      // Buat objek baru untuk data yang akan dimasukkan
      const newPost = {
        id: Date.now(), // Atau gunakan ID yang sesuai
        title: newPostTitle,
      };

      // Update state data dengan data baru
      setData({ ...data, posts: [...data.posts, newPost] });

      // Bersihkan input setelah memasukkan data
      setNewPostTitle('');

      // Anda juga bisa mengirimkan data baru ke API Anda di sini jika perlu
    }
  };

  return (
    <div>
      <h1>Halaman Pura-Pura</h1>
      <input
        type="text"
        placeholder="Cari..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Input untuk memasukkan data baru */}
      <input
        type="text"
        placeholder="Masukkan judul baru"
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
      />
      <button onClick={handleInsertData}>Insert Data</button>

      {data && (
        <div>
          <h2>Posts:</h2>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>ID</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedPosts.includes(post.id)}
                      onChange={() => handleCheckboxChange(post.id)}
                    />
                  </td>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>
                    <button onClick={() => handlePostClick(post)}>Edit</button>
                    <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showDeleteButton && (
            <button onClick={handleDeleteSelectedPosts}>Delete Selected</button>
          )}
          <h2>Comments:</h2>
          <ul>
            {data.comments.map((comment) => (
              <li key={comment.id}>{comment.body}</li>
            ))}
          </ul>

          <h2>Profile:</h2>
          <p>Name: {data.profile.name}</p>
        </div>
      )}

      {selectedPost && (
        <div>
          <h2>Edit Post:</h2>
          <p>ID: {selectedPost.id}</p>
          <input
            type="text"
            value={selectedPost.title}
            onChange={(e) => {
              setSelectedPost({ ...selectedPost, title: e.target.value });
            }}
          />
          <button onClick={() => setSelectedPost(null)}>Cancel</button>
          <button onClick={() => handleEditPost(selectedPost)}>Save</button>
        </div>
      )}
    </div>
  );
};

export default PuraPuraPage;

// "use client"
// import React, { useEffect, useState } from 'react';
// import PuraPuraTable from './table';
// import PuraPuraInsert from './insert';
// import { fetchData, updateData, deleteData, insertData } from '../../utils/api';

// const PuraPuraPage = () => {
//   const [data, setData] = useState<any | null>(null);
//   const [selectedPost, setSelectedPost] = useState<any | null>(null);
//   const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [search, setSearch] = useState('');
//   const [newPostTitle, setNewPostTitle] = useState('');
//   const [showDeleteButton, setShowDeleteButton] = useState(false);

//   useEffect(() => {
//     fetchData()
//       .then((response) => {
//         setData(response);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }, []);

//   const handleInsertData = () => {
//     if (newPostTitle.trim() === '') {
//       alert('Judul tidak boleh kosong.');
//       return;
//     }

//     if (data) {
//       const newPost = {
//         id: Date.now(),
//         title: newPostTitle,
//       };

//       setData({ ...data, posts: [...data.posts, newPost] });
//       setNewPostTitle('');

//       insertData(newPost)
//         .then((response) => {
//           // Proses respons API jika diperlukan
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//         });
//     }
//   };

//   const handleUpdatePost = (editedPost: any) => {
//     if (data) {
//       const updatedPosts = data.posts.map((post: any) =>
//         post.id === editedPost.id ? editedPost : post
//       );
//       const updatedData = { ...data, posts: updatedPosts };

//       setData(updatedData);

//       updateData(editedPost.id, editedPost)
//         .then((response) => {
//           // Proses respons API jika diperlukan
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//         });

//       setSelectedPost(null);
//     }
//   };

//   const handleCheckboxChange = (postId: number) => {
//     if (selectedPosts.includes(postId)) {
//       setSelectedPosts(selectedPosts.filter((id) => id !== postId));
//     } else {
//       setSelectedPosts([...selectedPosts, postId]);
//     }

//     setShowDeleteButton(selectedPosts.length > 0);
//   };

//   const handleDeletePost = (postId: number) => {
//     if (data) {
//       const updatedPosts = data.posts.filter((post: any) => post.id !== postId);
//       setData({ ...data, posts: updatedPosts });

//       deleteData(postId)
//         .then((response) => {
//           // Proses respons API jika diperlukan
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//         });
//     }
//   };

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedPosts([]);
//     } else {
//       setSelectedPosts(data ? data.posts.map((post: any) => post.id) : []);
//     }
//     setSelectAll(!selectAll);

//     setShowDeleteButton(selectedPosts.length > 0);
//   };

//   const handleDeleteSelectedPosts = () => {
//     selectedPosts.forEach((postId) => {
//       handleDeletePost(postId);
//     });
//     setSelectedPosts([]);
//     setShowDeleteButton(false);
//   };

//   const filteredPosts = data
//     ? data.posts.filter((post: any) => post.title.toLowerCase().includes(search.toLowerCase()))
//     : [];

//   const handlePostClick = (post: any) => {
//     setSelectedPost(post);
//   };


//   return (
//     <div>
//       <h1>Halaman Pura-Pura</h1>
//       <input
//         type="text"
//         placeholder="Cari..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Masukkan judul baru"
//         value={newPostTitle}
//         onChange={(e) => setNewPostTitle(e.target.value)}
//       />
//       <button onClick={handleInsertData}>Insert Data</button>

//       {data && (
//         <div>
//           <h2>Posts:</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>
//                   <input
//                     type="checkbox"
//                     checked={selectAll}
//                     onChange={handleSelectAll}
//                   />
//                 </th>
//                 <th>ID</th>
//                 <th>Title</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPosts.map((post: any) => (
//                 <tr key={post.id}>
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={selectedPosts.includes(post.id)}
//                       onChange={() => handleCheckboxChange(post.id)}
//                     />
//                   </td>
//                   <td>{post.id}</td>
//                   <td>{post.title}</td>
//                   <td>
//                     <button onClick={() => handlePostClick(post)}>Edit</button>
//                     <button onClick={() => handleDeletePost(post.id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {showDeleteButton && (
//             <button onClick={handleDeleteSelectedPosts}>Delete Selected</button>
//           )}
//           {data.comments && (
//             <div>
//               <h2>Comments:</h2>
//               <ul>
//                 {data.comments.map((comment: any) => (
//                   <li key={comment.id}>{comment.body}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//           {data.profile && (
//             <div>
//               <h2>Profile:</h2>
//               <p>Name: {data.profile.name}</p>
//             </div>
//           )}
//         </div>
//       )}

//       {selectedPost && (
//         <div>
//           <h2>Edit Post:</h2>
//           <p>ID: {selectedPost.id}</p>
//           <input
//             type="text"
//             value={selectedPost.title}
//             onChange={(e) => {
//               setSelectedPost({ ...selectedPost, title: e.target.value });
//             }}
//           />
//           <button onClick={() => setSelectedPost(null)}>Cancel</button>
//           <button onClick={() => handleUpdatePost(selectedPost)}>Save</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PuraPuraPage;