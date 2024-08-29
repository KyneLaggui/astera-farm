import React from 'react'
import { Drawer as ShadcnDrawer } from 'shadcn-ui' 

const Drawer = ({ isOpen, onClose, product }) => {
  return (
    <ShadcnDrawer isOpen={isOpen} onClose={onClose} size="md">
      <div className="p-6">
        <button onClick={onClose} className="mb-4 text-red-500">Close</button>
        <img src={product.image} alt={product.name} className="w-full h-auto" />
        <h1 className="font-gothic text-5xl text-black uppercase tracking-wide mt-4">{product.name}</h1>
        <p className="font-spartan text-2xl text-black font-bold tracking-wider mt-2">Sold per {product.weight}</p>
      </div>
    </ShadcnDrawer>
  )
}

export default Drawer