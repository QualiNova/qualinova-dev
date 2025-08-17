'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded ${
                isActive ? 'text-white' : 'text-[#FAFAFA99]'
            }`}
        >
            {children}
        </Link>
    );
};

export default NavLink;
