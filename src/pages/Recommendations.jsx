import React from 'react'
import backgroundImage from "@src/assets/images/background-image.png";
import Health from '@src/assets/images/health.png'
import Recipes from '@src/assets/images/recipes.png'
import CallUs from '@src/assets/images/call-us.png'
import RecoCard from '@src/components/recommendations/RecoCard';
import { Outlet } from 'react-router-dom';

const Recommendations = () => {
  return (
    <div className="bg-cover bg-center min-h-full flex flex-col gap-10 items-center navbar-spacing w-full"
    style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='flex flex-col justify-center items-center'>
          <h1 className="font-gothic text-6xl sm:text-8xl md:text-9xl text-white text-center tracking-wide">RECOMMENDATIONS</h1>
          <p className='font-spartan font-semibold max-w-[350px] sm:max-w-full text-sm text-white tracking-widest text-center'>STAY IN TOUCH WITH YOUR PRODUCE FROM THE MOMENT IT GETS PICKED AND DELIVERED TO YOUR DOORSTEP </p>
        </div>

        <div className='flex flex-col flex-wrap justify-center sm:flex-row gap-6'>
            <RecoCard 
            title="HEALTH" 
            description="Let us help you with your fitness and nutrition goals!" 
            image={Health}
            href="/recommendations/health"
            />
            <RecoCard 
            title="RECIPES" 
            description="Tasty Recipes Featuring Astera Farms’ Fresh Produce!" 
            image={Recipes}
            href="/recommendations/recipes"
            />
            <RecoCard 
            title="CALL US" 
            description="Book a 1on1 appointment with one of our experts!" 
            image={CallUs}
            href="/recommendations/call-us"
            />
        </div>
    </div>
  )
}

export default Recommendations