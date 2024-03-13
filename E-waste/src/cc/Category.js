import React from 'react'
import Img1 from './infectious2.jpg';
import Img2 from './cyclone1.jpg';
import Img3 from './earthquake1.jpg';
import Img4 from './fire3.jpg';
import Img5 from './tsunami3.jpg';
import Img6 from './breathing1.jpg';
import CategoryCard from './CategoryCard';


const Category = () => {
    const Data = [
        {
          id: 1,
          imgSrc: Img1,
          title: 'Consumer Electronic',
          desc: "Electronic is used to refer to equipment, such as television sets, computers, etc, in which the current is controlled by transistors, valves, and similar components and also to the components themselves."

          
        },
        {
          id: 2,
          imgSrc: Img2,
          title: 'Electical tools',
          desc:"Electronic is used to refer to equipment, such as television sets, computers, etc, in which the current is controlled by transistors, valves, and similar components and also to the components themselves."
         
        },
        {
          id: 3,
          imgSrc: Img3,
          title: 'Medical Devices',
          desc:"Electronic is used to refer to equipment, such as television sets, computers, etc, in which the current is controlled by transistors, valves, and similar components and also to the components themselves."
        
        },
        {
          id: 4,
          imgSrc: Img4,
          title: 'Data center',
          desc:"Electronic is used to refer to equipment, such as television sets, computers, etc, in which the current is controlled by transistors, valves, and similar components and also to the components themselves."
        },
        {
          id: 5,
          imgSrc: Img5,
          title: 'IT equipments',
          desc:"Electronic is used to refer to equipment, such as television sets, computers, etc, in which the current is controlled by transistors, valves, and similar components and also to the components themselves."
        },
        {
          id: 6,
          imgSrc: Img6,
          title: 'Metals',
          desc:"Electronic is used to refer to equipment, such as television sets, computers, etc, in which the current is controlled by transistors, valves, and similar components and also to the components themselves."
        }
      
      ]
  return (
    <div className='w-11/12 flex flex-col items-center justify-items-center mx-auto'>
        
        <div className='text-center text-[64px] text-[#004225]'>
            <h1>Categories</h1>
        </div>

        <div className='grid grid-cols-3 gap-y-2'>
            {
                Data.map((Data)=>{
                    return <CategoryCard imgSrc={Data.imgSrc} title={Data.title} desc={Data.desc}/>
                })
            }
        </div>

        
    </div>
  )
}

export default Category