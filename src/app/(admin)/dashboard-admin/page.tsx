import React from 'react'
import { AdminProductList, AdminCreateProductForm } from '@/app/components'

export default function adminpage() {
  return (
    <section>
      <AdminCreateProductForm />
      <AdminProductList />
    </section>
  )
}
