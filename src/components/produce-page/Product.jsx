import { useState } from 'react';
import Vegetable1 from '@src/assets/images/Vegetable-1.png';
import Vegetable2 from '@src/assets/images/Vegetable-2.png';
import Vegetable3 from '@src/assets/images/Vegetable-3.png';
import Vegetable4 from '@src/assets/images/Vegetable-4.png';
import Vegetable5 from '@src/assets/images/Vegetable-5.png';
import Vegetable6 from '@src/assets/images/Vegetable-6.png';
import ProduceView from '@src/components/produce-page/ProductView';

const productData = [
  {
    id: 1,
    name: 'Aurora Lettuce',
    image: Vegetable1,
    description: "Crisp and vibrant, Aurora Lettuce adds a burst of freshness to any dish. Perfect for salads, sandwiches, and wraps with a mild, sweet flavor.",
    weight: '300g',
    price: '159',
    categories: ['ORGANIC', 'LOCALLY GROWN', 'NON-GMO', 'PESTICIDE FREE'],
  },
  {
    id: 2,
    name: 'Zephyr Lettuce',
    image: Vegetable2,
    description: "A delicate balance of texture and taste, Zephyr Lettuce is ideal for light salads and gourmet recipes. It has a tender crunch and a subtle sweetness.",
    weight: '250g',
    price: '145',
    categories: ['HYDROPONICALLY GROWN', 'FRESH', 'PESTICIDE FREE'],
  },
  {
    id: 3,
    name: 'Nebula Lettuce',
    image: Vegetable3,
    description: "Known for its rich, buttery texture, Nebula Lettuce is a favorite in upscale dining. Its velvety leaves bring luxury to any meal.",
    weight: '275g',
    price: '169',
    categories: ['ORGANIC', 'LOCALLY GROWN', 'NON-GMO'],
  },
  {
    id: 4,
    name: 'Crystaline Lettuce',
    image: Vegetable4,
    description: "Crystaline Lettuce has a unique, slightly bitter flavor that pairs well with sweet dressings and fruits. A gourmet choice for adventurous eaters.",
    weight: 'HEAD',
    price: '135',
    categories: ['LOCALLY GROWN', 'HYDROPONICALLY GROWN', 'PESTICIDE FREE'],
  },
  {
    id: 5,
    name: 'Verdant Lettuce',
    image: Vegetable5,
    description: "Bright and zesty, Verdant Lettuce offers a refreshing crunch and a bold, peppery flavor. Ideal for adding a kick to salads and wraps.",
    weight: 'HEAD',
    price: '149',
    categories: ['ORGANIC', 'NON-GMO', 'PESTICIDE FREE'],
  },
  {
    id: 6,
    name: 'Onyx Pechay',
    image: Vegetable6,
    description: "Onyx Pechay is a robust, dark leafy green that's packed with nutrients. Perfect for soups, stir-fries, and other hearty dishes.",
    weight: '250g',
    price: '119',
    categories: ['ORGANIC', 'LOCALLY GROWN', 'NON-GMO'],
  },
];


const Product = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openDrawer = (product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className='flex flex-col gap-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20'>
        {productData.map((product) => (
          <div key={product.id} className='flex flex-col justify-center items-center gap-2'>
            <img src={product.image} className='w-[200px] sm:w-[300px]' alt={product.name} />
            <h1 className='font-gothic text-4xl sm:text-5xl text-white uppercase tracking-wide text-center'>{product.name}</h1>
            <p className='font-spartan text-xl sm:text-2xl text-white font-bold tracking-wider'>SOLD PER {product.weight}</p>
            <button
              className='bg-yellow font-bakbak uppercase text-xl text-green-950 rounded-full px-3 py-2'
              onClick={() => openDrawer(product)}
            >
              Quick View
            </button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProduceView isOpen={isDrawerOpen} onClose={closeDrawer} product={selectedProduct} />
      )}
    </div>
  );
};

export default Product;