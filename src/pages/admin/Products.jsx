import React from 'react'
import ProductTable from '@src/components/admin/table/ProductTable/ProductTable'

const Products = () => {
  return (
    <div className="mb-4">
      <h1 className="font-gothic sm:text-7xl text-white tracking-wide mt-[100px]">PRODUCTS</h1>
      <ProductTable />
    </div>
    
  )
}

export default Products