import React from 'react'

import { ProductDisplay, NavbarAuth, NavbarClient, Footer } from '../../components'

export default function page() {
  return (
    <div>
      <NavbarAuth />
      <NavbarClient />
      <ProductDisplay />
      <Footer />
    </div>
  )
}
