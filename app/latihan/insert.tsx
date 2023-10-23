// PuraPuraInsert.tsx

import React, { useState } from 'react';

interface PuraPuraInsertProps {
  handleInsertData: (newPostTitle: string) => void;
}

const PuraPuraInsert: React.FC<PuraPuraInsertProps> = ({ handleInsertData }) => {
  const [newPostTitle, setNewPostTitle] = useState('');

  const handleInsertClick = () => {
    if (newPostTitle.trim() === '') {
      alert('Judul tidak boleh kosong.');
      return;
    }

    handleInsertData(newPostTitle);

    // Reset input
    setNewPostTitle('');
  };

  return (
    <div>
      <h2>Insert New Post</h2>
      <input
        type="text"
        placeholder="Masukkan judul baru"
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
      />
      <button onClick={handleInsertClick}>Insert Data</button>
    </div>
  );
};

export default PuraPuraInsert;
