import React from 'react'
import Banner3 from '../images/banner3rm.png';

const Newsletter = () => {
  return (
    <div className="md:px-12 p-4 max-w-screen-2xl mx-auto mt-28 mb-32" id='Service'>
        <div className='gradientBg shadow-md rounded-xl rounded-br-[80px] md:p-9 px-4 py-9'>
            <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-10'>
                
                <div>
                    <img src={Banner3} alt="" className='lg:h-[360px]' />
                </div>
                <div className="md:w-3/5">
                    <h2 className='md:text-6xl text-4xl font-bold text-white mb-6 leading-relaxed'>Lorem ipsum dolar sit amet</h2>
                    <p className='text-[#EBEBEB] text-2xl mb-8'>A good example of a paragraph contain a topic sentence, details and a conclusion
                        there are many different kinds of animals that live in the forest. 
                    </p>
                    
                </div>

            </div>
        </div>
    </div>
  );
};

export default Newsletter;
