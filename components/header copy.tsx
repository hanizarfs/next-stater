"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  role?: string; // Pass the role as a prop
};

const Header = (props: Props) => {
  const pathname = usePathname();
  const { role } = props;

  console.log(role);

  return (
    <>
      <div className="flex gap-4 justify-center w-full">
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
      </div>
    </>
  );
};

export default Header;