import { CircleChevronRight } from 'lucide-react'
import React from 'react'

const Title = () => {
  return (
    <div className=''>

        {/* Left Contents */}
        <div className='bg-white max-w-[1350px]'>
            {/* Title */}  
            <div className='font-galindo'>
                <h1 className='text-[96px]'>TRY OUR NEW</h1>
                <h1 className='text-[123px]'>SEASONING!</h1>
            </div>
            <p>Inspired by one of the largest star in the universe "Betelgeuse" our fusion blend surely packs big in flavor while maintaining a low sodium and MSG FREE mixture. </p>
            <div>
                <button>Shop Now</button>
                <CircleChevronRight />
            </div>
        </div>

        {/* Picture of Seasoning */}
        <div>  
        </div>
    </div>
  )
}

export default Title