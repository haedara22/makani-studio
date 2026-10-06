'use client'
import { navLinks } from '@/app/data'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className='flex flex-row items-center gap-8'>
      {navLinks.map((link, index) => {
        return <Link href={link.href} key={index} className={pathname === link.href ? "text-accent-Default border-b-2 border-accent-Default" : "capitalize hover:text-accent-Default transition-all ease-linear font-medium duration-200"}>{link.name}</Link>
      })}
    </nav>
  )
}

export default Nav