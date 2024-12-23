import { useState, useEffect } from "react";
import ProduceView from "@src/components/produce-page/ProductView";
import fetchAllProduct from "@src/custom-hooks/fetchAllProduct";
import fetchProductUrl from "@src/custom-hooks/actions/fetchProductUrl";
import { Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import { selectOrders, selectTopProducts } from "@src/redux/slice/ordersSlice";
import ProductTypeFilter from "./ProductTypeFilter";

const Product = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsState, setProductsState] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const { products: fetchedProducts } = fetchAllProduct(); // Fetch products from Supabase
  const [isLoading, setIsLoading] = useState(true);
  const bestSellers = useSelector(selectTopProducts); // Get top 3 products from Redux

  const openDrawer = (product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  };

  const handleFilterChange = (selectedProducts) => {
    if (selectedProducts.length > 0) {
      setFilteredProducts(productsState.filter((item) => selectedProducts.includes(item.type)));
    } else {
      setFilteredProducts(productsState);
    }
  };

  useEffect(() => {
    if (fetchedProducts) {
      const fetchAllProducts = async () => {
        const uniqueTypes = {}
        const allProducts = await Promise.all(
          fetchedProducts.map(async (product) => {
            const imageUrl = await fetchProductUrl(product.id);

            return {
              id: product.id,
              name: product.name,
              type: product.type,
              image: `${imageUrl}?t=${new Date().toISOString()}`,
              description: product.description,
              sellMethod: product.sell_method,
              attributes: product.attributes,
              price: product.price,
              stock: product.stock,
            };
          })
        );
        
         // Create an array of unique type objects
        const uniqueTypeArray = allProducts.reduce((acc, product) => {
          if (!uniqueTypes[product.type]) {
            uniqueTypes[product.type] = true;
            acc.push({ key: product.type, value: product.type });
          }
          return acc;
        }, []);

        setFilterOptions(uniqueTypeArray)
        setIsLoading(false);
        setProductsState(allProducts);
        setFilteredProducts(allProducts);
      };

      fetchAllProducts();
    }
  }, [fetchedProducts]);

  const isBestSeller = (product) => {
    // Check if the current product is in the top 3 best sellers
    return bestSellers.some((bestSeller) => bestSeller.name === product.name);
  };

  return (
    <div className="flex flex-col gap-10">
       <div className="flex justify-center">
        <ProductTypeFilter values={filterOptions} onFilterChange={handleFilterChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-center items-center gap-2"
          >
            <div className="h-[200px] sm:h-[300px] w-[200px] sm:w-[300px] flex items-center justify-center">
              <img
                src={`${product.image}`}
                className="max-h-full max-w-full object-contain"
                alt={product.name}
              />
            </div>
            <div className="relative flex flex-col justify-center items-center gap-2 w-full max-w-[350px] sm:max-w-[400px] md:max-w-full">
              {/* Display Astral Best and Sparkles for the top 3 best sellers */}
              {isBestSeller(product) && (
                <div className="absolute top-[-35px] text-2xl sm:text-3xl text-[yellow] font-shrikhand w-full flex justify-start gap-2 ">
                  <h1>Astral Best</h1>
                  <Sparkles />
                </div>
              )}
              <h1 className="font-gothic text-4xl sm:text-5xl text-white uppercase tracking-wide text-center">
                {product.name}
              </h1>
              <p className="font-spartan text-xl sm:text-2xl text-white font-bold tracking-wider">
                {product.sellMethod}
              </p>
              <button
                className="bg-yellow font-bakbak uppercase text-xl text-green-950 rounded-full px-3 py-2 hover:text-yellow hover:bg-green"
                onClick={() => openDrawer(product)}
              >
                Quick View
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProduceView
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Product;
