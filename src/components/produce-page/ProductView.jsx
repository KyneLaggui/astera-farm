import React from 'react'
import { Drawer, DrawerContent } from '@src/components/ui/drawer' // Ensure this path is correct
import { CircleX } from 'lucide-react'
import Background from "@src/assets/images/BG-Products.png"

const ProductView = ({ isOpen, onClose, product }) => {
  return (
    <Drawer open={isOpen} onClose={onClose} size="md" >
        <DrawerContent className="p-6 bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }}>
            <div >
                {/* <CircleX onClick={onClose} /> */}
                {product && (
                <div className='flex justify-center gap-12 px-5 py-4'>

                    <img src={product.image} alt={product.name} className="w-full max-w-[600px]" />
                    <div className='text-[#293400] flex flex-col gap-5'>
                      <h1 className="font-gothic text-9xl uppercase tracking-wide ">{product.name}</h1>
                      <p className='font-spartan text-3xl font-medium'>{product.description}</p>  
                      <ul className="list-disc list-inside">
                        {product.categories.map((category, index) => (
                          <li key={index} className="font-spartan font-extrabold text-3xl uppercase">{category}</li>
                        ))}
                      </ul>
                      <p className="font-spartan text-2xl font-medium tracking-wider">Price is per {product.weight}</p>
                      <h1 className="font-spartan font-bold text-6xl uppercase tracking-wide ">₱{product.price}</h1>
                      
                      <div className='flex items-center '>
                        <input type='text' className='border border-yellow h-full max-w-[50px] text-center text-2xl' />
                        <button className='bg-yellow text-green font-spartan font-extrabold text-3xl pt-3 pb-2 px-5 rounded-r-full'>ADD TO CART</button>
                      </div>
                    </div>
                    
                </div>
                )}
            </div>
      </DrawerContent>
    </Drawer>
  )
}

export default ProductView
