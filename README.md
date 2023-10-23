This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

- pages

  - index.js # Halaman utama (landing page)
  - home.js # Halaman beranda setelah login
  - consultation.js # Halaman konsultasi
  - classroom.js # Halaman classroom
  - register.js # Halaman pendaftaran
  - login.js # Halaman masuk

- components

  - Layout.js # Komponen layout yang digunakan di berbagai halaman
  - Navbar.js # Komponen navbar yang mungkin digunakan di beberapa halaman

- pages

  - dewantaraMuda # Halaman terkait Dewantara Muda

    - index.js # Halaman utama Dewantara Muda
    - create.js # Halaman pembuatan data Dewantara Muda
    - edit.js # Halaman edit data Dewantara Muda
    - detail.js # Halaman detail data Dewantara Muda

  - mardika # Halaman terkait Mardika

    - index.js # Halaman utama Mardika
    - create.js # Halaman pembuatan data Mardika
    - edit.js # Halaman edit data Mardika
    - detail.js # Halaman detail data Mardika

  - konselor # Halaman terkait Konselor

    - index.js # Halaman utama Konselor
    - create.js # Halaman pembuatan data Konselor
    - edit.js # Halaman edit data Konselor
    - detail.js # Halaman detail data Konselor

  - admin # Halaman terkait Admin
    - index.js # Halaman utama Admin
    - create.js # Halaman pembuatan data Admin
    - edit.js # Halaman edit data Admin
    - detail.js # Halaman detail data Admin

- api

  - dewantaraMuda.js # API endpoints untuk Dewantara Muda
  - mardika.js # API endpoints untuk Mardika
  - konselor.js # API endpoints untuk Konselor
  - admin.js # API endpoints untuk Admin
  - auth.js # API endpoints untuk otentikasi (login, register, dll.)

- utils

  - auth.js # Fungsi-fungsi utilitas terkait otentikasi
  - api.js # Fungsi-fungsi utilitas untuk berinteraksi dengan API

- public
  - images # Simpan gambar atau aset publik di sini
