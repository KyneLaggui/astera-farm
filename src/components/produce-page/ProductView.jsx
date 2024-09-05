import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from '@src/components/ui/drawer'
import Background from "@src/assets/images/BG-Products.png"
import PropTypes from 'prop-types'
import { ScrollArea } from '@src/components/ui/scroll-area'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const ProductView = ({ isOpen, onClose, product }) => {
  return (
    <Drawer open={isOpen} onClose={onClose}  >
        <VisuallyHidden>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
        </VisuallyHidden>
        <DrawerContent className="p-6 pb-0 bg-cover bg-center bg-white max-h-[90vh] lg:min-h-[90vh]" style={{ backgroundImage: `url(${Background})` }}>
            <ScrollArea className="overflow-y-auto flex-grow">
                {/* <CircleX onClick={onClose} /> */}
                {product && (
                <div className='flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-12 px-5 py-4 '>    
                    <img src={product.image} alt={product.name} className="w-full max-w-[250px] md:max-w-[300px] lg:max-w-[500px] xl:max-w-[600px] object-contain" />
                    <div className='text-[#293400] flex flex-col gap-5 lg:items-start'>
                      <h1 className="font-gothic text-center sm:text-start lg:text-start text-5xl md:text-7xl lg:text-8xl xl:text-9xl uppercase tracking-wide ">{product.name}</h1>
                      <p className='font-spartan text-center sm:text-start text-xl md:text-2xl xl:text-3xl font-medium xl:max-w-[800px]'>{product.description}</p>  
                      <ul className="list-disc p-0 flex flex-col flex-wrap gap-4 ml-5">
                        {product.attributes.map((category, index) => (
                          <li key={index} className="font-spartan font-extrabold text-xl md:text-2xl xl:text-3xl uppercase">
                            {category}
                          </li>
                        ))}
                      </ul>
                      <div className='flex justify-between items-center flex-wrap gap-4 lg:items-start lg:flex-col'>
                        <p className="font-spartan sm:text-xl text-lg lg:text-2xl font-medium tracking-wider">{product.sellMethod}</p>
                        <h1 className="font-spartan font-bold text-4xl md:text-5xl xl:text-6xl uppercase tracking-wide ">₱{product.price}</h1>
                      </div>
                      
                      
                      <div className='hidden lg:block'>
                        <div className=' flex items-center h-14'>
                          <input type='text' className='border border-yellow h-full max-w-[50px] text-center text-2xl' />
                          <button className='bg-yellow text-green h-full font-spartan font-extrabold text-2xl xl:text-3xl pt-3 pb-2 px-5 rounded-r-full'>ADD TO CART</button>
                        </div>
                      </div>
                    </div>
                </div>
                )}
            </ScrollArea>
            <div className='block lg:hidden  border-t'>
              <div className="flex items-center h-12 bottom-0 my-3">
                  <input
                    type="number"
                    className="border border-yellow h-full max-w-[50px] sm:max-w-[100px] text-center text-2xl flex-grow-0 text-green [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" onFocus={(e) => {
                      e.target.style.color = "#475900";
                      e.target.style.outline = "none";
                  }}
                  />
                  <button
                    className="bg-yellow text-green font-spartan font-extrabold text-xl pt-3 pb-2 px-5 rounded-r-full w-full h-full"
                  >
                    ADD TO CART
                  </button>
              </div>
            </div>
      </DrawerContent>
    </Drawer>
  )
}

ProductView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    weight: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }),
}

export default ProductView
