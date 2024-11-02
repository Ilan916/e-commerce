import React from 'react'
import Link from 'next/link'
import { AiOutlineUser } from "react-icons/ai";

export default function NavbarAuth() {
  return (
    <div className='w-full h-9 pr-8 border-b-2 flex justify-end items-center  border-gray-300 bg-gray-100'>
      <div className='flex gap-1 group'>
        <AiOutlineUser className='text-slate-500 group-hover:text-blue-500' />
        <Link className='text-xs font-sans font-semibold text-slate-500 group-hover:text-blue-500' href='/connexion'>Se connecter</Link>
      </div>

    </div>
  )
}
