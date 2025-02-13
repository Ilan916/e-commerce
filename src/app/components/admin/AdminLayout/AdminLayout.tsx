"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "/dashboard-admin" },
  { name: "Produits", href: "/dashboard-admin/produits" },
  { name: "Commandes", href: "/dashboard-admin/commandes" },
  { name: "Utilisateurs", href: "/dashboard-admin/utilisateurs" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname(); // Récupère l'URL actuelle

  return (
    <div className="flex h-screen">
      {/* Sidebar Mobile */}
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <Dialog.Panel className="fixed inset-0 flex">
          <div className="relative flex w-full max-w-xs flex-1 bg-white p-4">
            <button type="button" onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4">
              <XMarkIcon className="w-6 h-6 text-gray-600" />
            </button>
            <nav className="mt-8 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block p-2 rounded-md font-semibold ${
                    pathname === item.href ? "bg-gray-200 text-black" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Sidebar Desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col bg-white border-r">
        <div className="flex h-16 items-center justify-center border-b">
          <Link 
            href="/" 
            className="font-bold text-lg hover:text-red-600 transition-colors duration-200"
          >
            Drive Market
          </Link>
        </div>
        <nav className="mt-4 space-y-4 px-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block p-2 rounded-md font-semibold ${
                pathname === item.href ? "bg-gray-200 text-black" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="h-16 py-5 flex items-center justify-between px-4 border-b bg-white shadow-sm">
          <button type="button" onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BellIcon className="w-6 h-6 text-gray-600" />
              <Menu as="div" className="relative">
                <MenuButton className="flex items-center space-x-2">
                  <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                </MenuButton>
                <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-md">
                  <MenuItem>
                    <Link href="/admin/profil" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profil
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Déconnexion
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6">{children}</main>
      </div>
    </div>
  );
}
