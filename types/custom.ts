// types/custom.ts

// declare module 'custom' {
//   interface DewantaraMuda {
//     id: number;
//     name: string;
//     // Tambahkan properti lain sesuai kebutuhan
//   }

//   interface DewantaraMudaApiResponse {
//     data: DewantaraMuda[];
//   }

//   // Tambahkan definisi tipe lainnya sesuai kebutuhan
// }

// types/custom.ts

export interface ApiResponse {
  posts: { id: number; title: string }[];
  comments: { id: number; body: string; postId: number }[];
  profile: { name: string };
}

type PuraPuraInsertProps = {
  selectedPost: any;
  onInsertData: () => void;
  onUpdatePost: (editedPost: any) => void;
  onCancel: () => void;
};

export default PuraPuraInsertProps;