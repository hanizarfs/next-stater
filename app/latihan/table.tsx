// PuraPuraTable.tsx

import React from 'react';

import { ApiResponse } from '../../types/custom';

interface PuraPuraTableProps {
  data: ApiResponse | null;
  selectedPosts: number[];
  handleCheckboxChange: (postId: number) => void;
  handlePostClick: (post: { id: number; title: string }) => void;
  handleDeletePost: (postId: number) => void;
  handleSelectAll: () => void;
  showDeleteButton: boolean;
  handleDeleteSelectedPosts: () => void; // Tambahkan prop untuk handleDeleteSelectedPosts
}

const PuraPuraTable: React.FC<PuraPuraTableProps> = ({
  data,
  selectedPosts,
  handleCheckboxChange,
  handlePostClick,
  handleDeletePost,
  handleSelectAll,
  showDeleteButton,
  handleDeleteSelectedPosts, // Tambahkan prop handleDeleteSelectedPosts
}) => {
  // Declare the selectAll state variable outside the component
  const [selectAll, setSelectAll] = React.useState(false);

  // Define filteredPosts based on data
  const filteredPosts = data ? data.posts : [];

  return (
    <div>
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
        </div>
      )}
    </div>
  );
};

export default PuraPuraTable;
