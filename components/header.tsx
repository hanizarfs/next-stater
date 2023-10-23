"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {};

const Header = (props: Props) => {
  const pathname = usePathname();

  // Retrieve the role from localStorage
  const role = localStorage.getItem('role');

  return (
    <>
      <div className="flex gap-4 justify-center w-full">
        {role === 'admin' ? (
          <>
            <Link href="/beranda" className={pathname === '/beranda' ? 'active' : ''}>
              Beranda
            </Link>
            <Link href="/classroom" className={pathname === '/classroom' ? 'active' : ''}>
              Classroom
            </Link>
            <Link href="/live-class" className={pathname === '/live-class' ? 'active' : ''}>
              Live Class
            </Link>
            <Link href="/konsultasi" className={pathname === '/konsultasi' ? 'active' : ''}>
              Konsultasi
            </Link>
            <Link href="/discussion" className={pathname === '/discussion' ? 'active' : ''}>
              Discussion
            </Link>
            <Link href="/rank-board" className={pathname === '/rank-board' ? 'active' : ''}>
              Rank Board
            </Link>
          </>
        ) : role === 'mardika' ? (
          <>
            <Link href="/beranda" className={pathname === '/beranda' ? 'active' : ''}>
              Beranda
            </Link>
            <Link href="/tentang" className={pathname === '/tentang' ? 'active' : ''}>
              Tentang
            </Link>
          </>
        ) : (
          // Handle other roles or no role
          <p>Unknown role or no role specified.</p>
        )}
      </div>
    </>
  );
};

export default Header;
