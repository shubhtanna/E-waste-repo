import React from 'react'
import cardImg from './infectious2.jpg'
import { BsArrowRightShort } from 'react-icons/bs'
import './CategoryCard.css'

const CategoryCard = ({imgSrc,title,desc}) => {
  return (
    <div className='flex flex-col '>

    <div className='flex justify-evenly'>
        <div className='border bg-[rgba(207,232,221,1)] p-5 flex flex-col w-[350px] mt-4 ml-6 rounded-md justify-center items-center'>

            {/* Image */}
            <div className='destImg'>
                <img src={imgSrc} width="320px" className='rounded-md h-full object-cover '/>
                <div className='overLayInfo'>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                </div>
            </div>

            {/* Category Name */}
            <div className='flex justify-center items-center text-[#004225]'>
                <p className='font-bold text-[18px]'>{title}</p>
            </div>
            


        </div>

    </div>

    
    </div>
  )
}

export default CategoryCard
