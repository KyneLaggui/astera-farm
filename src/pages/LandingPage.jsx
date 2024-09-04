import backgroundImage from "@src/assets/images/background-image.png"
import Title from '@src/components/landing-page/Title'
import OrderProcess from '@src/components/landing-page/OrderProcess'

const LandingPage = () => {
  return (
    <div 
      className="bg-cover bg-center min-h-screen h-full flex flex-col items-center navbar-spacing w-full " 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className='max-w-[1200px] flex flex-col gap-20'>
        <Title />
        <OrderProcess />
        
      </div>
      
    </div>
  )
}

export default LandingPage