import React, { useState } from 'react'
import Vegetable1 from '@src/assets/images/Vegetable-1.png'
import Vegetable2 from '@src/assets/images/Vegetable-2.png'
import Vegetable3 from '@src/assets/images/Vegetable-3.png'
import Vegetable4 from '@src/assets/images/Vegetable-4.png'
import Vegetable5 from '@src/assets/images/Vegetable-5.png'
import Vegetable6 from '@src/assets/images/Vegetable-6.png'
import Drawer from '@src/components/ui/drawer' // Make sure the path is correct

const productData = [
  {
    id: 1,
    name: 'Lalique Lettuce',
    image: Vegetable1,
    weight: '250g',
  },
  {
    id: 2,
    name: 'GRAND LETTUCE',
    image: Vegetable2,
    weight: '250g',
  },
  {
    id: 3,
    name: 'TOURBILLON LETTUCE',
    image: Vegetable3,
    weight: '250g',
  },
  {
    id: 4,
    name: 'CRYSTAL LETTUCE',
    image: Vegetable4,
    weight: 'HEAD',
  },
  {
    id: 5,
    name: 'OLMETIE LETTUCE',
    image: Vegetable5,
    weight: 'HEAD',
  },
  {
    id: 6,
    name: 'BLACK BEHI (PECHAY)',
    image: Vegetable6,
    weight: '250g',
  },
];

const Product = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openDrawer = (product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  }

  // Group products into arrays of 3
  const groupedProducts = [];
  for (let i = 0; i < productData.length; i += 3) {
    groupedProducts.push(productData.slice(i, i + 3));
  }

  return (
    <div className='flex flex-col gap-10'>
      {groupedProducts.map((group, index) => (
        <div key={index} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20'>
          {group.map((product) => (
            <div key={product.id} className='flex flex-col justify-center items-center gap-2'>
              <img src={product.image} className='w-[300px]' alt={product.name} />
              <h1 className='font-gothic text-5xl text-white uppercase tracking-wide'>{product.name}</h1>
              <p className='font-spartan text-2xl text-white font-bold tracking-wider'>SOLD PER {product.weight}</p>
              <button
                className='bg-yellow font-bakbak uppercase text-xl text-green-950 rounded-full px-3 py-2'
                onClick={() => openDrawer(product)}
              >
                Quick View
              </button>
            </div>
          ))}
        </div>
      ))}
      {selectedProduct && (
        <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} product={selectedProduct} />
      )}
    </div>
  );
};

export default Product
