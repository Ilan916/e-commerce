import React from 'react'

import { ProductDisplay, SidebarAuthentification, NavbarAuth, NavbarClient, Footer } from '../../components'

export default function page() {
  return (
    <div>
      <SidebarAuthentification />
      <NavbarAuth />
      <NavbarClient />
      <ProductDisplay />
      <Footer />
    </div>
  )
}
