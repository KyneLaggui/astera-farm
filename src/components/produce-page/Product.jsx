import { useState, useEffect } from 'react';
import ProduceView from '@src/components/produce-page/ProductView';
import fetchAllProduct from '@src/custom-hooks/fetchAllProduct';
import fetchProductUrl from '@src/custom-hooks/actions/fetchProductUrl';

const Product = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsState, setProductsState] = useState([]);
  const { products: fetchedProducts } = fetchAllProduct(); // Fetch products from Supabase

  const openDrawer = (product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    if (fetchedProducts) {
      const fetchAllProducts = async () => {
        const allProducts = await Promise.all(fetchedProducts.map(async (product) => {
          const imageUrl = await fetchProductUrl(product.id);

          return {
            id: product.id,
            name: product.name,
            image: imageUrl,
            description: product.description,
            sellMethod: product.sell_method,
            attributes: product.attributes,
            price: product.price,
          };
        }));

        setProductsState(allProducts);
      };

      fetchAllProducts();
    }
  }, [fetchedProducts]);

  return (
    <div className='flex flex-col gap-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20'>
        {productsState.map((product) => (
          <div key={product.id} className='flex flex-col justify-center items-center gap-2'>
            <img src={product.image} className='w-[200px] sm:w-[300px]' alt={product.name} />
            <h1 className='font-gothic text-4xl sm:text-5xl text-white uppercase tracking-wide text-center'>{product.name}</h1>
            <p className='font-spartan text-xl sm:text-2xl text-white font-bold tracking-wider'>{product.sellMethod}</p>
            <button
              className='bg-yellow font-bakbak uppercase text-xl text-green-950 rounded-full px-3 py-2 hover:text-yellow hover:bg-green'
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
